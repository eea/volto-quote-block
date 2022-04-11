import React from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import { Icon, Message } from 'semantic-ui-react';
import config from '@plone/volto/registry';
import SlateEditor from 'volto-slate/editor/SlateEditor';
import { handleKey } from 'volto-slate/blocks/Text/keyboard';
import { saveSlateBlockSelection } from 'volto-slate/actions';
import {
  createSlateParagraph,
  isFloated,
  serializeText,
  textNotEmpty,
} from '@eeacms/volto-quote-block/helpers';

import '@eeacms/volto-quote-block/less/pullquote.less';

const Pullquote = (props) => {
  const { slate } = config.settings;
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
  const { quote, source, metadata, position = null, reversed = false } = data;
  const floated = isFloated(position);
  const withInfo = textNotEmpty(source || metadata);

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
      if (e.key === 'Enter' && !disableEnter) {
        onAddBlock(config.settings.defaultBlockType, index + 1);
      }
    },
    [onAddBlock, onFocusPreviousBlock, onFocusNextBlock, mode, floated],
  );

  const PullquoteWrapper = ({ children }) => {
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

  return (
    <PullquoteWrapper>
      {mode === 'edit' && floated && (
        <Message color="teal">
          <Message.Header>Click here to edit quote.</Message.Header>
        </Message>
      )}
      <blockquote
        className={cx('eea pullquote', position, {
          reversed,
          'with-info': withInfo,
        })}
      >
        {mode === 'edit' && !floated ? (
          <Pullquote.Quote>
            <SlateEditor
              index={index}
              properties={properties}
              extensions={slate.textblockExtensions}
              renderExtensions={[withBlockProperties]}
              value={createSlateParagraph(data.quote)}
              onChange={(quote) => {
                onChangeBlock(block, {
                  ...data,
                  quote,
                });
              }}
              block={block}
              onFocus={handleFocus}
              onKeyDown={handleKey}
              selected={selected}
              placeholder="Add quote"
              slateSettings={slate}
            />
          </Pullquote.Quote>
        ) : (
          <Pullquote.Quote>{serializeText(quote)}</Pullquote.Quote>
        )}
        {withInfo && (
          <div className="info wrapper">
            {source && <p className="author">{serializeText(source)}</p>}
            {metadata && <p className="meta">{serializeText(metadata)}</p>}
          </div>
        )}
      </blockquote>
    </PullquoteWrapper>
  );
};

Pullquote.Quote = ({ children, as: As, ...rest }) => (
  <div className="quotes wrapper">
    <Icon className="ri-double-quotes-l"></Icon>
    {As ? (
      <As className="quote" {...rest}>
        {children}
      </As>
    ) : (
      <p className="quote">{children}</p>
    )}
    <Icon className="ri-double-quotes-r"></Icon>
  </div>
);

export default connect(
  () => {
    return {};
  },
  {
    saveSlateBlockSelection,
  },
)(Pullquote);
