// src/queries/articles.ts
async function getArticles(supabase, filters = {}) {
  const {
    status,
    category_id,
    tag_id,
    search,
    author_id,
    limit = 20,
    offset = 0,
    orderBy = "published_at",
    orderDirection = "desc"
  } = filters;
  let query = supabase.from("articles").select("*, category:categories(*)", { count: "exact" });
  if (status) {
    if (Array.isArray(status)) {
      query = query.in("status", status);
    } else {
      query = query.eq("status", status);
    }
  }
  if (category_id) {
    query = query.eq("category_id", category_id);
  }
  if (author_id) {
    query = query.eq("author_id", author_id);
  }
  if (search) {
    query = query.or(
      `title.ilike.%${search}%,excerpt.ilike.%${search}%,content_html.ilike.%${search}%`
    );
  }
  query = query.order(orderBy, { ascending: orderDirection === "asc", nullsFirst: false }).range(offset, offset + limit - 1);
  const { data, error, count } = await query;
  if (error) throw error;
  let articles = data ?? [];
  if (tag_id && articles.length > 0) {
    const { data: taggedIds } = await supabase.from("article_tags").select("article_id").eq("tag_id", tag_id);
    const taggedArticleIds = new Set(
      taggedIds?.map((t) => t.article_id) ?? []
    );
    articles = articles.filter((a) => taggedArticleIds.has(a.id));
  }
  return { articles, total: count ?? 0 };
}
async function getArticleBySlug(supabase, slug, includeDrafts = false) {
  let query = supabase.from("articles").select("*, category:categories(*)").eq("slug", slug);
  if (!includeDrafts) {
    query = query.eq("status", "published");
  }
  const { data: article, error } = await query.single();
  if (error) throw error;
  if (!article) return null;
  const { data: tagRelations } = await supabase.from("article_tags").select("tag_id, tags(*)").eq("article_id", article.id);
  const tags = tagRelations?.map((r) => r.tags).flat().filter(Boolean) ?? [];
  return { ...article, tags };
}
async function getArticleById(supabase, id) {
  const { data: article, error } = await supabase.from("articles").select("*, category:categories(*)").eq("id", id).single();
  if (error) throw error;
  if (!article) return null;
  const { data: tagRelations } = await supabase.from("article_tags").select("tag_id, tags(*)").eq("article_id", article.id);
  const tags = tagRelations?.map((r) => r.tags).flat().filter(Boolean) ?? [];
  return { ...article, tags };
}
async function getArticleCount(supabase, status) {
  let query = supabase.from("articles").select("id", { count: "exact", head: true });
  if (status) {
    query = query.eq("status", status);
  }
  const { count, error } = await query;
  if (error) throw error;
  return count ?? 0;
}

// src/queries/categories.ts
async function getCategories(supabase) {
  const { data, error } = await supabase.from("categories").select("*").order("sort_order", { ascending: true });
  if (error) throw error;
  return data ?? [];
}
async function getCategoryBySlug(supabase, slug) {
  const { data, error } = await supabase.from("categories").select("*").eq("slug", slug).single();
  if (error) throw error;
  return data;
}
async function getCategoriesWithCounts(supabase) {
  const { data: categories, error } = await supabase.from("categories").select("*").order("sort_order", { ascending: true });
  if (error) throw error;
  const { data: counts } = await supabase.from("articles").select("category_id").eq("status", "published");
  const countMap = /* @__PURE__ */ new Map();
  counts?.forEach((a) => {
    if (a.category_id) {
      countMap.set(a.category_id, (countMap.get(a.category_id) ?? 0) + 1);
    }
  });
  return (categories ?? []).map((cat) => ({
    ...cat,
    article_count: countMap.get(cat.id) ?? 0
  }));
}

// src/queries/tags.ts
async function getTags(supabase) {
  const { data, error } = await supabase.from("tags").select("*").order("name", { ascending: true });
  if (error) throw error;
  return data ?? [];
}
async function getPopularTags(supabase, limit = 20) {
  const { data: tagRelations, error } = await supabase.from("article_tags").select("tag_id, tags(*)");
  if (error) throw error;
  const tagCounts = /* @__PURE__ */ new Map();
  tagRelations?.forEach((rel) => {
    if (rel.tags) {
      const tag = rel.tags;
      const existing = tagCounts.get(tag.id);
      if (existing) {
        existing.count++;
      } else {
        tagCounts.set(tag.id, { tag, count: 1 });
      }
    }
  });
  return Array.from(tagCounts.values()).sort((a, b) => b.count - a.count).slice(0, limit).map(({ tag, count }) => ({ ...tag, article_count: count }));
}
async function getTagsForArticle(supabase, articleId) {
  const { data, error } = await supabase.from("article_tags").select("tags(*)").eq("article_id", articleId);
  if (error) throw error;
  return data?.map((r) => r.tags).flat().filter(Boolean) ?? [];
}

