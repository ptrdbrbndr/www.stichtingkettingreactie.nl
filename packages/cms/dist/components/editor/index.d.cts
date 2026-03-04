import * as react_jsx_runtime from 'react/jsx-runtime';
import { Editor } from '@tiptap/react';

interface TiptapEditorProps {
    content?: Record<string, unknown>;
    onChange?: (json: Record<string, unknown>, html: string) => void;
    placeholder?: string;
    editable?: boolean;
    onImageUpload?: (file: File) => Promise<string>;
}
declare function TiptapEditor({ content, onChange, placeholder, editable, onImageUpload, }: TiptapEditorProps): react_jsx_runtime.JSX.Element | null;

interface ToolbarProps {
    editor: Editor;
    onImageUpload?: (file: File) => Promise<string>;
}
declare function Toolbar({ editor, onImageUpload }: ToolbarProps): react_jsx_runtime.JSX.Element;

interface ImageUploadProps {
    onUpload: (file: File) => Promise<string>;
    currentImage?: string | null;
    onRemove?: () => void;
    label?: string;
}
declare function ImageUpload({ onUpload, currentImage, onRemove, label, }: ImageUploadProps): react_jsx_runtime.JSX.Element;

export { ImageUpload, TiptapEditor, Toolbar };
