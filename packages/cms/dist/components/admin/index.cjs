'use strict';

var react = require('react');
var lucideReact = require('lucide-react');
var jsxRuntime = require('react/jsx-runtime');
var react$1 = require('@tiptap/react');
var StarterKit = require('@tiptap/starter-kit');
var Image = require('@tiptap/extension-image');
var Link = require('@tiptap/extension-link');
var Placeholder = require('@tiptap/extension-placeholder');
var CodeBlockLowlight = require('@tiptap/extension-code-block-lowlight');
var lowlight$1 = require('lowlight');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var StarterKit__default = /*#__PURE__*/_interopDefault(StarterKit);
var Image__default = /*#__PURE__*/_interopDefault(Image);
var Link__default = /*#__PURE__*/_interopDefault(Link);
var Placeholder__default = /*#__PURE__*/_interopDefault(Placeholder);
var CodeBlockLowlight__default = /*#__PURE__*/_interopDefault(CodeBlockLowlight);

// src/components/admin/article-list.tsx
var STATUS_TABS = [
  { label: "Alles", value: "all" },
  { label: "Concept", value: "draft" },
  { label: "Gepubliceerd", value: "published" },
  { label: "Ingepland", value: "scheduled" },
  { label: "Gearchiveerd", value: "archived" }
];
var STATUS_BADGE_CLASSES = {
  draft: "bg-gray-100 text-gray-700",
  published: "bg-green-100 text-green-700",
  scheduled: "bg-blue-100 text-blue-700",
  archived: "bg-red-100 text-red-700"
};
var STATUS_LABELS = {
  draft: "Concept",
  published: "Gepubliceerd",
  scheduled: "Ingepland",
  archived: "Gearchiveerd"
};
function ArticleList({
  articles,
  total,
  page,
  onPageChange,
  onSearch,
  onStatusFilter,
  onDelete,
  onEdit,
  basePath = "/admin/artikelen",
  pageSize = 20
}) {
  const [searchValue, setSearchValue] = react.useState("");
  const [activeTab, setActiveTab] = react.useState("all");
  const [deleteConfirm, setDeleteConfirm] = react.useState(null);
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  function handleSearchChange(e) {
    const value = e.target.value;
    setSearchValue(value);
    onSearch(value);
  }
  function handleTabChange(status) {
    setActiveTab(status);
    onStatusFilter(status);
  }
  function handleDelete(id) {
    if (deleteConfirm === id) {
      onDelete(id);
      setDeleteConfirm(null);
    } else {
      setDeleteConfirm(id);
    }
  }
  function formatDate(dateStr) {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleDateString("nl-NL", {
      day: "numeric",
      month: "short",
      year: "numeric"
    });
  }
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Search, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntime.jsx(
        "input",
        {
          type: "text",
          value: searchValue,
          onChange: handleSearchChange,
          placeholder: "Zoek artikelen...",
          className: "w-full rounded-lg border border-border bg-secondary px-10 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex gap-1 rounded-lg bg-muted p-1", children: STATUS_TABS.map((tab) => /* @__PURE__ */ jsxRuntime.jsx(
      "button",
      {
        onClick: () => handleTabChange(tab.value),
        className: `rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${activeTab === tab.value ? "bg-white text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`,
        children: tab.label
      },
      tab.value
    )) }),
    /* @__PURE__ */ jsxRuntime.jsx("div", { className: "overflow-hidden rounded-lg border border-border", children: /* @__PURE__ */ jsxRuntime.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntime.jsx("thead", { children: /* @__PURE__ */ jsxRuntime.jsxs("tr", { className: "border-b border-border bg-muted", children: [
        /* @__PURE__ */ jsxRuntime.jsx("th", { className: "px-4 py-3 text-left font-medium text-muted-foreground", children: "Titel" }),
        /* @__PURE__ */ jsxRuntime.jsx("th", { className: "px-4 py-3 text-left font-medium text-muted-foreground", children: "Status" }),
        /* @__PURE__ */ jsxRuntime.jsx("th", { className: "hidden px-4 py-3 text-left font-medium text-muted-foreground md:table-cell", children: "Categorie" }),
        /* @__PURE__ */ jsxRuntime.jsx("th", { className: "hidden px-4 py-3 text-left font-medium text-muted-foreground sm:table-cell", children: "Datum" }),
        /* @__PURE__ */ jsxRuntime.jsx("th", { className: "px-4 py-3 text-right font-medium text-muted-foreground", children: "Acties" })
      ] }) }),
      /* @__PURE__ */ jsxRuntime.jsx("tbody", { className: "divide-y divide-border", children: articles.length === 0 ? /* @__PURE__ */ jsxRuntime.jsx("tr", { children: /* @__PURE__ */ jsxRuntime.jsx(
        "td",
        {
          colSpan: 5,
          className: "px-4 py-8 text-center text-muted-foreground",
          children: "Geen artikelen gevonden."
        }
      ) }) : articles.map((article) => /* @__PURE__ */ jsxRuntime.jsxs(
        "tr",
        {
          className: "bg-white transition-colors hover:bg-muted/50",
          children: [
            /* @__PURE__ */ jsxRuntime.jsxs("td", { className: "px-4 py-3", children: [
              /* @__PURE__ */ jsxRuntime.jsx(
                "a",
                {
                  href: `${basePath}/${article.id}`,
                  className: "font-medium text-foreground hover:text-primary",
                  children: article.title
                }
              ),
              /* @__PURE__ */ jsxRuntime.jsxs("p", { className: "mt-0.5 text-xs text-muted-foreground", children: [
                "/",
                article.slug
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntime.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntime.jsx(
              "span",
              {
                className: `inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_BADGE_CLASSES[article.status]}`,
                children: STATUS_LABELS[article.status]
              }
            ) }),
            /* @__PURE__ */ jsxRuntime.jsx("td", { className: "hidden px-4 py-3 text-muted-foreground md:table-cell", children: article.category?.name ?? "-" }),
            /* @__PURE__ */ jsxRuntime.jsx("td", { className: "hidden px-4 py-3 text-muted-foreground sm:table-cell", children: formatDate(
              article.published_at ?? article.scheduled_at ?? article.created_at
            ) }),
            /* @__PURE__ */ jsxRuntime.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center justify-end gap-1", children: [
              /* @__PURE__ */ jsxRuntime.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => onEdit(article.id),
                  className: "rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground",
                  title: "Bewerken",
                  children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Pencil, { className: "h-4 w-4" })
                }
              ),
              /* @__PURE__ */ jsxRuntime.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => handleDelete(article.id),
                  className: `rounded-md p-1.5 transition-colors ${deleteConfirm === article.id ? "bg-red-100 text-red-600" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`,
                  title: deleteConfirm === article.id ? "Klik nogmaals om te verwijderen" : "Verwijderen",
                  children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Trash2, { className: "h-4 w-4" })
                }
              )
            ] }) })
          ]
        },
        article.id
      )) })
    ] }) }),
    totalPages > 1 && /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntime.jsxs("p", { className: "text-sm text-muted-foreground", children: [
        total,
        " artikel",
        total !== 1 ? "en" : "",
        " totaal"
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-1", children: [
        /* @__PURE__ */ jsxRuntime.jsx(
          "button",
          {
            type: "button",
            onClick: () => onPageChange(page - 1),
            disabled: page <= 1,
            className: "rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground disabled:opacity-50 disabled:hover:bg-transparent",
            children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ChevronLeft, { className: "h-4 w-4" })
          }
        ),
        Array.from({ length: totalPages }, (_, i) => i + 1).filter((p) => {
          if (totalPages <= 7) return true;
          if (p === 1 || p === totalPages) return true;
          if (Math.abs(p - page) <= 1) return true;
          return false;
        }).reduce((acc, p, idx, arr) => {
          if (idx > 0 && p - arr[idx - 1] > 1) {
            acc.push("ellipsis");
          }
          acc.push(p);
          return acc;
        }, []).map(
          (item, idx) => item === "ellipsis" ? /* @__PURE__ */ jsxRuntime.jsx(
            "span",
            {
              className: "px-1 text-muted-foreground",
              children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.MoreHorizontal, { className: "h-4 w-4" })
            },
            `ellipsis-${idx}`
          ) : /* @__PURE__ */ jsxRuntime.jsx(
            "button",
            {
              type: "button",
              onClick: () => onPageChange(item),
              className: `min-w-[2rem] rounded-md px-2 py-1 text-sm font-medium ${page === item ? "bg-primary text-white" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`,
              children: item
            },
            item
          )
        ),
        /* @__PURE__ */ jsxRuntime.jsx(
          "button",
          {
            type: "button",
            onClick: () => onPageChange(page + 1),
            disabled: page >= totalPages,
            className: "rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground disabled:opacity-50 disabled:hover:bg-transparent",
            children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ChevronRight, { className: "h-4 w-4" })
          }
        )
      ] })
    ] })
  ] });
}

