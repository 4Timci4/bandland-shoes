import React, { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

const TipTapEditor = ({ value, onChange, placeholder }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    content: value || '',
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  // İçerik dışarıdan değiştiğinde editor içeriğini güncelle
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || '');
    }
  }, [value, editor]);

  return (
    <div className="tiptap-editor-wrapper">
      <EditorContent 
        editor={editor}
        className="tiptap-editor" 
        style={{
          border: '1px solid #ccc',
          borderRadius: '4px',
          padding: '10px',
          minHeight: '300px',
          background: '#fff'
        }}
      />
      {editor && (
        <div className="tiptap-toolbar" style={{ marginTop: '10px', display: 'flex', gap: '5px' }}>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`toolbar-button ${editor.isActive('bold') ? 'is-active' : ''}`}
            style={{
              padding: '5px 10px',
              background: editor.isActive('bold') ? '#eee' : '#f8f8f8',
              border: '1px solid #ccc',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Kalın
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`toolbar-button ${editor.isActive('italic') ? 'is-active' : ''}`}
            style={{
              padding: '5px 10px',
              background: editor.isActive('italic') ? '#eee' : '#f8f8f8',
              border: '1px solid #ccc',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            İtalik
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            className={`toolbar-button ${editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}`}
            style={{
              padding: '5px 10px',
              background: editor.isActive('heading', { level: 3 }) ? '#eee' : '#f8f8f8',
              border: '1px solid #ccc',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Başlık
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`toolbar-button ${editor.isActive('bulletList') ? 'is-active' : ''}`}
            style={{
              padding: '5px 10px',
              background: editor.isActive('bulletList') ? '#eee' : '#f8f8f8',
              border: '1px solid #ccc',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Madde İşaretleri
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`toolbar-button ${editor.isActive('orderedList') ? 'is-active' : ''}`}
            style={{
              padding: '5px 10px',
              background: editor.isActive('orderedList') ? '#eee' : '#f8f8f8',
              border: '1px solid #ccc',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Numaralı Liste
          </button>
        </div>
      )}
    </div>
  );
};

export default TipTapEditor;