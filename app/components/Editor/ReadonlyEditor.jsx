"use client";
import React from "react";
import { EditorContent, useEditor, useEditorState } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Typography from "@tiptap/extension-typography";
import Highlight from "@tiptap/extension-highlight";
import { CodeBlockLowlight } from "@tiptap/extension-code-block-lowlight";
import { all, createLowlight } from "lowlight";
import js from "highlight.js/lib/languages/javascript";
import ts from "highlight.js/lib/languages/typescript";
import html from "highlight.js/lib/languages/xml";
import css from "highlight.js/lib/languages/css";

const lowlight = createLowlight(all);
lowlight.register("js", js);
lowlight.register("ts", ts);
lowlight.register("html", html);
lowlight.register("css", css);

function ReadonlyEditor({ content }) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
        codeBlock: false,
      }),
      Highlight,
      Typography,
      CodeBlockLowlight.configure({ lowlight }),
    ],
    content,
    editable: false,
    immediatelyRender: false,
  });
  if (!editor) {
    return null;
  }
  return <EditorContent editor={editor} content={content} />;
}
export default ReadonlyEditor;
