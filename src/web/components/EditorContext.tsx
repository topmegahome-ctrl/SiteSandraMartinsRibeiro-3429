import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";

interface StoreEntry { type: "text" | "image"; value: string }
type Store = Record<string, StoreEntry>;

interface EditorContextType {
  editMode: boolean;
  toggleEditMode: () => void;
  getText: (id: string, defaultValue: string) => string;
  setText: (id: string, value: string) => Promise<void>;
  getImage: (id: string, defaultSrc: string) => string;
  setImage: (id: string, src: string) => Promise<void>;
  resetAll: () => Promise<void>;
  hasChanges: boolean;
  saving: boolean;
}

const EditorContext = createContext<EditorContextType | null>(null);

export function EditorProvider({ children }: { children: ReactNode }) {
  const [editMode, setEditMode] = useState(false);
  const [store, setStore] = useState<Store>({});
  const [saving, setSaving] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Load all saved content from server on mount
  useEffect(() => {
    fetch("/api/content")
      .then((r) => r.json<Store>())
      .then((data) => {
        setStore(data ?? {});
        setLoaded(true);
      })
      .catch(() => setLoaded(true));
  }, []);

  const toggleEditMode = () => setEditMode((v) => !v);

  const getText = (id: string, def: string) =>
    store[id]?.type === "text" ? store[id].value : def;

  const getImage = (id: string, def: string) =>
    store[id]?.type === "image" ? store[id].value : def;

  const setText = useCallback(async (id: string, value: string) => {
    // Optimistic update
    setStore((s) => ({ ...s, [id]: { type: "text", value } }));
    setSaving(true);
    try {
      await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, type: "text", value }),
      });
    } finally {
      setSaving(false);
    }
  }, []);

  const setImage = useCallback(async (id: string, value: string) => {
    setStore((s) => ({ ...s, [id]: { type: "image", value } }));
    setSaving(true);
    try {
      await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, type: "image", value }),
      });
    } finally {
      setSaving(false);
    }
  }, []);

  const resetAll = useCallback(async () => {
    setSaving(true);
    try {
      await fetch("/api/content", { method: "DELETE" });
      setStore({});
    } finally {
      setSaving(false);
    }
  }, []);

  const hasChanges = Object.keys(store).length > 0;

  return (
    <EditorContext.Provider
      value={{ editMode, toggleEditMode, getText, setText, getImage, setImage, resetAll, hasChanges, saving }}
    >
      {loaded ? children : null}
      <EditorToolbar />
    </EditorContext.Provider>
  );
}

export function useEditor() {
  const ctx = useContext(EditorContext);
  if (!ctx) throw new Error("useEditor must be used within EditorProvider");
  return ctx;
}

function EditorToolbar() {
  const { editMode, toggleEditMode, resetAll, hasChanges, saving } = useEditor();
  const [showReset, setShowReset] = useState(false);

  return (
    <>
      {/* Floating edit toggle */}
      <button
        onClick={toggleEditMode}
        className={`fixed bottom-24 right-6 z-50 flex items-center gap-2 px-4 py-2.5 text-xs tracking-[0.15em] uppercase font-medium shadow-lg transition-all duration-300 ${
          editMode ? "bg-[#C9A84C] text-[#0D1B2A]" : "bg-[#0D1B2A] text-white hover:bg-[#162032]"
        }`}
      >
        {saving ? (
          <>
            <span className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin" />
            A guardar...
          </>
        ) : editMode ? (
          <>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Concluído
          </>
        ) : (
          <>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Editar
          </>
        )}
      </button>

      {/* Reset button */}
      {hasChanges && !editMode && (
        <button
          onClick={() => setShowReset(true)}
          className="fixed bottom-40 right-6 z-50 bg-white border border-[#E2DDD5] text-[#6B6B6B] hover:text-red-500 hover:border-red-300 px-3 py-2 text-[10px] tracking-[0.1em] uppercase shadow-sm transition-all duration-200"
        >
          ↺ Repor
        </button>
      )}

      {/* Edit mode top banner */}
      {editMode && (
        <div className="fixed top-0 left-0 right-0 z-[60] bg-[#C9A84C] text-[#0D1B2A] text-center py-2 text-xs tracking-[0.1em] font-medium flex items-center justify-center gap-3">
          <span>✎ Modo edição — clique em qualquer texto ou imagem para editar</span>
          {saving && (
            <span className="flex items-center gap-1 opacity-70">
              <span className="w-3 h-3 border-2 border-[#0D1B2A] border-t-transparent rounded-full animate-spin" />
              A guardar...
            </span>
          )}
        </div>
      )}

      {/* Saved indicator */}
      {!editMode && !saving && hasChanges && (
        <div className="fixed bottom-[7.5rem] right-6 z-50 text-[10px] text-[#6B6B6B] bg-white border border-[#E2DDD5] px-2 py-1 shadow-sm">
          ✓ Alterações guardadas
        </div>
      )}

      {/* Reset modal */}
      {showReset && (
        <div className="fixed inset-0 z-[70] bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white p-8 max-w-sm w-full">
            <h3 style={{ fontFamily: "'Playfair Display', serif" }} className="text-[#0D1B2A] text-xl font-semibold mb-3">
              Repor conteúdo?
            </h3>
            <p className="text-[#6B6B6B] text-sm mb-6">
              Todas as alterações serão eliminadas e o conteúdo original será restaurado.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => { resetAll(); setShowReset(false); }}
                className="flex-1 bg-red-500 text-white py-2.5 text-xs tracking-widest uppercase hover:bg-red-600 transition-colors"
              >
                Repor tudo
              </button>
              <button
                onClick={() => setShowReset(false)}
                className="flex-1 border border-[#E2DDD5] text-[#6B6B6B] py-2.5 text-xs tracking-widest uppercase hover:border-[#0D1B2A] transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
