import React from 'react';
import cx from 'classnames';
import { Icon, Message } from 'semantic-ui-react';
import config from '@plone/volto/registry';
import SlateEditor from 'volto-slate/editor/SlateEditor';
import { handleKey } from 'volto-slate/blocks/Text/keyboard';
import {
  createSlateParagraph,
  isFloated,
  serializeText,
} from '@eeacms/volto-quote-block/helpers';

const QuoteWrapper = (props) => {
  const { children, index, block, mode, handleKeyDown } = props;
  return mode === 'edit' ? (
    <div
      role="presentation"
      onKeyDown={(e) => {
        handleKeyDown(e, index, block, props.blockNode.current);
      }}
      style={{ outline: 'none' }}
      // The tabIndex is required for the keyboard navigation
      /* eslint-disable jsx-a11y/no-noninteractive-tabindex */
      tabIndex={0}
    >
      {children}
    </div>
  ) : (
    children
  );
};

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
    onAddBlock,
    onChangeBlock,
    onFocusNextBlock,
    onFocusPreviousBlock,
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

  const handleKeyDown = React.useCallback(
    (
      e,
      index,
      block,
      node,
      {
        disableEnter = false,
        disableArrowUp = false,
        disableArrowDown = false,
      } = {},
    ) => {
      if (mode === 'edit' && !floated) return;
      const isMultipleSelection = e.shiftKey;
      if (e.key === 'ArrowUp' && !disableArrowUp) {
        onFocusPreviousBlock(block, node, isMultipleSelection);
        e.preventDefault();
      }
      if (e.key === 'ArrowDown' && !disableArrowDown) {
        onFocusNextBlock(block, node, isMultipleSelection);
        e.preventDefault();
      }
      if ((e.key === 'Return' || e.key === 'Enter') && !disableEnter) {
        onAddBlock(config.settings.defaultBlockType, index + 1);
      }
    },
    [onAddBlock, onFocusPreviousBlock, onFocusNextBlock, mode, floated],
  );

  return (
    <QuoteWrapper {...props} handleKeyDown={handleKeyDown}>
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
    </QuoteWrapper>
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

export default Quote;
