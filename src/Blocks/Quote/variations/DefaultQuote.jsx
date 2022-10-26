import React from 'react';
import cx from 'classnames';
import { connect } from 'react-redux';
import { Icon, Message } from 'semantic-ui-react';
import config from '@plone/volto/registry';
import SlateEditor from '@plone/volto-slate/editor/SlateEditor';
import { handleKey } from '@plone/volto-slate/blocks/Text/keyboard';
import {
  uploadContent,
  saveSlateBlockSelection,
} from '@plone/volto-slate/actions';
import {
  createSlateParagraph,
  isFloated,
  serializeText,
} from '@eeacms/volto-quote-block/helpers';

const Quote = (props) => {
  const { slate } = config.settings;
  const { icons } = {};
  const {
    data,
    mode,
    index,
    block,
    selected,
    properties,
    onChangeBlock,
    onSelectBlock,
  } = props;
  const { value, source, extra, position = null, reversed = false } = data;
  const floated = isFloated(position);

  const withBlockProperties = React.useCallback(
    (editor) => {
      editor.getBlockProps = () => props;
      return editor;
    },
    [props],
  );

  const handleFocus = React.useCallback(() => {
    if (!selected) {
      onSelectBlock(block);
    }
  }, [onSelectBlock, selected, block]);

  return (
    <>
      {mode === 'edit' && floated && (
        <Message color="teal">
          <Message.Header>Click here to edit quote.</Message.Header>
        </Message>
      )}
      <blockquote
        className={cx('eea quote', position, {
          reversed,
        })}
      >
        <div className="content">
          {reversed && source && (
            <Quote.Source>{serializeText(source)}</Quote.Source>
          )}
          {reversed && extra && (
            <Quote.Extra>{serializeText(extra)}</Quote.Extra>
          )}
          {mode === 'edit' && !floated ? (
            <Quote.Quote icons={icons}>
              <SlateEditor
                index={index}
                properties={properties}
                extensions={slate.textblockExtensions}
                renderExtensions={[withBlockProperties]}
                value={createSlateParagraph(value)}
                onChange={(value) => {
                  onChangeBlock(block, {
                    ...data,
                    value,
                  });
                }}
                block={block}
                onFocus={handleFocus}
                onKeyDown={handleKey}
                selected={selected}
                placeholder="Add quote"
                slateSettings={slate}
              />
            </Quote.Quote>
          ) : (
            <Quote.Quote icons={icons}>{serializeText(value)}</Quote.Quote>
          )}
          {!reversed && source && (
            <Quote.Source>{serializeText(source)}</Quote.Source>
          )}
          {!reversed && extra && (
            <Quote.Extra>{serializeText(extra)}</Quote.Extra>
          )}
        </div>
      </blockquote>
    </>
  );
};

Quote.Quote = ({ children, as: As, ...rest }) => (
  <div className="quotes wrapper">
    <Icon className="ri-double-quotes-l"></Icon>
    {As ? (
      <As className="quote" {...rest}>
        {children}
      </As>
    ) : (
      <div className="quote">{children}</div>
    )}
    <Icon className="ri-double-quotes-r"></Icon>
  </div>
);

Quote.Source = ({ children, ...rest }) => (
  <div className="source" {...rest}>
    {children}
  </div>
);

Quote.Extra = ({ children, ...rest }) => (
  <div className="info" {...rest}>
    {children}
  </div>
);

export default connect(
  (state, props) => {
    const blockId = props.block;
    return {
      defaultSelection: blockId
        ? state.slate_block_selections?.[blockId]
        : null,
      uploadRequest: state.upload_content?.[props.block]?.upload || {},
      uploadedContent: state.upload_content?.[props.block]?.data || {},
    };
  },
  {
    uploadContent,
    saveSlateBlockSelection, // needed as editor blockProps
  },
)(Quote);
