import React, { useState, useRef } from "react";
import { Upload, X, Link as LinkIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  value?: string;
  onChange: (imageUrl: string) => void;
};

export default function ImageUpload({ value, onChange }: Props) {
  const [isDragging, setIsDragging] = useState(false);
  const [useUrl, setUseUrl] = useState(false);
  const [urlInput, setUrlInput] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      processFile(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Por favor selecione um arquivo de imagem válido");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      onChange(result);
      setUseUrl(false);
    };
    reader.readAsDataURL(file);
  };

  const handleUrlSubmit = () => {
    if (urlInput.trim()) {
      onChange(urlInput.trim());
      setUrlInput("");
      setUseUrl(false);
    }
  };

  const handleClear = () => {
    onChange("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-3">
      {/* Tabs: Upload or URL */}
      <div className="flex gap-2 border-b border-border">
        <button
          type="button"
          onClick={() => setUseUrl(false)}
          className={cn(
            "px-4 py-2 text-sm font-medium transition-colors",
            !useUrl
              ? "border-b-2 border-accent text-accent"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <Upload className="mr-2 inline-block h-4 w-4" />
          Enviar Arquivo
        </button>
        <button
          type="button"
          onClick={() => setUseUrl(true)}
          className={cn(
            "px-4 py-2 text-sm font-medium transition-colors",
            useUrl
              ? "border-b-2 border-accent text-accent"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <LinkIcon className="mr-2 inline-block h-4 w-4" />
          URL da Imagem
        </button>
      </div>

      {/* Upload Area */}
      {!useUrl ? (
        <div
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={cn(
            "relative flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 py-12 transition-all",
            isDragging
              ? "border-accent bg-accent/5"
              : "border-border hover:border-accent/50 hover:bg-muted/50"
          )}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />

          <Upload className="mb-3 h-8 w-8 text-muted-foreground" />
          <p className="text-sm font-medium text-foreground">
            {isDragging ? "Solte a imagem aqui" : "Clique para enviar ou arraste a imagem"}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">PNG, JPG, GIF até 5MB</p>
        </div>
      ) : (
        /* URL Input */
        <div className="flex flex-col gap-2">
          <input
            type="text"
            placeholder="https://exemplo.com/imagem.jpg"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleUrlSubmit()}
            className="flex h-10 w-full rounded-lg border-2 border-border bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:border-accent transition-colors"
          />
          <button
            type="button"
            onClick={handleUrlSubmit}
            disabled={!urlInput.trim()}
            className="inline-flex items-center justify-center rounded-lg bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition hover:bg-accent/90 disabled:opacity-50"
          >
            Adicionar Imagem
          </button>
        </div>
      )}

      {/* Preview */}
      {value && (
        <div className="relative overflow-hidden rounded-2xl border border-border bg-muted">
          <img
            src={value}
            alt="Preview"
            className="h-48 w-full object-cover"
          />
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-lg bg-destructive text-white hover:bg-destructive/90 transition"
          >
            <X className="h-4 w-4" />
          </button>
          <p className="px-4 py-2 text-xs text-muted-foreground truncate">
            {value.startsWith("data:") ? "Arquivo enviado" : "URL da imagem"}
          </p>
        </div>
      )}
    </div>
  );
}
