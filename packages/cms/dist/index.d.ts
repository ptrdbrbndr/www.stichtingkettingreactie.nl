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

interface Page {
    id: string;
    slug: string;
    title: string;
    subtitle: string | null;
    content: Record<string, unknown>;
    content_html: string | null;
    featured_image: string | null;
    meta_title: string | null;
    meta_description: string | null;
    og_image: string | null;
    status: "draft" | "published";
    created_at: string;
    updated_at: string;
    blocks?: PageBlock[];
}
interface PageBlock {
    id: string;
    page_id: string;
    block_type: string;
    content: Record<string, unknown>;
    sort_order: number;
    created_at: string;
}
interface PageInsert {
    slug: string;
    title: string;
    subtitle?: string | null;
    content?: Record<string, unknown>;
    content_html?: string | null;
    featured_image?: string | null;
    meta_title?: string | null;
    meta_description?: string | null;
    og_image?: string | null;
    status?: "draft" | "published";
}
type PageUpdate = Partial<PageInsert>;
interface PageBlockInsert {
    page_id: string;
    block_type: string;
    content: Record<string, unknown>;
    sort_order?: number;
}
type PageBlockUpdate = Partial<Omit<PageBlockInsert, "page_id">>;

interface HomepageConfig {
    id: string;
    hero_title: string;
    hero_subtitle: string | null;
    hero_image: string | null;
    hero_cta_text: string | null;
    hero_cta_href: string | null;
    mission_badge: string | null;
    mission_title: string | null;
    mission_text: string | null;
    projects_badge: string | null;
    projects_title: string | null;
    projects_subtitle: string | null;
    news_badge: string | null;
    news_title: string | null;
    news_limit: number;
    donate_title: string | null;
    donate_text: string | null;
    donate_iban: string | null;
    donate_iban_name: string | null;
    updated_at: string;
}
type HomepageConfigUpdate = Partial<Omit<HomepageConfig, "id" | "updated_at">>;

interface TeamMember {
    id: string;
    name: string;
    role: string;
    bio: string | null;
    photo_url: string | null;
    email: string | null;
    sort_order: number;
    active: boolean;
    created_at: string;
    updated_at: string;
}
interface TeamMemberInsert {
    name: string;
    role: string;
    bio?: string | null;
    photo_url?: string | null;
    email?: string | null;
    sort_order?: number;
    active?: boolean;
}
type TeamMemberUpdate = Partial<TeamMemberInsert>;

type NavigationLocation = "header" | "footer";
interface NavigationItem {
    id: string;
    label: string;
    href: string;
    parent_id: string | null;
    sort_order: number;
    location: NavigationLocation;
    open_in_new_tab: boolean;
    active: boolean;
    created_at: string;
    children?: NavigationItem[];
}
interface NavigationItemInsert {
    label: string;
    href: string;
    parent_id?: string | null;
    sort_order?: number;
    location?: NavigationLocation;
    open_in_new_tab?: boolean;
    active?: boolean;
}
type NavigationItemUpdate = Partial<NavigationItemInsert>;

