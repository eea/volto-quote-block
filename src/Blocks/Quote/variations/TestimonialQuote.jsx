import React from 'react';
import { connect } from 'react-redux';
import { Grid, Card, Image } from 'semantic-ui-react';
import config from '@plone/volto/registry';
import { flattenToAppURL, isInternalURL } from '@plone/volto/helpers';
import SlateEditor from '@plone/volto-slate/editor/SlateEditor';
import { handleKey } from '@plone/volto-slate/blocks/Text/keyboard';
import {
  uploadContent,
  saveSlateBlockSelection,
} from '@plone/volto-slate/actions';
import {
  createSlateParagraph,
  serializeText,
} from '@eeacms/volto-quote-block/helpers';
import Quote from './DefaultQuote';

import DefaultImageSVG from '@plone/volto/components/manage/Blocks/Listing/default-image.svg';

function Divider({ ...rest }) {
  return <div className="eea divider" {...rest}></div>;
}

const Testimonial = (props) => {
  const { slate } = config.settings;
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
  const { value, source, extra, image, title } = data;

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
    <div className="eea testimonial">
      <Divider />
      <Grid>
        <Testimonial.Avatar
          src={
            isInternalURL(image)
              ? `${flattenToAppURL(image)}/@@images/image/preview`
              : image || DefaultImageSVG
          }
          title={source}
          description={extra}
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
)(Testimonial);