// src/queries/analytics.ts
async function getArticleViews(supabase, articleId) {
  const { count, error } = await supabase.from("article_analytics").select("id", { count: "exact", head: true }).eq("article_id", articleId);
  if (error) throw error;
  return count ?? 0;
}
async function getPopularArticles(supabase, options = {}) {
  const { days = 30, limit = 10 } = options;
  const since = /* @__PURE__ */ new Date();
  since.setDate(since.getDate() - days);
  const { data, error } = await supabase.rpc("get_popular_articles", {
    since_date: since.toISOString(),
    result_limit: limit
  });
  if (error) {
    const { data: views } = await supabase.from("article_analytics").select("article_id").gte("viewed_at", since.toISOString());
    const countMap = /* @__PURE__ */ new Map();
    views?.forEach((v) => {
      countMap.set(v.article_id, (countMap.get(v.article_id) ?? 0) + 1);
    });
    const sorted = Array.from(countMap.entries()).sort((a, b) => b[1] - a[1]).slice(0, limit);
    if (sorted.length === 0) return [];
    const { data: articles } = await supabase.from("articles").select("id, title, slug").in(
      "id",
      sorted.map(([id]) => id)
    );
    return sorted.map(([articleId, total_views]) => {
      const article = articles?.find((a) => a.id === articleId);
      return {
        article_id: articleId,
        title: article?.title ?? "",
        slug: article?.slug ?? "",
        total_views,
        views_today: 0,
        views_this_week: 0,
        views_this_month: total_views
      };
    });
  }
  return data ?? [];
}
async function getTotalViews(supabase, days = 30) {
  const since = /* @__PURE__ */ new Date();
  since.setDate(since.getDate() - days);
  const { count, error } = await supabase.from("article_analytics").select("id", { count: "exact", head: true }).gte("viewed_at", since.toISOString());
  if (error) throw error;
  return count ?? 0;
}

// src/queries/pages.ts
async function getPages(supabase, options = {}) {
  const { includeBlocks = false, includeDrafts = false } = options;
  let query = supabase.from("pages").select("*").order("title", { ascending: true });
  if (!includeDrafts) {
    query = query.eq("status", "published");
  }
  const { data, error } = await query;
  if (error) throw error;
  const pages = data ?? [];
  if (includeBlocks && pages.length > 0) {
    const pageIds = pages.map((p) => p.id);
    const { data: blocks } = await supabase.from("page_blocks").select("*").in("page_id", pageIds).order("sort_order", { ascending: true });
    return pages.map((p) => ({
      ...p,
      blocks: (blocks ?? []).filter((b) => b.page_id === p.id)
    }));
  }
  return pages;
}
async function getPageBySlug(supabase, slug, options = {}) {
  const { includeDrafts = false } = options;
  let query = supabase.from("pages").select("*").eq("slug", slug);
  if (!includeDrafts) {
    query = query.eq("status", "published");
  }
  const { data, error } = await query.maybeSingle();
  if (error) throw error;
  if (!data) return null;
  const page = data;
  const { data: blocks } = await supabase.from("page_blocks").select("*").eq("page_id", page.id).order("sort_order", { ascending: true });
  return { ...page, blocks: blocks ?? [] };
}
async function getPageById(supabase, id) {
  const { data, error } = await supabase.from("pages").select("*").eq("id", id).single();
  if (error) throw error;
  const page = data;
  const { data: blocks } = await supabase.from("page_blocks").select("*").eq("page_id", id).order("sort_order", { ascending: true });
  return { ...page, blocks: blocks ?? [] };
}

// src/queries/homepage.ts
async function getHomepageConfig(supabase) {
  const { data, error } = await supabase.from("homepage_config").select("*").order("updated_at", { ascending: false }).limit(1).maybeSingle();
  if (error) throw error;
  return data;
}

// src/queries/team.ts
async function getTeamMembers(supabase, options = {}) {
  const { includeInactive = false } = options;
  let query = supabase.from("team_members").select("*").order("sort_order", { ascending: true });
  if (!includeInactive) {
    query = query.eq("active", true);
  }
  const { data, error } = await query;
  if (error) throw error;
  return data ?? [];
}
async function getTeamMemberById(supabase, id) {
  const { data, error } = await supabase.from("team_members").select("*").eq("id", id).single();
  if (error) throw error;
  return data;
}

