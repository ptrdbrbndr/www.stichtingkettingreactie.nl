import { User, Calendar, Clock, ChevronLeft, ChevronRight, Tag, Search } from 'lucide-react';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState, useRef, useEffect, useCallback } from 'react';

// src/components/public/blog-card.tsx
function BlogCard({ article, basePath = "/blog" }) {
  const articleUrl = `${basePath}/${article.slug}`;
  const formattedDate = article.published_at ? new Date(article.published_at).toLocaleDateString("nl-NL", {
    year: "numeric",
    month: "long",
    day: "numeric"
  }) : null;
  return /* @__PURE__ */ jsxs("article", { className: "group flex flex-col overflow-hidden rounded-lg border border-border bg-secondary shadow-sm transition-shadow hover:shadow-md", children: [
    /* @__PURE__ */ jsxs("a", { href: articleUrl, className: "relative block aspect-[16/9] overflow-hidden", children: [
      article.featured_image ? /* @__PURE__ */ jsx(
        "img",
        {
          src: article.featured_image,
          alt: article.title,
          className: "h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        }
      ) : /* @__PURE__ */ jsx("div", { className: "h-full w-full bg-gradient-to-br from-primary/20 to-primary/5" }),
      article.category && /* @__PURE__ */ jsx("span", { className: "absolute left-3 top-3 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground", children: article.category.name })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-1 flex-col p-4 sm:p-5", children: [
      /* @__PURE__ */ jsx("h3", { className: "mb-2 text-lg font-semibold leading-snug text-foreground transition-colors group-hover:text-primary", children: /* @__PURE__ */ jsx("a", { href: articleUrl, children: article.title }) }),
      article.excerpt && /* @__PURE__ */ jsx("p", { className: "mb-4 line-clamp-2 text-sm leading-relaxed text-muted-foreground", children: article.excerpt }),
      /* @__PURE__ */ jsxs("div", { className: "mt-auto flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-border pt-3 text-xs text-muted-foreground", children: [
        /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1", children: [
          /* @__PURE__ */ jsx(User, { className: "h-3.5 w-3.5" }),
          /* @__PURE__ */ jsx("span", { children: "Auteur" })
        ] }),
        formattedDate && /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1", children: [
          /* @__PURE__ */ jsx(Calendar, { className: "h-3.5 w-3.5" }),
          /* @__PURE__ */ jsx("time", { dateTime: article.published_at, children: formattedDate })
        ] }),
        article.reading_time_minutes != null && /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1", children: [
          /* @__PURE__ */ jsx(Clock, { className: "h-3.5 w-3.5" }),
          /* @__PURE__ */ jsxs("span", { children: [
            article.reading_time_minutes,
            " min"
          ] })
        ] })
      ] })
    ] })
  ] });
}
function SkeletonCard() {
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col overflow-hidden rounded-lg border border-border bg-secondary shadow-sm", children: [
    /* @__PURE__ */ jsx("div", { className: "aspect-[16/9] animate-pulse bg-muted" }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-1 flex-col p-4 sm:p-5", children: [
      /* @__PURE__ */ jsx("div", { className: "mb-2 h-5 w-3/4 animate-pulse rounded bg-muted" }),
      /* @__PURE__ */ jsx("div", { className: "mb-1 h-4 w-full animate-pulse rounded bg-muted" }),
      /* @__PURE__ */ jsx("div", { className: "mb-4 h-4 w-2/3 animate-pulse rounded bg-muted" }),
      /* @__PURE__ */ jsx("div", { className: "mt-auto border-t border-border pt-3", children: /* @__PURE__ */ jsx("div", { className: "h-3 w-1/2 animate-pulse rounded bg-muted" }) })
    ] })
  ] });
}
function BlogGrid({
  articles,
  basePath = "/blog",
  loading = false,
  page = 1,
  totalPages = 1,
  onPageChange
}) {
  if (loading) {
    return /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3", children: Array.from({ length: 6 }).map((_, i) => /* @__PURE__ */ jsx(SkeletonCard, {}, i)) });
  }
  if (articles.length === 0) {
    return /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center rounded-lg border border-border bg-muted/50 px-6 py-16 text-center", children: [
      /* @__PURE__ */ jsx("p", { className: "text-lg font-medium text-foreground", children: "Nog geen artikelen gepubliceerd" }),
      /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Kom later terug voor nieuwe content." })
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3", children: articles.map((article) => /* @__PURE__ */ jsx(BlogCard, { article, basePath }, article.id)) }),
    totalPages > 1 && onPageChange && /* @__PURE__ */ jsxs(
      "nav",
      {
        "aria-label": "Paginering",
        className: "mt-8 flex items-center justify-center gap-2",
        children: [
          /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              onClick: () => onPageChange(page - 1),
              disabled: page <= 1,
              className: "inline-flex items-center gap-1 rounded-md border border-border bg-secondary px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted disabled:pointer-events-none disabled:opacity-50",
              children: [
                /* @__PURE__ */ jsx(ChevronLeft, { className: "h-4 w-4" }),
                "Vorige"
              ]
            }
          ),
          /* @__PURE__ */ jsxs("span", { className: "px-3 text-sm text-muted-foreground", children: [
            "Pagina ",
            page,
            " van ",
            totalPages
          ] }),
          /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              onClick: () => onPageChange(page + 1),
              disabled: page >= totalPages,
              className: "inline-flex items-center gap-1 rounded-md border border-border bg-secondary px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted disabled:pointer-events-none disabled:opacity-50",
              children: [
                "Volgende",
                /* @__PURE__ */ jsx(ChevronRight, { className: "h-4 w-4" })
              ]
            }
          )
        ]
      }
    )
  ] });
}
function BlogDetail({ article }) {
  const formattedDate = article.published_at ? new Date(article.published_at).toLocaleDateString("nl-NL", {
    year: "numeric",
    month: "long",
    day: "numeric"
  }) : null;
  return /* @__PURE__ */ jsxs("article", { className: "mx-auto max-w-3xl", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-5xl", children: article.title }),
    /* @__PURE__ */ jsxs("div", { className: "mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground", children: [
      article.category && /* @__PURE__ */ jsx("span", { className: "rounded-full bg-primary/10 px-3 py-0.5 text-xs font-medium text-primary", children: article.category.name }),
      /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1", children: [
        /* @__PURE__ */ jsx(User, { className: "h-4 w-4" }),
        /* @__PURE__ */ jsx("span", { children: "Auteur" })
      ] }),
      formattedDate && /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1", children: [
        /* @__PURE__ */ jsx(Calendar, { className: "h-4 w-4" }),
        /* @__PURE__ */ jsx("time", { dateTime: article.published_at, children: formattedDate })
      ] }),
      article.reading_time_minutes != null && /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1", children: [
        /* @__PURE__ */ jsx(Clock, { className: "h-4 w-4" }),
        /* @__PURE__ */ jsxs("span", { children: [
          article.reading_time_minutes,
          " min leestijd"
        ] })
      ] })
    ] }),
    article.featured_image && /* @__PURE__ */ jsx("div", { className: "mt-8 overflow-hidden rounded-lg", children: /* @__PURE__ */ jsx(
      "img",
      {
        src: article.featured_image,
        alt: article.title,
        className: "h-auto w-full object-cover"
      }
    ) }),
    article.content_html && /* @__PURE__ */ jsx(
      "div",
      {
        className: "prose prose-lg mt-8 max-w-none text-foreground prose-headings:text-foreground prose-a:text-primary prose-strong:text-foreground prose-code:text-foreground prose-pre:bg-muted prose-pre:text-foreground prose-blockquote:border-primary prose-blockquote:text-muted-foreground",
        dangerouslySetInnerHTML: { __html: article.content_html }
      }
    ),
    article.tags && article.tags.length > 0 && /* @__PURE__ */ jsxs("div", { className: "mt-10 border-t border-border pt-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(Tag, { className: "h-4 w-4 text-muted-foreground" }),
        /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-muted-foreground", children: "Tags:" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-3 flex flex-wrap gap-2", children: article.tags.map((tag) => /* @__PURE__ */ jsx(
        "span",
        {
          className: "rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary",
          children: tag.name
        },
        tag.id
      )) })
    ] })
  ] });
}
function SearchBar({
  value = "",
  onChange,
  placeholder = "Zoek artikelen..."
}) {
  const [internalValue, setInternalValue] = useState(value);
  const timeoutRef = useRef(null);
  useEffect(() => {
    setInternalValue(value);
  }, [value]);
  const debouncedOnChange = useCallback(
    (newValue) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        onChange(newValue);
      }, 300);
    },
    [onChange]
  );
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);
  const handleChange = (e) => {
    const newValue = e.target.value;
    setInternalValue(newValue);
    debouncedOnChange(newValue);
  };
  return /* @__PURE__ */ jsxs("div", { className: "relative", children: [
    /* @__PURE__ */ jsx(Search, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
    /* @__PURE__ */ jsx(
      "input",
      {
        type: "text",
        value: internalValue,
        onChange: handleChange,
        placeholder,
        className: "w-full rounded-md border border-border bg-secondary py-2 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
      }
    )
  ] });
}
function CategoryFilter({
  categories,
  activeSlug = null,
  onSelect,
  basePath = "/blog"
}) {
  const handleClick = (slug) => {
    if (onSelect) {
      onSelect(slug);
    }
  };
  const isActive = (slug) => activeSlug === slug || slug === null && !activeSlug;
  return /* @__PURE__ */ jsx("nav", { "aria-label": "Categorie\xEBn", children: /* @__PURE__ */ jsxs("ul", { className: "space-y-1", children: [
    /* @__PURE__ */ jsx("li", { children: onSelect ? /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        onClick: () => handleClick(null),
        className: `w-full rounded-md px-3 py-2 text-left text-sm font-medium transition-colors ${isActive(null) ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"}`,
        children: "Alle categorie\xEBn"
      }
    ) : /* @__PURE__ */ jsx(
      "a",
      {
        href: basePath,
        className: `block rounded-md px-3 py-2 text-sm font-medium transition-colors ${isActive(null) ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"}`,
        children: "Alle categorie\xEBn"
      }
    ) }),
    categories.map((category) => /* @__PURE__ */ jsx("li", { children: onSelect ? /* @__PURE__ */ jsxs(
      "button",
      {
        type: "button",
        onClick: () => handleClick(category.slug),
        className: `flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm transition-colors ${isActive(category.slug) ? "bg-primary font-medium text-primary-foreground" : "text-foreground hover:bg-muted"}`,
        children: [
          /* @__PURE__ */ jsx("span", { children: category.name }),
          category.article_count != null && /* @__PURE__ */ jsx(
            "span",
            {
              className: `ml-2 rounded-full px-2 py-0.5 text-xs ${isActive(category.slug) ? "bg-primary-foreground/20 text-primary-foreground" : "bg-muted text-muted-foreground"}`,
              children: category.article_count
            }
          )
        ]
      }
    ) : /* @__PURE__ */ jsxs(
      "a",
      {
        href: `${basePath}/categorie/${category.slug}`,
        className: `flex items-center justify-between rounded-md px-3 py-2 text-sm transition-colors ${isActive(category.slug) ? "bg-primary font-medium text-primary-foreground" : "text-foreground hover:bg-muted"}`,
        children: [
          /* @__PURE__ */ jsx("span", { children: category.name }),
          category.article_count != null && /* @__PURE__ */ jsx(
            "span",
            {
              className: `ml-2 rounded-full px-2 py-0.5 text-xs ${isActive(category.slug) ? "bg-primary-foreground/20 text-primary-foreground" : "bg-muted text-muted-foreground"}`,
              children: category.article_count
            }
          )
        ]
      }
    ) }, category.id))
  ] }) });
}
function getTagSize(count, min, max) {
  if (max === min) return "text-sm";
  const ratio = (count - min) / (max - min);
  if (ratio < 0.25) return "text-xs";
  if (ratio < 0.5) return "text-sm";
  if (ratio < 0.75) return "text-base";
  return "text-lg";
}
function TagCloud({ tags, basePath = "/blog" }) {
  if (tags.length === 0) return null;
  const counts = tags.map((t) => t.article_count);
  const minCount = Math.min(...counts);
  const maxCount = Math.max(...counts);
  return /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: tags.map((tag) => {
    const sizeClass = getTagSize(tag.article_count, minCount, maxCount);
    return /* @__PURE__ */ jsxs(
      "a",
      {
        href: `${basePath}/tag/${tag.slug}`,
        className: `inline-flex items-center rounded-full border border-border bg-muted px-3 py-1 font-medium text-muted-foreground transition-colors hover:border-primary hover:bg-primary/10 hover:text-primary ${sizeClass}`,
        children: [
          tag.name,
          /* @__PURE__ */ jsx("span", { className: "ml-1.5 text-xs opacity-60", children: tag.article_count })
        ]
      },
      tag.id
    );
  }) });
}
function ReadingProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) {
        setProgress(0);
        return;
      }
      const scrolled = Math.min(Math.max(scrollTop / docHeight * 100, 0), 100);
      setProgress(scrolled);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: "fixed left-0 top-0 z-50 h-[3px] w-full bg-transparent",
      role: "progressbar",
      "aria-valuenow": Math.round(progress),
      "aria-valuemin": 0,
      "aria-valuemax": 100,
      "aria-label": "Leesvoortgang",
      children: /* @__PURE__ */ jsx(
        "div",
        {
          className: "h-full bg-primary transition-[width] duration-100 ease-out",
          style: { width: `${progress}%` }
        }
      )
    }
  );
}

export { BlogCard, BlogDetail, BlogGrid, CategoryFilter, ReadingProgress, SearchBar, TagCloud };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map