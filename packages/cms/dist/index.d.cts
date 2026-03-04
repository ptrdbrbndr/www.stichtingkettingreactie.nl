import { SupabaseClient } from '@supabase/supabase-js';

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
interface CategoryInsert {
    name: string;
    slug: string;
    description?: string | null;
    parent_id?: string | null;
    sort_order?: number;
}
type CategoryUpdate = Partial<CategoryInsert>;

interface Tag {
    id: string;
    name: string;
    slug: string;
    article_count?: number;
}
interface TagInsert {
    name: string;
    slug: string;
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
interface ArticleInsert {
    title: string;
    slug: string;
    excerpt?: string | null;
    content?: Record<string, unknown>;
    content_html?: string | null;
    featured_image?: string | null;
    category_id?: string | null;
    author_id?: string | null;
    status?: ArticleStatus;
    published_at?: string | null;
    scheduled_at?: string | null;
    meta_title?: string | null;
    meta_description?: string | null;
    og_image?: string | null;
    canonical_url?: string | null;
    reading_time_minutes?: number | null;
}
type ArticleUpdate = Partial<ArticleInsert>;
interface ArticleFilters {
    status?: ArticleStatus | ArticleStatus[];
    category_id?: string;
    tag_id?: string;
    search?: string;
    author_id?: string;
    limit?: number;
    offset?: number;
    orderBy?: "published_at" | "created_at" | "updated_at" | "title";
    orderDirection?: "asc" | "desc";
}

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
interface MediaInsert {
    filename: string;
    storage_path: string;
    url: string;
    mime_type?: string | null;
    size_bytes?: number | null;
    alt_text?: string | null;
    uploaded_by?: string | null;
}

interface ArticleView {
    id: string;
    article_id: string;
    viewed_at: string;
    session_id: string | null;
    referrer: string | null;
    user_agent: string | null;
}
interface ArticleViewInsert {
    article_id: string;
    session_id?: string | null;
    referrer?: string | null;
    user_agent?: string | null;
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

/**
 * Fetch articles with optional filtering, pagination, and sorting.
 */
declare function getArticles(supabase: SupabaseClient, filters?: ArticleFilters): Promise<{
    articles: Article[];
    total: number;
}>;
/**
 * Fetch a single article by slug. Includes category and tags.
 */
declare function getArticleBySlug(supabase: SupabaseClient, slug: string, includeDrafts?: boolean): Promise<{
    tags: Tag[];
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
} | null>;
/**
 * Fetch a single article by ID (for admin editing).
 */
declare function getArticleById(supabase: SupabaseClient, id: string): Promise<{
    tags: Tag[];
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
} | null>;
/**
 * Fetch published articles count.
 */
declare function getArticleCount(supabase: SupabaseClient, status?: string): Promise<number>;

/**
 * Fetch all categories ordered by sort_order.
 */
declare function getCategories(supabase: SupabaseClient): Promise<Category[]>;
/**
 * Fetch a single category by slug.
 */
declare function getCategoryBySlug(supabase: SupabaseClient, slug: string): Promise<Category | null>;
/**
 * Fetch categories with article counts.
 */
declare function getCategoriesWithCounts(supabase: SupabaseClient): Promise<{
    article_count: number;
    id: string;
    name: string;
    slug: string;
    description: string | null;
    parent_id: string | null;
    sort_order: number;
    created_at: string;
    parent?: Category | null;
    children?: Category[];
}[]>;

/**
 * Fetch all tags ordered by name.
 */
declare function getTags(supabase: SupabaseClient): Promise<Tag[]>;
/**
 * Fetch popular tags based on article count.
 */
declare function getPopularTags(supabase: SupabaseClient, limit?: number): Promise<{
    article_count: number;
    id: string;
    name: string;
    slug: string;
}[]>;
/**
 * Fetch tags for a specific article.
 */
declare function getTagsForArticle(supabase: SupabaseClient, articleId: string): Promise<Tag[]>;

/**
 * Get view count for a specific article.
 */
declare function getArticleViews(supabase: SupabaseClient, articleId: string): Promise<number>;
/**
 * Get popular articles by view count within a date range.
 */
declare function getPopularArticles(supabase: SupabaseClient, options?: {
    days?: number;
    limit?: number;
}): Promise<{
    article_id: string;
    title: any;
    slug: any;
    total_views: number;
    views_today: number;
    views_this_week: number;
    views_this_month: number;
}[]>;
/**
 * Get total views across all articles for a date range.
 */
declare function getTotalViews(supabase: SupabaseClient, days?: number): Promise<number>;

/**
 * Create a new article.
 */
declare function createArticle(supabase: SupabaseClient, data: ArticleInsert, tagIds?: string[]): Promise<Article>;
/**
 * Update an existing article.
 */
declare function updateArticle(supabase: SupabaseClient, id: string, data: ArticleUpdate, tagIds?: string[]): Promise<Article>;
/**
 * Delete an article.
 */
declare function deleteArticle(supabase: SupabaseClient, id: string): Promise<void>;
/**
 * Publish an article (set status to published, set published_at to now).
 */
declare function publishArticle(supabase: SupabaseClient, id: string): Promise<Article>;
/**
 * Schedule an article for future publication.
 */
declare function scheduleArticle(supabase: SupabaseClient, id: string, scheduledAt: string): Promise<Article>;
/**
 * Archive an article.
 */
declare function archiveArticle(supabase: SupabaseClient, id: string): Promise<Article>;
/**
 * Revert article to draft.
 */
declare function unpublishArticle(supabase: SupabaseClient, id: string): Promise<Article>;

declare function createCategory(supabase: SupabaseClient, data: CategoryInsert): Promise<Category>;
declare function updateCategory(supabase: SupabaseClient, id: string, data: CategoryUpdate): Promise<Category>;
declare function deleteCategory(supabase: SupabaseClient, id: string): Promise<void>;
declare function reorderCategories(supabase: SupabaseClient, orderedIds: string[]): Promise<void>;

declare function createTag(supabase: SupabaseClient, data: TagInsert): Promise<Tag>;
declare function deleteTag(supabase: SupabaseClient, id: string): Promise<void>;
/**
 * Create a tag if it doesn't exist, return the existing one if it does.
 */
declare function upsertTag(supabase: SupabaseClient, data: TagInsert): Promise<Tag>;

/**
 * Upload a file to Supabase Storage and record it in the media table.
 */
declare function uploadMedia(supabase: SupabaseClient, file: File, options?: {
    altText?: string;
    folder?: string;
}): Promise<Media>;
/**
 * Delete a media file from storage and database.
 */
declare function deleteMedia(supabase: SupabaseClient, id: string): Promise<void>;
/**
 * Get all media files, ordered by most recent.
 */
declare function getMediaFiles(supabase: SupabaseClient, options?: {
    limit?: number;
    offset?: number;
    search?: string;
}): Promise<{
    media: Media[];
    total: number;
}>;

/**
 * Track an article page view.
 */
declare function trackView(supabase: SupabaseClient, data: ArticleViewInsert): Promise<void>;

/**
 * Convert a string to a URL-friendly slug.
 * Handles Dutch characters (ë, é, ü, etc.) and common diacritics.
 */
declare function slugify(text: string): string;

/**
 * Calculate estimated reading time in minutes from HTML content.
 */
declare function calculateReadingTime(html: string): number;
/**
 * Format reading time as a human-readable string (Dutch).
 */
declare function formatReadingTime(minutes: number): string;

export { type Article, type ArticleFilters, type ArticleInsert, type ArticleStats, type ArticleStatus, type ArticleUpdate, type ArticleView, type ArticleViewInsert, type Category, type CategoryInsert, type CategoryUpdate, type Media, type MediaInsert, type Tag, type TagInsert, archiveArticle, calculateReadingTime, createArticle, createCategory, createTag, deleteArticle, deleteCategory, deleteMedia, deleteTag, formatReadingTime, getArticleById, getArticleBySlug, getArticleCount, getArticleViews, getArticles, getCategories, getCategoriesWithCounts, getCategoryBySlug, getMediaFiles, getPopularArticles, getPopularTags, getTags, getTagsForArticle, getTotalViews, publishArticle, reorderCategories, scheduleArticle, slugify, trackView, unpublishArticle, updateArticle, updateCategory, uploadMedia, upsertTag };
