import React, {
  useCallback,
  useMemo,
  useRef,
  useState,
  ReactElement,
} from "react";
import {
  EditorState,
  convertToRaw,
  convertFromRaw,
  CompositeDecorator,
} from "draft-js";
import Editor from "@draft-js-plugins/editor";
import createMentionPlugin, {
  defaultSuggestionsFilter,
} from "@draft-js-plugins/mention";
import editorStyles from "./SimpleMentionEditor.module.css";
import mentions from "./Mentions";
import "@draft-js-plugins/mention/lib/plugin.css";
import { MentionData } from "@draft-js-plugins/mention";

export default function SimpleMentionEditor(): ReactElement {
  const ref = useRef<Editor>(null);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [open, setOpen] = useState(false);
  const [suggestions, setSuggestions] = useState(mentions);
  const [contentSaved, setContentSaved] = useState("");

  const { MentionSuggestions, plugins } = useMemo(() => {
    const mentionPlugin = createMentionPlugin();
    // eslint-disable-next-line no-shadow
    const { MentionSuggestions } = mentionPlugin;
    // eslint-disable-next-line no-shadow
    const plugins = [mentionPlugin];
    return { plugins, MentionSuggestions };
  }, []);

  const onOpenChange = useCallback((_open: boolean) => {
    setOpen(_open);
  }, []);
  const onSearchChange = useCallback(({ value }: { value: string }) => {
    setSuggestions(defaultSuggestionsFilter(value, mentions));
  }, []);
  const onAddMention = useCallback((mention: MentionData) => {
    // console.log(mention);
  }, []);

  function findLinkEntities(contentBlock, callback, contentState) {
    contentBlock.findEntityRanges((character) => {
      const entityKey = character.getEntity();

      return (
        entityKey !== null &&
        contentState.getEntity(entityKey).getType() === "mention"
      );
    }, callback);
  }

  const Link = (props) => {
    const { link } = props.contentState
      .getEntity(props.entityKey)
      .getData().mention;
    console.log("link", link);

    return <a href={link}>{props.children}</a>;
  };

  const decorator = new CompositeDecorator([
    {
      strategy: findLinkEntities,
      component: Link,
    },
  ]);

  const ReadOnlyEditor = () => {
    let contentState = EditorState.createEmpty(decorator);
    if (contentSaved) {
      contentState = contentSaved;
      console.log("contentSaved", JSON.parse(contentSaved));
      const content = convertFromRaw(JSON.parse(contentSaved));
      console.log("content", content);

      contentState = EditorState.createWithContent(content, decorator);
      console.log("contentState", contentState);
    }

    return (
      <div className="readonly-editor">
        <Editor
          editorState={contentState}
          onChange={() => {}}
          readOnly={true}
        />
      </div>
    );
  };

  return (
    <div>
      <p style={{ margin: "auto", marginTop: "2rem", width: "50%" }}>Editor</p>
      <div
        className={editorStyles.editor}
        onClick={() => {
          ref.current!.focus();
        }}
      >
        <Editor
          editorKey={"editor"}
          editorState={editorState}
          onChange={setEditorState}
          plugins={plugins}
          ref={ref}
        />
        <MentionSuggestions
          open={open}
          onOpenChange={onOpenChange}
          suggestions={suggestions}
          onSearchChange={onSearchChange}
          onAddMention={onAddMention}
        />
        <button
          style={{ width: "70px" }}
          onClick={() => {
            console.log("editorState", editorState);
            const editorContent = editorState.getCurrentContent();
            console.log("editorContent", editorContent);
            const contentJson = convertToRaw(editorContent);
            console.log("contentJson", contentJson);
            setContentSaved(JSON.stringify(contentJson));
            console.log("Saved!");
          }}
        >
          Save
        </button>
      </div>
      <p style={{ margin: "auto", marginTop: "2rem", width: "50%" }}>
        Saved content
      </p>
      <div className={editorStyles.editor}>
        <ReadOnlyEditor />
      </div>
    </div>
  );
}