// src/queries/navigation.ts
async function getNavigationItems(supabase, options = {}) {
  const { location, includeInactive = false } = options;
  let query = supabase.from("navigation_items").select("*").order("sort_order", { ascending: true });
  if (location) {
    query = query.eq("location", location);
  }
  if (!includeInactive) {
    query = query.eq("active", true);
  }
  const { data, error } = await query;
  if (error) throw error;
  return data ?? [];
}

// src/utils/reading-time.ts
var WORDS_PER_MINUTE = 200;
function calculateReadingTime(html) {
  const text = html.replace(/<[^>]*>/g, "").trim();
  const wordCount = text.split(/\s+/).filter(Boolean).length;
  const minutes = Math.ceil(wordCount / WORDS_PER_MINUTE);
  return Math.max(1, minutes);
}
function formatReadingTime(minutes) {
  if (minutes <= 1) return "1 min leestijd";
  return `${minutes} min leestijd`;
}

// src/mutations/articles.ts
async function createArticle(supabase, data, tagIds) {
  const reading_time_minutes = data.content_html ? calculateReadingTime(data.content_html) : null;
  const { data: article, error } = await supabase.from("articles").insert({ ...data, reading_time_minutes }).select().single();
  if (error) throw error;
  if (tagIds && tagIds.length > 0 && article) {
    const tagRelations = tagIds.map((tag_id) => ({
      article_id: article.id,
      tag_id
    }));
    const { error: tagError } = await supabase.from("article_tags").insert(tagRelations);
    if (tagError) throw tagError;
  }
  return article;
}
async function updateArticle(supabase, id, data, tagIds) {
  const updates = {
    ...data
  };
  if (data.content_html) {
    updates.reading_time_minutes = calculateReadingTime(data.content_html);
  }
  const { data: article, error } = await supabase.from("articles").update(updates).eq("id", id).select().single();
  if (error) throw error;
  if (tagIds !== void 0) {
    await supabase.from("article_tags").delete().eq("article_id", id);
    if (tagIds.length > 0) {
      const tagRelations = tagIds.map((tag_id) => ({
        article_id: id,
        tag_id
      }));
      const { error: tagError } = await supabase.from("article_tags").insert(tagRelations);
      if (tagError) throw tagError;
    }
  }
  return article;
}
async function deleteArticle(supabase, id) {
  const { error } = await supabase.from("articles").delete().eq("id", id);
  if (error) throw error;
}
async function publishArticle(supabase, id) {
  const { data, error } = await supabase.from("articles").update({
    status: "published",
    published_at: (/* @__PURE__ */ new Date()).toISOString()
  }).eq("id", id).select().single();
  if (error) throw error;
  return data;
}
async function scheduleArticle(supabase, id, scheduledAt) {
  const { data, error } = await supabase.from("articles").update({
    status: "scheduled",
    scheduled_at: scheduledAt
  }).eq("id", id).select().single();
  if (error) throw error;
  return data;
}
async function archiveArticle(supabase, id) {
  const { data, error } = await supabase.from("articles").update({ status: "archived" }).eq("id", id).select().single();
  if (error) throw error;
  return data;
}
async function unpublishArticle(supabase, id) {
  const { data, error } = await supabase.from("articles").update({
    status: "draft",
    published_at: null,
    scheduled_at: null
  }).eq("id", id).select().single();
  if (error) throw error;
  return data;
}

// src/mutations/categories.ts
async function createCategory(supabase, data) {
  const { data: category, error } = await supabase.from("categories").insert(data).select().single();
  if (error) throw error;
  return category;
}
async function updateCategory(supabase, id, data) {
  const { data: category, error } = await supabase.from("categories").update(data).eq("id", id).select().single();
  if (error) throw error;
  return category;
}
async function deleteCategory(supabase, id) {
  const { error } = await supabase.from("categories").delete().eq("id", id);
  if (error) throw error;
}
async function reorderCategories(supabase, orderedIds) {
  const updates = orderedIds.map(
    (id, index) => supabase.from("categories").update({ sort_order: index }).eq("id", id)
  );
  await Promise.all(updates);
}

