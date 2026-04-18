import { useRef, useState, useEffect } from "react";
import { useEditor } from "./EditorContext";

interface Props {
  id: string;
  defaultValue: string;
  tag?: keyof JSX.IntrinsicElements;
  className?: string;
  style?: React.CSSProperties;
  multiline?: boolean;
}

export function EditableText({
  id,
  defaultValue,
  tag: Tag = "span",
  className = "",
  style,
  multiline = false,
}: Props) {
  const { editMode, getText, setText } = useEditor();
  const value = getText(id, defaultValue);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);

  useEffect(() => {
    if (!editing) setDraft(value);
  }, [value, editing]);

  // Not in edit mode — render plain
  if (!editMode) {
    return (
      // @ts-ignore
      <Tag className={className} style={style}>{value}</Tag>
    );
  }

  // Editing — show input
  if (editing) {
    const sharedClass = `${className} border-2 border-[#C9A84C] bg-[#C9A84C]/10 outline-none p-1 w-full text-inherit font-inherit`;

    const save = (val: string) => {
      setText(id, val);
      setEditing(false);
    };

    if (multiline) {
      return (
        <textarea
          autoFocus
          className={sharedClass}
          style={{ ...style, minHeight: 60, resize: "vertical", display: "block" }}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={() => save(draft)}
          onKeyDown={(e) => {
            if (e.key === "Escape") { setDraft(value); setEditing(false); }
          }}
          onClick={(e) => e.stopPropagation()}
        />
      );
    }

    return (
      <input
        autoFocus
        type="text"
        className={sharedClass}
        style={style}
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={() => save(draft)}
        onKeyDown={(e) => {
          if (e.key === "Enter") save(draft);
          if (e.key === "Escape") { setDraft(value); setEditing(false); }
        }}
        onClick={(e) => e.stopPropagation()}
      />
    );
  }

  // Edit mode, not editing — show text with click-to-edit highlight
  return (
    // @ts-ignore
    <Tag
      className={`${className} cursor-text outline-dashed outline-1 outline-[#C9A84C]/50 hover:outline-[#C9A84C] hover:bg-[#C9A84C]/10 transition-all duration-150 rounded-sm px-0.5`}
      style={style}
      onClick={(e: React.MouseEvent) => {
        e.stopPropagation();
        setDraft(value);
        setEditing(true);
      }}
      title="Clique para editar"
    >
      {value}
    </Tag>
  );
}
