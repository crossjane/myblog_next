"use client";
import React from "react";
import { EditorContent, useEditor, useEditorState } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Typography from "@tiptap/extension-typography";
import Highlight from "@tiptap/extension-highlight";

function ReadonlyEditor({ content }) {
  const editor = useEditor({
    extensions: [StarterKit, Highlight, Typography],
    content,
    editable: false,
    editorProps: { //여기서부터 추가 . 이게모임??
      attributes: {
        class: "prose",
      },
    },
    immediatelyRender: false,
  });
  if (!editor) {
    return null;
  }
  return <EditorContent editor={editor} content={content} />;
}
export default ReadonlyEditor;