// src/mutations/tags.ts
async function createTag(supabase, data) {
  const { data: tag, error } = await supabase.from("tags").insert(data).select().single();
  if (error) throw error;
  return tag;
}
async function deleteTag(supabase, id) {
  const { error } = await supabase.from("tags").delete().eq("id", id);
  if (error) throw error;
}
async function upsertTag(supabase, data) {
  const { data: tag, error } = await supabase.from("tags").upsert(data, { onConflict: "slug" }).select().single();
  if (error) throw error;
  return tag;
}

// src/mutations/media.ts
var BUCKET_NAME = "cms-media";
async function uploadMedia(supabase, file, options = {}) {
  const { altText, folder = "uploads" } = options;
  const timestamp = Date.now();
  const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
  const storagePath = `${folder}/${timestamp}-${safeName}`;
  const { error: uploadError } = await supabase.storage.from(BUCKET_NAME).upload(storagePath, file, {
    cacheControl: "3600",
    upsert: false
  });
  if (uploadError) throw uploadError;
  const {
    data: { publicUrl }
  } = supabase.storage.from(BUCKET_NAME).getPublicUrl(storagePath);
  const {
    data: { user }
  } = await supabase.auth.getUser();
  const { data: media, error: dbError } = await supabase.from("media").insert({
    filename: file.name,
    storage_path: storagePath,
    url: publicUrl,
    mime_type: file.type,
    size_bytes: file.size,
    alt_text: altText ?? null,
    uploaded_by: user?.id ?? null
  }).select().single();
  if (dbError) throw dbError;
  return media;
}
async function deleteMedia(supabase, id) {
  const { data: media, error: fetchError } = await supabase.from("media").select("storage_path").eq("id", id).single();
  if (fetchError) throw fetchError;
  if (media) {
    const { error: storageError } = await supabase.storage.from(BUCKET_NAME).remove([media.storage_path]);
    if (storageError) throw storageError;
  }
  const { error: dbError } = await supabase.from("media").delete().eq("id", id);
  if (dbError) throw dbError;
}
async function getMediaFiles(supabase, options = {}) {
  const { limit = 50, offset = 0, search } = options;
  let query = supabase.from("media").select("*", { count: "exact" }).order("created_at", { ascending: false }).range(offset, offset + limit - 1);
  if (search) {
    query = query.ilike("filename", `%${search}%`);
  }
  const { data, error, count } = await query;
  if (error) throw error;
  return { media: data ?? [], total: count ?? 0 };
}

// src/mutations/analytics.ts
async function trackView(supabase, data) {
  const { error } = await supabase.from("article_analytics").insert(data);
  if (error) throw error;
}

// src/mutations/pages.ts
async function createPage(supabase, data) {
  const { data: page, error } = await supabase.from("pages").insert(data).select().single();
  if (error) throw error;
  return page;
}
async function updatePage(supabase, id, data) {
  const { data: page, error } = await supabase.from("pages").update(data).eq("id", id).select().single();
  if (error) throw error;
  return page;
}
async function deletePage(supabase, id) {
  const { error } = await supabase.from("pages").delete().eq("id", id);
  if (error) throw error;
}
async function createPageBlock(supabase, data) {
  const { data: block, error } = await supabase.from("page_blocks").insert(data).select().single();
  if (error) throw error;
  return block;
}
async function updatePageBlock(supabase, id, data) {
  const { data: block, error } = await supabase.from("page_blocks").update(data).eq("id", id).select().single();
  if (error) throw error;
  return block;
}
async function deletePageBlock(supabase, id) {
  const { error } = await supabase.from("page_blocks").delete().eq("id", id);
  if (error) throw error;
}
async function reorderPageBlocks(supabase, orderedIds) {
  const updates = orderedIds.map(
    (id, index) => supabase.from("page_blocks").update({ sort_order: index }).eq("id", id)
  );
  await Promise.all(updates);
}

// src/mutations/homepage.ts
async function upsertHomepageConfig(supabase, data) {
  const { data: existing } = await supabase.from("homepage_config").select("id").limit(1).maybeSingle();
  if (existing) {
    const { data: updated, error: error2 } = await supabase.from("homepage_config").update({ ...data, updated_at: (/* @__PURE__ */ new Date()).toISOString() }).eq("id", existing.id).select().single();
    if (error2) throw error2;
    return updated;
  }
  const { data: created, error } = await supabase.from("homepage_config").insert(data).select().single();
  if (error) throw error;
  return created;
}

