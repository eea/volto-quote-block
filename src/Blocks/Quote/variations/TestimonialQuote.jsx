import React from 'react';
import { Grid, Card, Image } from 'semantic-ui-react';
import config from '@plone/volto/registry';
import { flattenToAppURL } from '@plone/volto/helpers';
import DefaultImageSVG from '@plone/volto/components/manage/Blocks/Listing/default-image.svg';
import SlateEditor from 'volto-slate/editor/SlateEditor';
import { handleKey } from 'volto-slate/blocks/Text/keyboard';
import {
  createSlateParagraph,
  serializeText,
} from '@eeacms/volto-quote-block/helpers';
import Quote from './DefaultQuote';

const getPath = (url = '') =>
  (url || '').startsWith('http') ? new URL(url).pathname : url;

const getScaleUrl = (url, size) =>
  (url || '').includes(config.settings.apiPath)
    ? `${flattenToAppURL(url.replace('/api', ''))}/@@images/image/${size}`
    : `${url.replace('/api', '')}/@@images/image/${size}`;

function Divider({ ...rest }) {
  return <div className="eea divider" {...rest}></div>;
}

const TestimonialWrapper = (props) => {
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

const Testimonial = (props) => {
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
  const { value, source, sourceInfo, image, title } = data;

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
    [onAddBlock, onFocusPreviousBlock, onFocusNextBlock],
  );

  return (
    <TestimonialWrapper {...props} handleKeyDown={handleKeyDown}>
      <div className="eea testimonial">
        <Divider />
        <Grid>
          <Testimonial.Avatar
            src={
              getScaleUrl(getPath(image?.['@id']), 'preview') || DefaultImageSVG
            }
            title={source}
            description={sourceInfo}
          />
          <Testimonial.Content>
            {title && (
              <Testimonial.Title>{serializeText(title)}</Testimonial.Title>
            )}
            {mode === 'edit' ? (
              <Testimonial.Quote>
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
              </Testimonial.Quote>
            ) : (
              <Testimonial.Quote>{serializeText(value)}</Testimonial.Quote>
            )}
          </Testimonial.Content>
        </Grid>
        <Divider />
      </div>
    </TestimonialWrapper>
  );
};

Testimonial.Avatar = ({ children, ...rest }) => {
  const { title, description } = rest;
  return (
    <Grid.Column mobile={12} tablet={3} computer={2}>
      <div className="avatar-wrapper">
        <Card className={`eea rounded small`} fluid={rest.fluid}>
          <Image src={rest.src} wrapped ui={false} alt="card image" />
          {title || description ? (
            <Card.Content>
              {title && <Card.Header>{serializeText(title)}</Card.Header>}
              {description && (
                <Card.Description>
                  {serializeText(description)}
                </Card.Description>
              )}
            </Card.Content>
          ) : (
            ''
          )}
        </Card>
      </div>
    </Grid.Column>
  );
};

Testimonial.Content = ({ children }) => {
  return (
    <Grid.Column mobile={12} tablet={9} computer={10}>
      <div className="content">{children}</div>
    </Grid.Column>
  );
};

Testimonial.Title = ({ children }) => <h3 className="title">{children}</h3>;
Testimonial.Quote = ({ children }) => (
  <blockquote className="eea quote none">
    <div className="content">
      <Quote.Quote>{children}</Quote.Quote>
    </div>
  </blockquote>
);

export default Testimonial;
