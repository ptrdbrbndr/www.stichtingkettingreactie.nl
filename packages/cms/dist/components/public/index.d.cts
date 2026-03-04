import * as react_jsx_runtime from 'react/jsx-runtime';
import { A as Article, C as Category, T as Tag } from '../../article-B5E4g7kR.cjs';

interface BlogCardProps {
    article: Article;
    basePath?: string;
}
declare function BlogCard({ article, basePath }: BlogCardProps): react_jsx_runtime.JSX.Element;

interface BlogGridProps {
    articles: Article[];
    basePath?: string;
    loading?: boolean;
    page?: number;
    totalPages?: number;
    onPageChange?: (page: number) => void;
}
declare function BlogGrid({ articles, basePath, loading, page, totalPages, onPageChange, }: BlogGridProps): react_jsx_runtime.JSX.Element;

interface BlogDetailProps {
    article: Article;
}
declare function BlogDetail({ article }: BlogDetailProps): react_jsx_runtime.JSX.Element;

interface SearchBarProps {
    value?: string;
    onChange: (value: string) => void;
    placeholder?: string;
}
declare function SearchBar({ value, onChange, placeholder, }: SearchBarProps): react_jsx_runtime.JSX.Element;

interface CategoryFilterProps {
    categories: Category[];
    activeSlug?: string | null;
    onSelect?: (slug: string | null) => void;
    basePath?: string;
}
declare function CategoryFilter({ categories, activeSlug, onSelect, basePath, }: CategoryFilterProps): react_jsx_runtime.JSX.Element;

interface TagCloudProps {
    tags: (Tag & {
        article_count: number;
    })[];
    basePath?: string;
}
declare function TagCloud({ tags, basePath }: TagCloudProps): react_jsx_runtime.JSX.Element | null;

declare function ReadingProgress(): react_jsx_runtime.JSX.Element;

export { BlogCard, type BlogCardProps, BlogDetail, type BlogDetailProps, BlogGrid, type BlogGridProps, CategoryFilter, type CategoryFilterProps, ReadingProgress, SearchBar, type SearchBarProps, TagCloud, type TagCloudProps };