type IssueCategory = "bug" | "inhoud" | "technisch" | "toegang" | "suggestie" | "overig";
type IssuePriority = "laag" | "normaal" | "hoog" | "kritiek";
type IssueStatus = "open" | "in_behandeling" | "opgelost" | "gesloten";
type IssueSource = "admin" | "leden" | "public";
interface Issue {
    id: string;
    reporter_name: string | null;
    reporter_email: string | null;
    reporter_user_id: string | null;
    source: IssueSource;
    page_url: string | null;
    category: IssueCategory;
    title: string;
    description: string;
    priority: IssuePriority;
    status: IssueStatus;
    assigned_to: string | null;
    admin_notes: string | null;
    resolved_at: string | null;
    created_at: string;
    updated_at: string;
}
interface IssueInsert {
    reporter_name?: string | null;
    reporter_email?: string | null;
    reporter_user_id?: string | null;
    source?: IssueSource;
    page_url?: string | null;
    category: IssueCategory;
    title: string;
    description: string;
    priority?: IssuePriority;
}
interface IssueUpdate {
    status?: IssueStatus;
    priority?: IssuePriority;
    admin_notes?: string | null;
    assigned_to?: string | null;
    resolved_at?: string | null;
}
interface IssueFilters {
    status?: IssueStatus | IssueStatus[];
    category?: IssueCategory;
    source?: IssueSource;
    priority?: IssuePriority;
    search?: string;
    limit?: number;
    offset?: number;
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

declare function getPages(supabase: SupabaseClient, options?: {
    includeBlocks?: boolean;
    includeDrafts?: boolean;
}): Promise<Page[] | {
    blocks: any[];
    id: string;
    slug: string;
    title: string;
    subtitle: string | null;
    content: Record<string, unknown>;
    content_html: string | null;
    featured_image: string | null;
    meta_title: string | null;
    meta_description: string | null;
    og_image: string | null;
    status: "draft" | "published";
    created_at: string;
    updated_at: string;
}[]>;
declare function getPageBySlug(supabase: SupabaseClient, slug: string, options?: {
    includeDrafts?: boolean;
}): Promise<{
    blocks: any[];
    id: string;
    slug: string;
    title: string;
    subtitle: string | null;
    content: Record<string, unknown>;
    content_html: string | null;
    featured_image: string | null;
    meta_title: string | null;
    meta_description: string | null;
    og_image: string | null;
    status: "draft" | "published";
    created_at: string;
    updated_at: string;
} | null>;
declare function getPageById(supabase: SupabaseClient, id: string): Promise<{
    blocks: any[];
    id: string;
    slug: string;
    title: string;
    subtitle: string | null;
    content: Record<string, unknown>;
    content_html: string | null;
    featured_image: string | null;
    meta_title: string | null;
    meta_description: string | null;
    og_image: string | null;
    status: "draft" | "published";
    created_at: string;
    updated_at: string;
}>;

declare function getHomepageConfig(supabase: SupabaseClient): Promise<HomepageConfig | null>;

declare function getTeamMembers(supabase: SupabaseClient, options?: {
    includeInactive?: boolean;
}): Promise<TeamMember[]>;
declare function getTeamMemberById(supabase: SupabaseClient, id: string): Promise<TeamMember>;

declare function getNavigationItems(supabase: SupabaseClient, options?: {
    location?: NavigationLocation;
    includeInactive?: boolean;
}): Promise<NavigationItem[]>;

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

declare function createPage(supabase: SupabaseClient, data: PageInsert): Promise<Page>;
declare function updatePage(supabase: SupabaseClient, id: string, data: PageUpdate): Promise<Page>;
declare function deletePage(supabase: SupabaseClient, id: string): Promise<void>;
declare function createPageBlock(supabase: SupabaseClient, data: PageBlockInsert): Promise<PageBlock>;
declare function updatePageBlock(supabase: SupabaseClient, id: string, data: PageBlockUpdate): Promise<PageBlock>;
declare function deletePageBlock(supabase: SupabaseClient, id: string): Promise<void>;
declare function reorderPageBlocks(supabase: SupabaseClient, orderedIds: string[]): Promise<void>;

declare function upsertHomepageConfig(supabase: SupabaseClient, data: HomepageConfigUpdate): Promise<HomepageConfig>;

declare function createTeamMember(supabase: SupabaseClient, data: TeamMemberInsert): Promise<TeamMember>;
declare function updateTeamMember(supabase: SupabaseClient, id: string, data: TeamMemberUpdate): Promise<TeamMember>;
declare function deleteTeamMember(supabase: SupabaseClient, id: string): Promise<void>;
declare function reorderTeamMembers(supabase: SupabaseClient, orderedIds: string[]): Promise<void>;

declare function createNavigationItem(supabase: SupabaseClient, data: NavigationItemInsert): Promise<NavigationItem>;
declare function updateNavigationItem(supabase: SupabaseClient, id: string, data: NavigationItemUpdate): Promise<NavigationItem>;
declare function deleteNavigationItem(supabase: SupabaseClient, id: string): Promise<void>;
declare function reorderNavigationItems(supabase: SupabaseClient, orderedIds: string[]): Promise<void>;

declare function getIssues(supabase: SupabaseClient, filters?: IssueFilters): Promise<{
    issues: Issue[];
    total: number;
}>;
declare function getIssueById(supabase: SupabaseClient, id: string): Promise<Issue>;
declare function getIssueCountByStatus(supabase: SupabaseClient): Promise<Record<string, number>>;

declare function createIssue(supabase: SupabaseClient, data: IssueInsert): Promise<Issue>;
declare function updateIssue(supabase: SupabaseClient, id: string, data: IssueUpdate): Promise<Issue>;
declare function deleteIssue(supabase: SupabaseClient, id: string): Promise<void>;

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

export { type Article, type ArticleFilters, type ArticleInsert, type ArticleStats, type ArticleStatus, type ArticleUpdate, type ArticleView, type ArticleViewInsert, type Category, type CategoryInsert, type CategoryUpdate, type HomepageConfig, type HomepageConfigUpdate, type Issue, type IssueCategory, type IssueFilters, type IssueInsert, type IssuePriority, type IssueSource, type IssueStatus, type IssueUpdate, type Media, type MediaInsert, type NavigationItem, type NavigationItemInsert, type NavigationItemUpdate, type NavigationLocation, type Page, type PageBlock, type PageBlockInsert, type PageBlockUpdate, type PageInsert, type PageUpdate, type Tag, type TagInsert, type TeamMember, type TeamMemberInsert, type TeamMemberUpdate, archiveArticle, calculateReadingTime, createArticle, createCategory, createIssue, createNavigationItem, createPage, createPageBlock, createTag, createTeamMember, deleteArticle, deleteCategory, deleteIssue, deleteMedia, deleteNavigationItem, deletePage, deletePageBlock, deleteTag, deleteTeamMember, formatReadingTime, getArticleById, getArticleBySlug, getArticleCount, getArticleViews, getArticles, getCategories, getCategoriesWithCounts, getCategoryBySlug, getHomepageConfig, getIssueById, getIssueCountByStatus, getIssues, getMediaFiles, getNavigationItems, getPageById, getPageBySlug, getPages, getPopularArticles, getPopularTags, getTags, getTagsForArticle, getTeamMemberById, getTeamMembers, getTotalViews, publishArticle, reorderCategories, reorderNavigationItems, reorderPageBlocks, reorderTeamMembers, scheduleArticle, slugify, trackView, unpublishArticle, updateArticle, updateCategory, updateIssue, updateNavigationItem, updatePage, updatePageBlock, updateTeamMember, uploadMedia, upsertHomepageConfig, upsertTag };
