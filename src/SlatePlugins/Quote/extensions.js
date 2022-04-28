import { nanoid } from 'volto-slate/utils';
import { Transforms } from 'slate';

export const withBlockquote = (editor) => {
  const { normalizeNode, isInline } = editor;

  editor.isInline = (element) => {
    return element.type === 'blockquote' ? true : isInline(element);
  };

  editor.normalizeNode = (entry) => {
    const [node, path] = entry;

    if (node.type === 'blockquote' && !node.data?.uid) {
      Transforms.setNodes(
        editor,
        {
          data: {
            uid: nanoid(5),
          },
        },
        {
          at: path,
        },
      );
    }
    return normalizeNode(entry);
  };

  return editor;
};

// will replace existing uid with a new one
// this will be usefull when copy/pase items have the same uid
export const withBeforeInsertFragment = (editor) => {
  const { beforeInsertFragment } = editor;
  editor.beforeInsertFragment = (parsed) => {
    if (parsed?.[0]?.children?.[0]?.data?.uid) {
      parsed[0].children[0].data.uid = nanoid(5);
    }
    return beforeInsertFragment ? beforeInsertFragment(parsed) : parsed;
  };

  return editor;
};
