import { Bold, Italic, Heading1, Heading2, Heading3, List, ListOrdered, Quote, Code, Minus, Link2, ImageIcon, Undo, Redo, X, Loader2, Upload } from 'lucide-react';
import { useRef, useState, useCallback } from 'react';
import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { createLowlight, common } from 'lowlight';

// src/components/editor/toolbar.tsx
function Toolbar({ editor, onImageUpload }) {
  const fileInputRef = useRef(null);
  const handleImageUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file || !onImageUpload) return;
    try {
      const url = await onImageUpload(file);
      editor.chain().focus().setImage({ src: url }).run();
    } catch {
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  const addLink = () => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-1 border-b border-border px-3 py-2", children: [
    /* @__PURE__ */ jsx(
      ToolbarButton,
      {
        onClick: () => editor.chain().focus().toggleBold().run(),
        active: editor.isActive("bold"),
        title: "Vet",
        children: /* @__PURE__ */ jsx(Bold, { className: "h-4 w-4" })
      }
    ),
    /* @__PURE__ */ jsx(
      ToolbarButton,
      {
        onClick: () => editor.chain().focus().toggleItalic().run(),
        active: editor.isActive("italic"),
        title: "Cursief",
        children: /* @__PURE__ */ jsx(Italic, { className: "h-4 w-4" })
      }
    ),
    /* @__PURE__ */ jsx(ToolbarDivider, {}),
    /* @__PURE__ */ jsx(
      ToolbarButton,
      {
        onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
        active: editor.isActive("heading", { level: 1 }),
        title: "Kop 1",
        children: /* @__PURE__ */ jsx(Heading1, { className: "h-4 w-4" })
      }
    ),
    /* @__PURE__ */ jsx(
      ToolbarButton,
      {
        onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
        active: editor.isActive("heading", { level: 2 }),
        title: "Kop 2",
        children: /* @__PURE__ */ jsx(Heading2, { className: "h-4 w-4" })
      }
    ),
    /* @__PURE__ */ jsx(
      ToolbarButton,
      {
        onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
        active: editor.isActive("heading", { level: 3 }),
        title: "Kop 3",
        children: /* @__PURE__ */ jsx(Heading3, { className: "h-4 w-4" })
      }
    ),
    /* @__PURE__ */ jsx(ToolbarDivider, {}),
    /* @__PURE__ */ jsx(
      ToolbarButton,
      {
        onClick: () => editor.chain().focus().toggleBulletList().run(),
        active: editor.isActive("bulletList"),
        title: "Ongeordende lijst",
        children: /* @__PURE__ */ jsx(List, { className: "h-4 w-4" })
      }
    ),
    /* @__PURE__ */ jsx(
      ToolbarButton,
      {
        onClick: () => editor.chain().focus().toggleOrderedList().run(),
        active: editor.isActive("orderedList"),
        title: "Genummerde lijst",
        children: /* @__PURE__ */ jsx(ListOrdered, { className: "h-4 w-4" })
      }
    ),
    /* @__PURE__ */ jsx(ToolbarDivider, {}),
    /* @__PURE__ */ jsx(
      ToolbarButton,
      {
        onClick: () => editor.chain().focus().toggleBlockquote().run(),
        active: editor.isActive("blockquote"),
        title: "Citaat",
        children: /* @__PURE__ */ jsx(Quote, { className: "h-4 w-4" })
      }
    ),
    /* @__PURE__ */ jsx(
      ToolbarButton,
      {
        onClick: () => editor.chain().focus().toggleCodeBlock().run(),
        active: editor.isActive("codeBlock"),
        title: "Codeblok",
        children: /* @__PURE__ */ jsx(Code, { className: "h-4 w-4" })
      }
    ),
    /* @__PURE__ */ jsx(
      ToolbarButton,
      {
        onClick: () => editor.chain().focus().setHorizontalRule().run(),
        title: "Horizontale lijn",
        children: /* @__PURE__ */ jsx(Minus, { className: "h-4 w-4" })
      }
    ),
    /* @__PURE__ */ jsx(ToolbarDivider, {}),
    /* @__PURE__ */ jsx(ToolbarButton, { onClick: addLink, active: editor.isActive("link"), title: "Link", children: /* @__PURE__ */ jsx(Link2, { className: "h-4 w-4" }) }),
    onImageUpload && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(
        ToolbarButton,
        {
          onClick: () => fileInputRef.current?.click(),
          title: "Afbeelding uploaden",
          children: /* @__PURE__ */ jsx(ImageIcon, { className: "h-4 w-4" })
        }
      ),
      /* @__PURE__ */ jsx(
        "input",
        {
          ref: fileInputRef,
          type: "file",
          accept: "image/*",
          onChange: handleImageUpload,
          className: "hidden"
        }
      )
    ] }),
    /* @__PURE__ */ jsx(ToolbarDivider, {}),
    /* @__PURE__ */ jsx(
      ToolbarButton,
      {
        onClick: () => editor.chain().focus().undo().run(),
        disabled: !editor.can().undo(),
        title: "Ongedaan maken",
        children: /* @__PURE__ */ jsx(Undo, { className: "h-4 w-4" })
      }
    ),
    /* @__PURE__ */ jsx(
      ToolbarButton,
      {
        onClick: () => editor.chain().focus().redo().run(),
        disabled: !editor.can().redo(),
        title: "Opnieuw",
        children: /* @__PURE__ */ jsx(Redo, { className: "h-4 w-4" })
      }
    )
  ] });
}
function ToolbarButton({
  children,
  onClick,
  active = false,
  disabled = false,
  title
}) {
  return /* @__PURE__ */ jsx(
    "button",
    {
      type: "button",
      onClick,
      disabled,
      title,
      className: `rounded p-1.5 transition-colors ${active ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground"} ${disabled ? "cursor-not-allowed opacity-30" : ""}`,
      children
    }
  );
}
function ToolbarDivider() {
  return /* @__PURE__ */ jsx("div", { className: "mx-1 h-6 w-px bg-border" });
}
var lowlight = createLowlight(common);
function TiptapEditor({
  content,
  onChange,
  placeholder = "Begin met schrijven...",
  editable = true,
  onImageUpload
}) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false
        // Use CodeBlockLowlight instead
      }),
      Image.configure({
        HTMLAttributes: {
          class: "rounded-lg max-w-full mx-auto"
        }
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-primary underline hover:text-primary/80"
        }
      }),
      Placeholder.configure({
        placeholder
      }),
      CodeBlockLowlight.configure({
        lowlight,
        HTMLAttributes: {
          class: "bg-muted rounded-lg p-4 font-mono text-sm"
        }
      })
    ],
    content,
    editable,
    onUpdate: ({ editor: e }) => {
      const json = e.getJSON();
      const html = e.getHTML();
      onChange?.(json, html);
    },
    editorProps: {
      attributes: {
        class: "prose prose-sm sm:prose-base max-w-none focus:outline-none min-h-[300px] px-4 py-3 text-foreground"
      }
    }
  });
  if (!editor) return null;
  return /* @__PURE__ */ jsxs("div", { className: "rounded-lg border border-border bg-white", children: [
    editable && /* @__PURE__ */ jsx(Toolbar, { editor, onImageUpload }),
    /* @__PURE__ */ jsx(EditorContent, { editor })
  ] });
}
function ImageUpload({
  onUpload,
  currentImage,
  onRemove,
  label = "Uitgelichte afbeelding"
}) {
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState(currentImage ?? null);
  const [dragOver, setDragOver] = useState(false);
  const handleFile = useCallback(
    async (file) => {
      if (!file.type.startsWith("image/")) return;
      setIsUploading(true);
      try {
        const url = await onUpload(file);
        setPreview(url);
      } catch {
      } finally {
        setIsUploading(false);
      }
    },
    [onUpload]
  );
  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      setDragOver(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("label", { className: "mb-2 block text-sm font-medium text-foreground", children: label }),
    preview ? /* @__PURE__ */ jsxs("div", { className: "group relative overflow-hidden rounded-lg border border-border", children: [
      /* @__PURE__ */ jsx(
        "img",
        {
          src: preview,
          alt: "Preview",
          className: "h-48 w-full object-cover"
        }
      ),
      onRemove && /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          onClick: () => {
            setPreview(null);
            onRemove();
          },
          className: "absolute right-2 top-2 rounded-full bg-destructive p-1 text-white opacity-0 transition-opacity group-hover:opacity-100",
          children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4" })
        }
      )
    ] }) : /* @__PURE__ */ jsx(
      "div",
      {
        onDragOver: (e) => {
          e.preventDefault();
          setDragOver(true);
        },
        onDragLeave: () => setDragOver(false),
        onDrop: handleDrop,
        className: `flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 transition-colors ${dragOver ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}`,
        children: isUploading ? /* @__PURE__ */ jsx(Loader2, { className: "h-8 w-8 animate-spin text-primary" }) : /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(Upload, { className: "mb-2 h-8 w-8 text-muted-foreground" }),
          /* @__PURE__ */ jsxs("p", { className: "text-sm text-muted-foreground", children: [
            "Sleep een afbeelding hierheen of",
            " ",
            /* @__PURE__ */ jsxs("label", { className: "cursor-pointer text-primary hover:underline", children: [
              "kies een bestand",
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "file",
                  accept: "image/*",
                  onChange: (e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFile(file);
                  },
                  className: "hidden"
                }
              )
            ] })
          ] })
        ] })
      }
    )
  ] });
}

export { ImageUpload, TiptapEditor, Toolbar };
//# sourceMappingURL=chunk-YJXIPDW3.js.map
//# sourceMappingURL=chunk-YJXIPDW3.js.map