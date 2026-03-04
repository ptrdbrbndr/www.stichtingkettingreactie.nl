import * as react_jsx_runtime from 'react/jsx-runtime';
import { A as Article, a as ArticleStatus, C as Category, T as Tag } from '../../article-B5E4g7kR.cjs';

interface Media {
    id: string;
    filename: string;
    storage_path: string;
    url: string;
    mime_type: string | null;
    size_bytes: number | null;
    alt_text: string | null;
    uploaded_by: string | null;
    created_at: string;
}

interface ArticleStats {
    article_id: string;
    title: string;
    slug: string;
    total_views: number;
    views_today: number;
    views_this_week: number;
    views_this_month: number;
}

interface ArticleListProps {
    articles: Article[];
    total: number;
    page: number;
    onPageChange: (page: number) => void;
    onSearch: (query: string) => void;
    onStatusFilter: (status: ArticleStatus | "all") => void;
    onDelete: (id: string) => void;
    onEdit: (id: string) => void;
    basePath?: string;
    pageSize?: number;
}
declare function ArticleList({ articles, total, page, onPageChange, onSearch, onStatusFilter, onDelete, onEdit, basePath, pageSize, }: ArticleListProps): react_jsx_runtime.JSX.Element;

interface ArticleFormData {
    title: string;
    slug: string;
    excerpt: string;
    content: Record<string, unknown>;
    content_html: string;
    category_id: string;
    featured_image: string | null;
    meta_title: string;
    meta_description: string;
    og_image: string;
    canonical_url: string;
    scheduled_at: string;
}
interface ArticleFormProps {
    article?: Article;
    categories: Category[];
    tags: Tag[];
    onSave: (data: Partial<ArticleFormData>, tagIds: string[]) => void;
    onPublish: (data: Partial<ArticleFormData>, tagIds: string[]) => void;
    onSchedule: (data: Partial<ArticleFormData>, tagIds: string[]) => void;
    onImageUpload: (file: File) => Promise<string>;
}
declare function ArticleForm({ article, categories, tags, onSave, onPublish, onSchedule, onImageUpload, }: ArticleFormProps): react_jsx_runtime.JSX.Element;

interface CategoryWithCount extends Category {
    article_count?: number;
}
interface CategoryManagerProps {
    categories: CategoryWithCount[];
    onCreate: (data: {
        name: string;
        slug: string;
        description?: string;
    }) => void;
    onUpdate: (id: string, data: {
        name: string;
        slug: string;
        description?: string;
    }) => void;
    onDelete: (id: string) => void;
}
declare function CategoryManager({ categories, onCreate, onUpdate, onDelete, }: CategoryManagerProps): react_jsx_runtime.JSX.Element;

interface TagManagerProps {
    tags: Tag[];
    onCreate: (data: {
        name: string;
        slug: string;
    }) => void;
    onDelete: (id: string) => void;
}
declare function TagManager({ tags, onCreate, onDelete }: TagManagerProps): react_jsx_runtime.JSX.Element;

interface MediaLibraryProps {
    media: Media[];
    total: number;
    onUpload: (file: File) => Promise<void>;
    onDelete: (id: string) => void;
    onSelect?: (media: Media) => void;
    page: number;
    onPageChange: (page: number) => void;
    pageSize?: number;
}
declare function MediaLibrary({ media, total, onUpload, onDelete, onSelect, page, onPageChange, pageSize, }: MediaLibraryProps): react_jsx_runtime.JSX.Element;

interface AnalyticsDashboardProps {
    stats: {
        totalViews: number;
        articleCount: number;
        popularArticles: ArticleStats[];
    };
}
declare function AnalyticsDashboard({ stats }: AnalyticsDashboardProps): react_jsx_runtime.JSX.Element;

export { AnalyticsDashboard, ArticleForm, ArticleList, CategoryManager, MediaLibrary, TagManager };
