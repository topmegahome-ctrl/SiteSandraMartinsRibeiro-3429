import { useRef } from "react";
import { useEditor } from "./EditorContext";

interface Props {
  id: string;
  defaultSrc: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
}

export function EditableImage({ id, defaultSrc, alt, className = "", style }: Props) {
  const { editMode, getImage, setImage } = useEditor();
  const src = getImage(id, defaultSrc);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target?.result as string;
      setImage(id, dataUrl);
    };
    reader.readAsDataURL(file);
  };

  if (!editMode) {
    return <img src={src} alt={alt} className={className} style={style} />;
  }

  return (
    <div className="relative group/img cursor-pointer" onClick={() => inputRef.current?.click()}>
      <img src={src} alt={alt} className={`${className} group-hover/img:opacity-70 transition-opacity`} style={style} />
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity">
        <div className="bg-[#0D1B2A]/80 text-white text-xs px-3 py-2 flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Substituir imagem
        </div>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
}