// src/utils/slugify.ts
function slugify(text) {
  return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
}
function Toolbar({ editor, onImageUpload }) {
  const fileInputRef = react.useRef(null);
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
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex flex-wrap items-center gap-1 border-b border-border px-3 py-2", children: [
    /* @__PURE__ */ jsxRuntime.jsx(
      ToolbarButton,
      {
        onClick: () => editor.chain().focus().toggleBold().run(),
        active: editor.isActive("bold"),
        title: "Vet",
        children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Bold, { className: "h-4 w-4" })
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx(
      ToolbarButton,
      {
        onClick: () => editor.chain().focus().toggleItalic().run(),
        active: editor.isActive("italic"),
        title: "Cursief",
        children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Italic, { className: "h-4 w-4" })
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx(ToolbarDivider, {}),
    /* @__PURE__ */ jsxRuntime.jsx(
      ToolbarButton,
      {
        onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
        active: editor.isActive("heading", { level: 1 }),
        title: "Kop 1",
        children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Heading1, { className: "h-4 w-4" })
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx(
      ToolbarButton,
      {
        onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
        active: editor.isActive("heading", { level: 2 }),
        title: "Kop 2",
        children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Heading2, { className: "h-4 w-4" })
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx(
      ToolbarButton,
      {
        onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
        active: editor.isActive("heading", { level: 3 }),
        title: "Kop 3",
        children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Heading3, { className: "h-4 w-4" })
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx(ToolbarDivider, {}),
    /* @__PURE__ */ jsxRuntime.jsx(
      ToolbarButton,
      {
        onClick: () => editor.chain().focus().toggleBulletList().run(),
        active: editor.isActive("bulletList"),
        title: "Ongeordende lijst",
        children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.List, { className: "h-4 w-4" })
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx(
      ToolbarButton,
      {
        onClick: () => editor.chain().focus().toggleOrderedList().run(),
        active: editor.isActive("orderedList"),
        title: "Genummerde lijst",
        children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ListOrdered, { className: "h-4 w-4" })
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx(ToolbarDivider, {}),
    /* @__PURE__ */ jsxRuntime.jsx(
      ToolbarButton,
      {
        onClick: () => editor.chain().focus().toggleBlockquote().run(),
        active: editor.isActive("blockquote"),
        title: "Citaat",
        children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Quote, { className: "h-4 w-4" })
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx(
      ToolbarButton,
      {
        onClick: () => editor.chain().focus().toggleCodeBlock().run(),
        active: editor.isActive("codeBlock"),
        title: "Codeblok",
        children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Code, { className: "h-4 w-4" })
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx(
      ToolbarButton,
      {
        onClick: () => editor.chain().focus().setHorizontalRule().run(),
        title: "Horizontale lijn",
        children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Minus, { className: "h-4 w-4" })
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx(ToolbarDivider, {}),
    /* @__PURE__ */ jsxRuntime.jsx(ToolbarButton, { onClick: addLink, active: editor.isActive("link"), title: "Link", children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Link2, { className: "h-4 w-4" }) }),
    onImageUpload && /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
      /* @__PURE__ */ jsxRuntime.jsx(
        ToolbarButton,
        {
          onClick: () => fileInputRef.current?.click(),
          title: "Afbeelding uploaden",
          children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ImageIcon, { className: "h-4 w-4" })
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsx(
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
    /* @__PURE__ */ jsxRuntime.jsx(ToolbarDivider, {}),
    /* @__PURE__ */ jsxRuntime.jsx(
      ToolbarButton,
      {
        onClick: () => editor.chain().focus().undo().run(),
        disabled: !editor.can().undo(),
        title: "Ongedaan maken",
        children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Undo, { className: "h-4 w-4" })
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx(
      ToolbarButton,
      {
        onClick: () => editor.chain().focus().redo().run(),
        disabled: !editor.can().redo(),
        title: "Opnieuw",
        children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Redo, { className: "h-4 w-4" })
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
  return /* @__PURE__ */ jsxRuntime.jsx(
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
  return /* @__PURE__ */ jsxRuntime.jsx("div", { className: "mx-1 h-6 w-px bg-border" });
}
var lowlight = lowlight$1.createLowlight(lowlight$1.common);
function TiptapEditor({
  content,
  onChange,
  placeholder = "Begin met schrijven...",
  editable = true,
  onImageUpload
}) {
  const editor = react$1.useEditor({
    extensions: [
      StarterKit__default.default.configure({
        codeBlock: false
        // Use CodeBlockLowlight instead
      }),
      Image__default.default.configure({
        HTMLAttributes: {
          class: "rounded-lg max-w-full mx-auto"
        }
      }),
      Link__default.default.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-primary underline hover:text-primary/80"
        }
      }),
      Placeholder__default.default.configure({
        placeholder
      }),
      CodeBlockLowlight__default.default.configure({
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
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "rounded-lg border border-border bg-white", children: [
    editable && /* @__PURE__ */ jsxRuntime.jsx(Toolbar, { editor, onImageUpload }),
    /* @__PURE__ */ jsxRuntime.jsx(react$1.EditorContent, { editor })
  ] });
}
function ImageUpload({
  onUpload,
  currentImage,
  onRemove,
  label = "Uitgelichte afbeelding"
}) {
  const [isUploading, setIsUploading] = react.useState(false);
  const [preview, setPreview] = react.useState(currentImage ?? null);
  const [dragOver, setDragOver] = react.useState(false);
  const handleFile = react.useCallback(
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
  const handleDrop = react.useCallback(
    (e) => {
      e.preventDefault();
      setDragOver(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntime.jsx("label", { className: "mb-2 block text-sm font-medium text-foreground", children: label }),
    preview ? /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "group relative overflow-hidden rounded-lg border border-border", children: [
      /* @__PURE__ */ jsxRuntime.jsx(
        "img",
        {
          src: preview,
          alt: "Preview",
          className: "h-48 w-full object-cover"
        }
      ),
      onRemove && /* @__PURE__ */ jsxRuntime.jsx(
        "button",
        {
          type: "button",
          onClick: () => {
            setPreview(null);
            onRemove();
          },
          className: "absolute right-2 top-2 rounded-full bg-destructive p-1 text-white opacity-0 transition-opacity group-hover:opacity-100",
          children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.X, { className: "h-4 w-4" })
        }
      )
    ] }) : /* @__PURE__ */ jsxRuntime.jsx(
      "div",
      {
        onDragOver: (e) => {
          e.preventDefault();
          setDragOver(true);
        },
        onDragLeave: () => setDragOver(false),
        onDrop: handleDrop,
        className: `flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 transition-colors ${dragOver ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}`,
        children: isUploading ? /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Loader2, { className: "h-8 w-8 animate-spin text-primary" }) : /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
          /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Upload, { className: "mb-2 h-8 w-8 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntime.jsxs("p", { className: "text-sm text-muted-foreground", children: [
            "Sleep een afbeelding hierheen of",
            " ",
            /* @__PURE__ */ jsxRuntime.jsxs("label", { className: "cursor-pointer text-primary hover:underline", children: [
              "kies een bestand",
              /* @__PURE__ */ jsxRuntime.jsx(
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
function ArticleForm({
  article,
  categories,
  tags,
  onSave,
  onPublish,
  onSchedule,
  onImageUpload
}) {
  const [title, setTitle] = react.useState(article?.title ?? "");
  const [slug, setSlug] = react.useState(article?.slug ?? "");
  const [slugManuallyEdited, setSlugManuallyEdited] = react.useState(false);
  const [excerpt, setExcerpt] = react.useState(article?.excerpt ?? "");
  const [content, setContent] = react.useState(
    article?.content ?? {}
  );
  const [contentHtml, setContentHtml] = react.useState(article?.content_html ?? "");
  const [categoryId, setCategoryId] = react.useState(article?.category_id ?? "");
  const [selectedTagIds, setSelectedTagIds] = react.useState(
    article?.tags?.map((t) => t.id) ?? []
  );
  const [newTagName, setNewTagName] = react.useState("");
  const [showNewTagInput, setShowNewTagInput] = react.useState(false);
  const [featuredImage, setFeaturedImage] = react.useState(
    article?.featured_image ?? null
  );
  const [seoOpen, setSeoOpen] = react.useState(false);
  const [metaTitle, setMetaTitle] = react.useState(article?.meta_title ?? "");
  const [metaDescription, setMetaDescription] = react.useState(
    article?.meta_description ?? ""
  );
  const [ogImage, setOgImage] = react.useState(article?.og_image ?? "");
  const [canonicalUrl, setCanonicalUrl] = react.useState(
    article?.canonical_url ?? ""
  );
  const [scheduledAt, setScheduledAt] = react.useState(
    article?.scheduled_at ? new Date(article.scheduled_at).toISOString().slice(0, 16) : ""
  );
  const [isSaving, setIsSaving] = react.useState(false);
  const [isPublishing, setIsPublishing] = react.useState(false);
  const [isScheduling, setIsScheduling] = react.useState(false);
  react.useEffect(() => {
    if (!slugManuallyEdited && title) {
      setSlug(slugify(title));
    }
  }, [title, slugManuallyEdited]);
  function getFormData() {
    return {
      title,
      slug,
      excerpt: excerpt || void 0,
      content,
      content_html: contentHtml,
      category_id: categoryId || void 0,
      featured_image: featuredImage,
      meta_title: metaTitle || void 0,
      meta_description: metaDescription || void 0,
      og_image: ogImage || void 0,
      canonical_url: canonicalUrl || void 0,
      scheduled_at: scheduledAt ? new Date(scheduledAt).toISOString() : void 0
    };
  }
  async function handleSave() {
    setIsSaving(true);
    try {
      onSave(getFormData(), selectedTagIds);
    } finally {
      setIsSaving(false);
    }
  }
  async function handlePublish() {
    setIsPublishing(true);
    try {
      onPublish(getFormData(), selectedTagIds);
    } finally {
      setIsPublishing(false);
    }
  }
  async function handleSchedule() {
    if (!scheduledAt) return;
    setIsScheduling(true);
    try {
      onSchedule(getFormData(), selectedTagIds);
    } finally {
      setIsScheduling(false);
    }
  }
  function handleEditorChange(json, html) {
    setContent(json);
    setContentHtml(html);
  }
  function toggleTag(tagId) {
    setSelectedTagIds(
      (prev) => prev.includes(tagId) ? prev.filter((id) => id !== tagId) : [...prev, tagId]
    );
  }
  const filteredTags = newTagName ? tags.filter(
    (t) => t.name.toLowerCase().includes(newTagName.toLowerCase())
  ) : tags;
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "mx-auto max-w-4xl space-y-6", children: [
    /* @__PURE__ */ jsxRuntime.jsx(
      "input",
      {
        type: "text",
        value: title,
        onChange: (e) => setTitle(e.target.value),
        placeholder: "Titel van het artikel...",
        className: "w-full border-0 bg-transparent text-3xl font-bold text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-0"
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-sm text-muted-foreground", children: "/" }),
      /* @__PURE__ */ jsxRuntime.jsx(
        "input",
        {
          type: "text",
          value: slug,
          onChange: (e) => {
            setSlug(e.target.value);
            setSlugManuallyEdited(true);
          },
          onBlur: () => {
            if (slug) {
              setSlug(slugify(slug));
            }
          },
          placeholder: "artikel-slug",
          className: "flex-1 border-0 bg-transparent text-sm text-muted-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-0"
        }
      ),
      slugManuallyEdited && /* @__PURE__ */ jsxRuntime.jsx(
        "button",
        {
          type: "button",
          onClick: () => {
            setSlugManuallyEdited(false);
            setSlug(slugify(title));
          },
          className: "text-xs text-primary hover:underline",
          children: "Auto-genereren"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntime.jsx("label", { className: "mb-1 block text-sm font-medium text-foreground", children: "Samenvatting" }),
      /* @__PURE__ */ jsxRuntime.jsx(
        "textarea",
        {
          value: excerpt,
          onChange: (e) => setExcerpt(e.target.value),
          placeholder: "Korte samenvatting van het artikel...",
          rows: 3,
          className: "w-full rounded-lg border border-border bg-secondary px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntime.jsx("label", { className: "mb-1 block text-sm font-medium text-foreground", children: "Inhoud" }),
      /* @__PURE__ */ jsxRuntime.jsx(
        TiptapEditor,
        {
          content,
          onChange: handleEditorChange,
          onImageUpload
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "grid gap-6 lg:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntime.jsx("label", { className: "mb-1 block text-sm font-medium text-foreground", children: "Categorie" }),
        /* @__PURE__ */ jsxRuntime.jsxs(
          "select",
          {
            value: categoryId,
            onChange: (e) => setCategoryId(e.target.value),
            className: "w-full rounded-lg border border-border bg-secondary px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary",
            children: [
              /* @__PURE__ */ jsxRuntime.jsx("option", { value: "", children: "Geen categorie" }),
              categories.map((cat) => /* @__PURE__ */ jsxRuntime.jsx("option", { value: cat.id, children: cat.name }, cat.id))
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntime.jsx("label", { className: "mb-1 block text-sm font-medium text-foreground", children: "Tags" }),
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "rounded-lg border border-border bg-secondary p-3", children: [
          /* @__PURE__ */ jsxRuntime.jsx("div", { className: "mb-2 flex flex-wrap gap-1", children: selectedTagIds.map((tagId) => {
            const tag = tags.find((t) => t.id === tagId);
            if (!tag) return null;
            return /* @__PURE__ */ jsxRuntime.jsxs(
              "span",
              {
                className: "inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary",
                children: [
                  tag.name,
                  /* @__PURE__ */ jsxRuntime.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => toggleTag(tag.id),
                      className: "ml-0.5 hover:text-primary/70",
                      children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.X, { className: "h-3 w-3" })
                    }
                  )
                ]
              },
              tag.id
            );
          }) }),
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntime.jsx(
              "input",
              {
                type: "text",
                value: newTagName,
                onChange: (e) => {
                  setNewTagName(e.target.value);
                  setShowNewTagInput(true);
                },
                onFocus: () => setShowNewTagInput(true),
                placeholder: "Zoek of maak tag...",
                className: "w-full border-0 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-0"
              }
            ),
            showNewTagInput && (newTagName || filteredTags.length > 0) && /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "absolute left-0 right-0 top-full z-10 mt-1 max-h-40 overflow-y-auto rounded-lg border border-border bg-white shadow-lg", children: [
              filteredTags.filter((t) => !selectedTagIds.includes(t.id)).map((tag) => /* @__PURE__ */ jsxRuntime.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => {
                    toggleTag(tag.id);
                    setNewTagName("");
                    setShowNewTagInput(false);
                  },
                  className: "flex w-full items-center px-3 py-1.5 text-left text-sm text-foreground hover:bg-muted",
                  children: tag.name
                },
                tag.id
              )),
              newTagName && !tags.some(
                (t) => t.name.toLowerCase() === newTagName.toLowerCase()
              ) && /* @__PURE__ */ jsxRuntime.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => {
                    setNewTagName("");
                    setShowNewTagInput(false);
                  },
                  className: "flex w-full items-center gap-2 border-t border-border px-3 py-1.5 text-left text-sm text-primary hover:bg-muted",
                  children: [
                    /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Plus, { className: "h-3 w-3" }),
                    'Maak "',
                    newTagName,
                    '" aan'
                  ]
                }
              )
            ] })
          ] }),
          showNewTagInput && /* @__PURE__ */ jsxRuntime.jsx(
            "div",
            {
              className: "fixed inset-0 z-0",
              onClick: () => setShowNewTagInput(false)
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx(
      ImageUpload,
      {
        onUpload: async (file) => {
          const url = await onImageUpload(file);
          setFeaturedImage(url);
          return url;
        },
        currentImage: featuredImage,
        onRemove: () => setFeaturedImage(null),
        label: "Uitgelichte afbeelding"
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "rounded-lg border border-border", children: [
      /* @__PURE__ */ jsxRuntime.jsxs(
        "button",
        {
          type: "button",
          onClick: () => setSeoOpen(!seoOpen),
          className: "flex w-full items-center justify-between px-4 py-3 text-left",
          children: [
            /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-sm font-medium text-foreground", children: "SEO-instellingen" }),
            seoOpen ? /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ChevronUp, { className: "h-4 w-4 text-muted-foreground" }) : /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ChevronDown, { className: "h-4 w-4 text-muted-foreground" })
          ]
        }
      ),
      seoOpen && /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-4 border-t border-border px-4 py-4", children: [
        /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntime.jsx("label", { className: "mb-1 block text-sm font-medium text-foreground", children: "Meta-titel" }),
          /* @__PURE__ */ jsxRuntime.jsx(
            "input",
            {
              type: "text",
              value: metaTitle,
              onChange: (e) => setMetaTitle(e.target.value),
              placeholder: title || "Meta-titel...",
              className: "w-full rounded-lg border border-border bg-secondary px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            }
          ),
          /* @__PURE__ */ jsxRuntime.jsxs("p", { className: "mt-1 text-xs text-muted-foreground", children: [
            metaTitle.length,
            "/60 tekens"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntime.jsx("label", { className: "mb-1 block text-sm font-medium text-foreground", children: "Meta-beschrijving" }),
          /* @__PURE__ */ jsxRuntime.jsx(
            "textarea",
            {
              value: metaDescription,
              onChange: (e) => setMetaDescription(e.target.value),
              placeholder: "Beschrijving voor zoekmachines...",
              rows: 3,
              className: "w-full rounded-lg border border-border bg-secondary px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            }
          ),
          /* @__PURE__ */ jsxRuntime.jsxs("p", { className: "mt-1 text-xs text-muted-foreground", children: [
            metaDescription.length,
            "/160 tekens"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntime.jsx("label", { className: "mb-1 block text-sm font-medium text-foreground", children: "OG-afbeelding URL" }),
          /* @__PURE__ */ jsxRuntime.jsx(
            "input",
            {
              type: "url",
              value: ogImage,
              onChange: (e) => setOgImage(e.target.value),
              placeholder: "https://...",
              className: "w-full rounded-lg border border-border bg-secondary px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntime.jsx("label", { className: "mb-1 block text-sm font-medium text-foreground", children: "Canonical URL" }),
          /* @__PURE__ */ jsxRuntime.jsx(
            "input",
            {
              type: "url",
              value: canonicalUrl,
              onChange: (e) => setCanonicalUrl(e.target.value),
              placeholder: "https://...",
              className: "w-full rounded-lg border border-border bg-secondary px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "rounded-lg border border-border px-4 py-4", children: [
      /* @__PURE__ */ jsxRuntime.jsxs("label", { className: "mb-2 flex items-center gap-2 text-sm font-medium text-foreground", children: [
        /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Calendar, { className: "h-4 w-4" }),
        "Inplannen"
      ] }),
      /* @__PURE__ */ jsxRuntime.jsx(
        "input",
        {
          type: "datetime-local",
          value: scheduledAt,
          onChange: (e) => setScheduledAt(e.target.value),
          className: "w-full rounded-lg border border-border bg-secondary px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        }
      ),
      scheduledAt && /* @__PURE__ */ jsxRuntime.jsxs("p", { className: "mt-1 text-xs text-muted-foreground", children: [
        "Wordt gepubliceerd op",
        " ",
        new Date(scheduledAt).toLocaleDateString("nl-NL", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit"
        })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex flex-wrap items-center gap-3 border-t border-border pt-4", children: [
      /* @__PURE__ */ jsxRuntime.jsxs(
        "button",
        {
          type: "button",
          onClick: handleSave,
          disabled: isSaving || !title,
          className: "inline-flex items-center gap-2 rounded-lg border border-border bg-white px-4 py-2 text-sm font-medium text-foreground hover:bg-muted disabled:opacity-50",
          children: [
            isSaving ? /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Loader2, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Save, { className: "h-4 w-4" }),
            "Opslaan als concept"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsxs(
        "button",
        {
          type: "button",
          onClick: handlePublish,
          disabled: isPublishing || !title,
          className: "inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 disabled:opacity-50",
          children: [
            isPublishing ? /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Loader2, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Send, { className: "h-4 w-4" }),
            "Publiceren"
          ]
        }
      ),
      scheduledAt && /* @__PURE__ */ jsxRuntime.jsxs(
        "button",
        {
          type: "button",
          onClick: handleSchedule,
          disabled: isScheduling || !title || !scheduledAt,
          className: "inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50",
          children: [
            isScheduling ? /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Loader2, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Clock, { className: "h-4 w-4" }),
            "Inplannen"
          ]
        }
      )
    ] })
  ] });
}
function CategoryManager({
  categories,
  onCreate,
  onUpdate,
  onDelete
}) {
  const [newName, setNewName] = react.useState("");
  const [newDescription, setNewDescription] = react.useState("");
  const [isCreating, setIsCreating] = react.useState(false);
  const [editingId, setEditingId] = react.useState(null);
  const [editName, setEditName] = react.useState("");
  const [editDescription, setEditDescription] = react.useState("");
  const [deleteConfirm, setDeleteConfirm] = react.useState(null);
  function handleCreate() {
    if (!newName.trim()) return;
    setIsCreating(true);
    try {
      onCreate({
        name: newName.trim(),
        slug: slugify(newName.trim()),
        description: newDescription.trim() || void 0
      });
      setNewName("");
      setNewDescription("");
    } finally {
      setIsCreating(false);
    }
  }
  function startEdit(category) {
    setEditingId(category.id);
    setEditName(category.name);
    setEditDescription(category.description ?? "");
  }
  function handleUpdate() {
    if (!editingId || !editName.trim()) return;
    onUpdate(editingId, {
      name: editName.trim(),
      slug: slugify(editName.trim()),
      description: editDescription.trim() || void 0
    });
    setEditingId(null);
    setEditName("");
    setEditDescription("");
  }
  function cancelEdit() {
    setEditingId(null);
    setEditName("");
    setEditDescription("");
  }
  function handleDelete(id) {
    if (deleteConfirm === id) {
      onDelete(id);
      setDeleteConfirm(null);
    } else {
      setDeleteConfirm(id);
    }
  }
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "rounded-lg border border-border bg-white p-4", children: [
      /* @__PURE__ */ jsxRuntime.jsxs("h3", { className: "mb-3 flex items-center gap-2 text-sm font-medium text-foreground", children: [
        /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Plus, { className: "h-4 w-4" }),
        "Nieuwe categorie"
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntime.jsx(
          "input",
          {
            type: "text",
            value: newName,
            onChange: (e) => setNewName(e.target.value),
            onKeyDown: (e) => {
              if (e.key === "Enter") handleCreate();
            },
            placeholder: "Naam van de categorie...",
            className: "w-full rounded-lg border border-border bg-secondary px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsx(
          "input",
          {
            type: "text",
            value: newDescription,
            onChange: (e) => setNewDescription(e.target.value),
            onKeyDown: (e) => {
              if (e.key === "Enter") handleCreate();
            },
            placeholder: "Beschrijving (optioneel)...",
            className: "w-full rounded-lg border border-border bg-secondary px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          }
        ),
        newName.trim() && /* @__PURE__ */ jsxRuntime.jsxs("p", { className: "text-xs text-muted-foreground", children: [
          "Slug: ",
          slugify(newName.trim())
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs(
          "button",
          {
            type: "button",
            onClick: handleCreate,
            disabled: !newName.trim() || isCreating,
            className: "inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 disabled:opacity-50",
            children: [
              isCreating ? /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Loader2, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Plus, { className: "h-4 w-4" }),
              "Toevoegen"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx("div", { className: "overflow-hidden rounded-lg border border-border", children: categories.length === 0 ? /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex flex-col items-center justify-center px-4 py-12 text-center", children: [
      /* @__PURE__ */ jsxRuntime.jsx(lucideReact.FolderOpen, { className: "mb-3 h-8 w-8 text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-sm text-muted-foreground", children: "Nog geen categorie\xEBn aangemaakt." })
    ] }) : /* @__PURE__ */ jsxRuntime.jsx("ul", { className: "divide-y divide-border", children: categories.map((category) => /* @__PURE__ */ jsxRuntime.jsx(
      "li",
      {
        className: "bg-white transition-colors hover:bg-muted/50",
        children: editingId === category.id ? (
          /* Inline edit mode */
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-2 p-4", children: [
            /* @__PURE__ */ jsxRuntime.jsx(
              "input",
              {
                type: "text",
                value: editName,
                onChange: (e) => setEditName(e.target.value),
                onKeyDown: (e) => {
                  if (e.key === "Enter") handleUpdate();
                  if (e.key === "Escape") cancelEdit();
                },
                className: "w-full rounded-lg border border-border bg-secondary px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary",
                autoFocus: true
              }
            ),
            /* @__PURE__ */ jsxRuntime.jsx(
              "input",
              {
                type: "text",
                value: editDescription,
                onChange: (e) => setEditDescription(e.target.value),
                onKeyDown: (e) => {
                  if (e.key === "Enter") handleUpdate();
                  if (e.key === "Escape") cancelEdit();
                },
                placeholder: "Beschrijving (optioneel)...",
                className: "w-full rounded-lg border border-border bg-secondary px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              }
            ),
            editName.trim() && /* @__PURE__ */ jsxRuntime.jsxs("p", { className: "text-xs text-muted-foreground", children: [
              "Slug: ",
              slugify(editName.trim())
            ] }),
            /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsxRuntime.jsx(
                "button",
                {
                  type: "button",
                  onClick: handleUpdate,
                  disabled: !editName.trim(),
                  className: "inline-flex items-center gap-1 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-white hover:bg-primary/90 disabled:opacity-50",
                  children: "Opslaan"
                }
              ),
              /* @__PURE__ */ jsxRuntime.jsxs(
                "button",
                {
                  type: "button",
                  onClick: cancelEdit,
                  className: "inline-flex items-center gap-1 rounded-md border border-border px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted",
                  children: [
                    /* @__PURE__ */ jsxRuntime.jsx(lucideReact.X, { className: "h-3 w-3" }),
                    "Annuleren"
                  ]
                }
              )
            ] })
          ] })
        ) : (
          /* Display mode */
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center justify-between px-4 py-3", children: [
            /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "min-w-0 flex-1", children: [
              /* @__PURE__ */ jsxRuntime.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => startEdit(category),
                  className: "text-left",
                  children: /* @__PURE__ */ jsxRuntime.jsx("span", { className: "font-medium text-foreground hover:text-primary", children: category.name })
                }
              ),
              category.description && /* @__PURE__ */ jsxRuntime.jsx("p", { className: "mt-0.5 text-xs text-muted-foreground", children: category.description }),
              /* @__PURE__ */ jsxRuntime.jsxs("p", { className: "mt-0.5 text-xs text-muted-foreground", children: [
                "/",
                category.slug
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "inline-flex items-center gap-1 text-xs text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntime.jsx(lucideReact.FileText, { className: "h-3 w-3" }),
                category.article_count ?? 0
              ] }),
              /* @__PURE__ */ jsxRuntime.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => startEdit(category),
                  className: "rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground",
                  title: "Bewerken",
                  children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Pencil, { className: "h-4 w-4" })
                }
              ),
              /* @__PURE__ */ jsxRuntime.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => handleDelete(category.id),
                  className: `rounded-md p-1.5 transition-colors ${deleteConfirm === category.id ? "bg-red-100 text-red-600" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`,
                  title: deleteConfirm === category.id ? "Klik nogmaals om te verwijderen" : "Verwijderen",
                  children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Trash2, { className: "h-4 w-4" })
                }
              )
            ] })
          ] })
        )
      },
      category.id
    )) }) })
  ] });
}
function TagManager({ tags, onCreate, onDelete }) {
  const [newTagName, setNewTagName] = react.useState("");
  const [searchQuery, setSearchQuery] = react.useState("");
  const [isCreating, setIsCreating] = react.useState(false);
  const [deleteConfirm, setDeleteConfirm] = react.useState(null);
  const filteredTags = searchQuery ? tags.filter(
    (t) => t.name.toLowerCase().includes(searchQuery.toLowerCase())
  ) : tags;
  function handleCreate() {
    const name = newTagName.trim();
    if (!name) return;
    if (tags.some((t) => t.name.toLowerCase() === name.toLowerCase())) return;
    setIsCreating(true);
    try {
      onCreate({ name, slug: slugify(name) });
      setNewTagName("");
    } finally {
      setIsCreating(false);
    }
  }
  function handleDelete(id) {
    if (deleteConfirm === id) {
      onDelete(id);
      setDeleteConfirm(null);
    } else {
      setDeleteConfirm(id);
    }
  }
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex gap-2", children: [
      /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "relative flex-1", children: [
        /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Plus, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntime.jsx(
          "input",
          {
            type: "text",
            value: newTagName,
            onChange: (e) => setNewTagName(e.target.value),
            onKeyDown: (e) => {
              if (e.key === "Enter") handleCreate();
            },
            placeholder: "Nieuwe tag toevoegen...",
            className: "w-full rounded-lg border border-border bg-secondary px-10 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs(
        "button",
        {
          type: "button",
          onClick: handleCreate,
          disabled: !newTagName.trim() || isCreating,
          className: "inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 disabled:opacity-50",
          children: [
            isCreating ? /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Loader2, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Plus, { className: "h-4 w-4" }),
            "Toevoegen"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Search, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntime.jsx(
        "input",
        {
          type: "text",
          value: searchQuery,
          onChange: (e) => setSearchQuery(e.target.value),
          placeholder: "Tags filteren...",
          className: "w-full rounded-lg border border-border bg-secondary px-10 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        }
      )
    ] }),
    filteredTags.length === 0 ? /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex flex-col items-center justify-center rounded-lg border border-border px-4 py-12 text-center", children: [
      /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Tags, { className: "mb-3 h-8 w-8 text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-sm text-muted-foreground", children: searchQuery ? "Geen tags gevonden voor deze zoekopdracht." : "Nog geen tags aangemaakt." })
    ] }) : /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex flex-wrap gap-2", children: filteredTags.map((tag) => /* @__PURE__ */ jsxRuntime.jsxs(
      "span",
      {
        className: `group inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${deleteConfirm === tag.id ? "bg-red-100 text-red-700" : "bg-accent text-accent-foreground"}`,
        children: [
          tag.name,
          tag.article_count !== void 0 && /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "text-xs opacity-60", children: [
            "(",
            tag.article_count,
            ")"
          ] }),
          /* @__PURE__ */ jsxRuntime.jsx(
            "button",
            {
              type: "button",
              onClick: () => handleDelete(tag.id),
              className: `ml-0.5 rounded-full p-0.5 transition-colors ${deleteConfirm === tag.id ? "text-red-700 hover:bg-red-200" : "text-muted-foreground opacity-0 hover:bg-muted hover:text-foreground group-hover:opacity-100"}`,
              title: deleteConfirm === tag.id ? "Klik nogmaals om te verwijderen" : "Verwijderen",
              children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.X, { className: "h-3.5 w-3.5" })
            }
          )
        ]
      },
      tag.id
    )) }),
    /* @__PURE__ */ jsxRuntime.jsxs("p", { className: "text-xs text-muted-foreground", children: [
      filteredTags.length,
      " van ",
      tags.length,
      " tag",
      tags.length !== 1 ? "s" : ""
    ] })
  ] });
}
function MediaLibrary({
  media,
  total,
  onUpload,
  onDelete,
  onSelect,
  page,
  onPageChange,
  pageSize = 24
}) {
  const [isUploading, setIsUploading] = react.useState(false);
  const [dragOver, setDragOver] = react.useState(false);
  const [deleteConfirm, setDeleteConfirm] = react.useState(null);
  const [selectedId, setSelectedId] = react.useState(null);
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const isSelectMode = !!onSelect;
  const handleFile = react.useCallback(
    async (file) => {
      if (!file.type.startsWith("image/") && !file.type.startsWith("video/")) {
        return;
      }
      setIsUploading(true);
      try {
        await onUpload(file);
      } finally {
        setIsUploading(false);
      }
    },
    [onUpload]
  );
  const handleDrop = react.useCallback(
    (e) => {
      e.preventDefault();
      setDragOver(false);
      const files = Array.from(e.dataTransfer.files);
      if (files.length > 0) {
        handleFile(files[0]);
      }
    },
    [handleFile]
  );
  function handleDelete(id) {
    if (deleteConfirm === id) {
      onDelete(id);
      setDeleteConfirm(null);
    } else {
      setDeleteConfirm(id);
    }
  }
  function handleSelect(item) {
    if (isSelectMode) {
      setSelectedId(item.id);
      onSelect?.(item);
    }
  }
  function formatSize(bytes) {
    if (!bytes) return "-";
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }
  function formatDate(dateStr) {
    return new Date(dateStr).toLocaleDateString("nl-NL", {
      day: "numeric",
      month: "short",
      year: "numeric"
    });
  }
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntime.jsx(
      "div",
      {
        onDragOver: (e) => {
          e.preventDefault();
          setDragOver(true);
        },
        onDragLeave: () => setDragOver(false),
        onDrop: handleDrop,
        className: `flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 transition-colors ${dragOver ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}`,
        children: isUploading ? /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Loader2, { className: "h-6 w-6 animate-spin text-primary" }),
          /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-sm text-muted-foreground", children: "Bezig met uploaden..." })
        ] }) : /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
          /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Image, { className: "mb-2 h-8 w-8 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntime.jsxs("p", { className: "text-sm text-muted-foreground", children: [
            "Sleep bestanden hierheen of",
            " ",
            /* @__PURE__ */ jsxRuntime.jsxs("label", { className: "cursor-pointer text-primary hover:underline", children: [
              "kies bestanden",
              /* @__PURE__ */ jsxRuntime.jsx(
                "input",
                {
                  type: "file",
                  accept: "image/*,video/*",
                  onChange: (e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFile(file);
                    e.target.value = "";
                  },
                  className: "hidden"
                }
              )
            ] })
          ] })
        ] })
      }
    ),
    media.length === 0 ? /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex flex-col items-center justify-center rounded-lg border border-border px-4 py-12 text-center", children: [
      /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Image, { className: "mb-3 h-8 w-8 text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-sm text-muted-foreground", children: "Nog geen media ge\xFCpload." })
    ] }) : /* @__PURE__ */ jsxRuntime.jsx("div", { className: "grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6", children: media.map((item) => {
      const isImage = item.mime_type?.startsWith("image/");
      const isSelected = selectedId === item.id;
      return /* @__PURE__ */ jsxRuntime.jsxs(
        "div",
        {
          className: `group relative overflow-hidden rounded-lg border transition-all ${isSelected ? "border-primary ring-2 ring-primary" : "border-border hover:border-primary/50"} ${isSelectMode ? "cursor-pointer" : ""}`,
          onClick: () => handleSelect(item),
          children: [
            /* @__PURE__ */ jsxRuntime.jsx("div", { className: "aspect-square bg-muted", children: isImage ? /* @__PURE__ */ jsxRuntime.jsx(
              "img",
              {
                src: item.url,
                alt: item.alt_text ?? item.filename,
                className: "h-full w-full object-cover"
              }
            ) : /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex h-full w-full items-center justify-center", children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Image, { className: "h-8 w-8 text-muted-foreground" }) }) }),
            /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "px-2 py-1.5", children: [
              /* @__PURE__ */ jsxRuntime.jsx(
                "p",
                {
                  className: "truncate text-xs font-medium text-foreground",
                  title: item.filename,
                  children: item.filename
                }
              ),
              /* @__PURE__ */ jsxRuntime.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                formatSize(item.size_bytes),
                " \xB7",
                " ",
                formatDate(item.created_at)
              ] })
            ] }),
            !isSelectMode && /* @__PURE__ */ jsxRuntime.jsx(
              "button",
              {
                type: "button",
                onClick: (e) => {
                  e.stopPropagation();
                  handleDelete(item.id);
                },
                className: `absolute right-1.5 top-1.5 rounded-full p-1 transition-all ${deleteConfirm === item.id ? "bg-red-600 text-white" : "bg-black/50 text-white opacity-0 group-hover:opacity-100"}`,
                title: deleteConfirm === item.id ? "Klik nogmaals om te verwijderen" : "Verwijderen",
                children: deleteConfirm === item.id ? /* @__PURE__ */ jsxRuntime.jsx(lucideReact.X, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Trash2, { className: "h-3.5 w-3.5" })
              }
            ),
            isSelectMode && isSelected && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "absolute inset-0 flex items-center justify-center bg-primary/20", children: /* @__PURE__ */ jsxRuntime.jsx("div", { className: "rounded-full bg-primary p-1", children: /* @__PURE__ */ jsxRuntime.jsx(
              "svg",
              {
                className: "h-4 w-4 text-white",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24",
                children: /* @__PURE__ */ jsxRuntime.jsx(
                  "path",
                  {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                    d: "M5 13l4 4L19 7"
                  }
                )
              }
            ) }) })
          ]
        },
        item.id
      );
    }) }),
    totalPages > 1 && /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntime.jsxs("p", { className: "text-sm text-muted-foreground", children: [
        total,
        " bestand",
        total !== 1 ? "en" : "",
        " totaal"
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-1", children: [
        /* @__PURE__ */ jsxRuntime.jsx(
          "button",
          {
            type: "button",
            onClick: () => onPageChange(page - 1),
            disabled: page <= 1,
            className: "rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground disabled:opacity-50 disabled:hover:bg-transparent",
            children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ChevronLeft, { className: "h-4 w-4" })
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "px-3 text-sm text-muted-foreground", children: [
          "Pagina ",
          page,
          " van ",
          totalPages
        ] }),
        /* @__PURE__ */ jsxRuntime.jsx(
          "button",
          {
            type: "button",
            onClick: () => onPageChange(page + 1),
            disabled: page >= totalPages,
            className: "rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground disabled:opacity-50 disabled:hover:bg-transparent",
            children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ChevronRight, { className: "h-4 w-4" })
          }
        )
      ] })
    ] })
  ] });
}
function formatNumber(num) {
  if (num >= 1e6) {
    return `${(num / 1e6).toFixed(1)}M`;
  }
  if (num >= 1e3) {
    return `${(num / 1e3).toFixed(1)}K`;
  }
  return num.toLocaleString("nl-NL");
}
function AnalyticsDashboard({ stats }) {
  const mostViewed = stats.popularArticles[0];
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3", children: [
      /* @__PURE__ */ jsxRuntime.jsx("div", { className: "rounded-lg border border-border bg-white p-6", children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntime.jsx("div", { className: "rounded-lg bg-primary/10 p-2.5", children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Eye, { className: "h-5 w-5 text-primary" }) }),
        /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-sm text-muted-foreground", children: "Weergaven (30 dagen)" }),
          /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-2xl font-bold text-foreground", children: formatNumber(stats.totalViews) })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntime.jsx("div", { className: "rounded-lg border border-border bg-white p-6", children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntime.jsx("div", { className: "rounded-lg bg-green-100 p-2.5", children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.FileText, { className: "h-5 w-5 text-green-600" }) }),
        /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-sm text-muted-foreground", children: "Gepubliceerde artikelen" }),
          /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-2xl font-bold text-foreground", children: formatNumber(stats.articleCount) })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntime.jsx("div", { className: "rounded-lg border border-border bg-white p-6 sm:col-span-2 lg:col-span-1", children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntime.jsx("div", { className: "rounded-lg bg-blue-100 p-2.5", children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.BarChart3, { className: "h-5 w-5 text-blue-600" }) }),
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-sm text-muted-foreground", children: "Meest bekeken" }),
          mostViewed ? /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
            /* @__PURE__ */ jsxRuntime.jsx(
              "p",
              {
                className: "truncate text-sm font-semibold text-foreground",
                title: mostViewed.title,
                children: mostViewed.title
              }
            ),
            /* @__PURE__ */ jsxRuntime.jsxs("p", { className: "text-xs text-muted-foreground", children: [
              formatNumber(mostViewed.total_views),
              " weergaven"
            ] })
          ] }) : /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-sm text-muted-foreground", children: "Geen data beschikbaar" })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "rounded-lg border border-border", children: [
      /* @__PURE__ */ jsxRuntime.jsx("div", { className: "border-b border-border px-4 py-3", children: /* @__PURE__ */ jsxRuntime.jsxs("h3", { className: "flex items-center gap-2 text-sm font-semibold text-foreground", children: [
        /* @__PURE__ */ jsxRuntime.jsx(lucideReact.BarChart3, { className: "h-4 w-4" }),
        "Top 10 artikelen"
      ] }) }),
      /* @__PURE__ */ jsxRuntime.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntime.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntime.jsx("thead", { children: /* @__PURE__ */ jsxRuntime.jsxs("tr", { className: "border-b border-border bg-muted", children: [
          /* @__PURE__ */ jsxRuntime.jsx("th", { className: "px-4 py-2.5 text-left font-medium text-muted-foreground", children: "#" }),
          /* @__PURE__ */ jsxRuntime.jsx("th", { className: "px-4 py-2.5 text-left font-medium text-muted-foreground", children: "Artikel" }),
          /* @__PURE__ */ jsxRuntime.jsx("th", { className: "px-4 py-2.5 text-right font-medium text-muted-foreground", children: "Totaal" }),
          /* @__PURE__ */ jsxRuntime.jsx("th", { className: "hidden px-4 py-2.5 text-right font-medium text-muted-foreground sm:table-cell", children: "Vandaag" }),
          /* @__PURE__ */ jsxRuntime.jsx("th", { className: "hidden px-4 py-2.5 text-right font-medium text-muted-foreground md:table-cell", children: "Deze week" }),
          /* @__PURE__ */ jsxRuntime.jsx("th", { className: "hidden px-4 py-2.5 text-right font-medium text-muted-foreground lg:table-cell", children: "Deze maand" })
        ] }) }),
        /* @__PURE__ */ jsxRuntime.jsx("tbody", { className: "divide-y divide-border", children: stats.popularArticles.length === 0 ? /* @__PURE__ */ jsxRuntime.jsx("tr", { children: /* @__PURE__ */ jsxRuntime.jsx(
          "td",
          {
            colSpan: 6,
            className: "px-4 py-8 text-center text-muted-foreground",
            children: "Nog geen weergavedata beschikbaar."
          }
        ) }) : stats.popularArticles.slice(0, 10).map((article, index) => /* @__PURE__ */ jsxRuntime.jsxs(
          "tr",
          {
            className: "bg-white transition-colors hover:bg-muted/50",
            children: [
              /* @__PURE__ */ jsxRuntime.jsx("td", { className: "px-4 py-2.5 text-muted-foreground", children: index + 1 }),
              /* @__PURE__ */ jsxRuntime.jsxs("td", { className: "max-w-xs px-4 py-2.5", children: [
                /* @__PURE__ */ jsxRuntime.jsx(
                  "p",
                  {
                    className: "truncate font-medium text-foreground",
                    title: article.title,
                    children: article.title
                  }
                ),
                /* @__PURE__ */ jsxRuntime.jsxs("p", { className: "truncate text-xs text-muted-foreground", children: [
                  "/",
                  article.slug
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntime.jsx("td", { className: "px-4 py-2.5 text-right font-medium text-foreground", children: formatNumber(article.total_views) }),
              /* @__PURE__ */ jsxRuntime.jsx("td", { className: "hidden px-4 py-2.5 text-right text-muted-foreground sm:table-cell", children: formatNumber(article.views_today) }),
              /* @__PURE__ */ jsxRuntime.jsx("td", { className: "hidden px-4 py-2.5 text-right text-muted-foreground md:table-cell", children: formatNumber(article.views_this_week) }),
              /* @__PURE__ */ jsxRuntime.jsx("td", { className: "hidden px-4 py-2.5 text-right text-muted-foreground lg:table-cell", children: formatNumber(article.views_this_month) })
            ]
          },
          article.article_id
        )) })
      ] }) })
    ] })
  ] });
}

exports.AnalyticsDashboard = AnalyticsDashboard;
exports.ArticleForm = ArticleForm;
exports.ArticleList = ArticleList;
exports.CategoryManager = CategoryManager;
exports.MediaLibrary = MediaLibrary;
exports.TagManager = TagManager;
//# sourceMappingURL=index.cjs.map
//# sourceMappingURL=index.cjs.map