// src/mutations/team.ts
async function createTeamMember(supabase, data) {
  const { data: member, error } = await supabase.from("team_members").insert(data).select().single();
  if (error) throw error;
  return member;
}
async function updateTeamMember(supabase, id, data) {
  const { data: member, error } = await supabase.from("team_members").update(data).eq("id", id).select().single();
  if (error) throw error;
  return member;
}
async function deleteTeamMember(supabase, id) {
  const { error } = await supabase.from("team_members").delete().eq("id", id);
  if (error) throw error;
}
async function reorderTeamMembers(supabase, orderedIds) {
  const updates = orderedIds.map(
    (id, index) => supabase.from("team_members").update({ sort_order: index }).eq("id", id)
  );
  await Promise.all(updates);
}

// src/mutations/navigation.ts
async function createNavigationItem(supabase, data) {
  const { data: item, error } = await supabase.from("navigation_items").insert(data).select().single();
  if (error) throw error;
  return item;
}
async function updateNavigationItem(supabase, id, data) {
  const { data: item, error } = await supabase.from("navigation_items").update(data).eq("id", id).select().single();
  if (error) throw error;
  return item;
}
async function deleteNavigationItem(supabase, id) {
  const { error } = await supabase.from("navigation_items").delete().eq("id", id);
  if (error) throw error;
}
async function reorderNavigationItems(supabase, orderedIds) {
  const updates = orderedIds.map(
    (id, index) => supabase.from("navigation_items").update({ sort_order: index }).eq("id", id)
  );
  await Promise.all(updates);
}

// src/queries/issues.ts
async function getIssues(supabase, filters = {}) {
  const {
    status,
    category,
    source,
    priority,
    search,
    limit = 50,
    offset = 0
  } = filters;
  let query = supabase.from("issues").select("*", { count: "exact" }).order("created_at", { ascending: false }).range(offset, offset + limit - 1);
  if (status) {
    if (Array.isArray(status)) {
      query = query.in("status", status);
    } else {
      query = query.eq("status", status);
    }
  }
  if (category) query = query.eq("category", category);
  if (source) query = query.eq("source", source);
  if (priority) query = query.eq("priority", priority);
  if (search) {
    query = query.or(
      `title.ilike.%${search}%,description.ilike.%${search}%,reporter_name.ilike.%${search}%`
    );
  }
  const { data, error, count } = await query;
  if (error) throw error;
  return { issues: data ?? [], total: count ?? 0 };
}
async function getIssueById(supabase, id) {
  const { data, error } = await supabase.from("issues").select("*").eq("id", id).single();
  if (error) throw error;
  return data;
}
async function getIssueCountByStatus(supabase) {
  const { data, error } = await supabase.from("issues").select("status");
  if (error) throw error;
  const counts = {};
  (data ?? []).forEach((row) => {
    counts[row.status] = (counts[row.status] ?? 0) + 1;
  });
  return counts;
}

// src/mutations/issues.ts
async function createIssue(supabase, data) {
  const { data: issue, error } = await supabase.from("issues").insert(data).select().single();
  if (error) throw error;
  return issue;
}
async function updateIssue(supabase, id, data) {
  const payload = { ...data };
  if (data.status === "opgelost" && !data.resolved_at) {
    payload.resolved_at = (/* @__PURE__ */ new Date()).toISOString();
  }
  const { data: issue, error } = await supabase.from("issues").update(payload).eq("id", id).select().single();
  if (error) throw error;
  return issue;
}
async function deleteIssue(supabase, id) {
  const { error } = await supabase.from("issues").delete().eq("id", id);
  if (error) throw error;
}

// src/utils/slugify.ts
function slugify(text) {
  return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
}

export { archiveArticle, calculateReadingTime, createArticle, createCategory, createIssue, createNavigationItem, createPage, createPageBlock, createTag, createTeamMember, deleteArticle, deleteCategory, deleteIssue, deleteMedia, deleteNavigationItem, deletePage, deletePageBlock, deleteTag, deleteTeamMember, formatReadingTime, getArticleById, getArticleBySlug, getArticleCount, getArticleViews, getArticles, getCategories, getCategoriesWithCounts, getCategoryBySlug, getHomepageConfig, getIssueById, getIssueCountByStatus, getIssues, getMediaFiles, getNavigationItems, getPageById, getPageBySlug, getPages, getPopularArticles, getPopularTags, getTags, getTagsForArticle, getTeamMemberById, getTeamMembers, getTotalViews, publishArticle, reorderCategories, reorderNavigationItems, reorderPageBlocks, reorderTeamMembers, scheduleArticle, slugify, trackView, unpublishArticle, updateArticle, updateCategory, updateIssue, updateNavigationItem, updatePage, updatePageBlock, updateTeamMember, uploadMedia, upsertHomepageConfig, upsertTag };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map