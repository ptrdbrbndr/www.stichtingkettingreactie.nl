interface Category {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    parent_id: string | null;
    sort_order: number;
    created_at: string;
    parent?: Category | null;
    children?: Category[];
    article_count?: number;
}

interface Tag {
    id: string;
    name: string;
    slug: string;
    article_count?: number;
}

type ArticleStatus = "draft" | "scheduled" | "published" | "archived";
interface Article {
    id: string;
    title: string;
    slug: string;
    excerpt: string | null;
    content: Record<string, unknown>;
    content_html: string | null;
    featured_image: string | null;
    category_id: string | null;
    author_id: string | null;
    status: ArticleStatus;
    published_at: string | null;
    scheduled_at: string | null;
    meta_title: string | null;
    meta_description: string | null;
    og_image: string | null;
    canonical_url: string | null;
    reading_time_minutes: number | null;
    created_at: string;
    updated_at: string;
    category?: Category | null;
    tags?: Tag[];
}

export type { Article as A, Category as C, Tag as T, ArticleStatus as a };
