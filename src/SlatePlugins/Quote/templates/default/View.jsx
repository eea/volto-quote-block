import React from 'react';
import cx from 'classnames';
import { Icon } from 'semantic-ui-react';
import config from '@plone/volto/registry';
import { serializeText } from '@eeacms/volto-quote-block/helpers';

import '@eeacms/volto-quote-block/less/pullquote.less';

const Pullquote = ({ children, element }) => {
  const { source, metadata, position = null, reversed = false } =
    element?.data || {};

  return (
    <blockquote className={cx('eea pullquote', position, { reversed })}>
      <Pullquote.Quote>{children}</Pullquote.Quote>
      {(source || metadata) && (
        <div className="info wrapper">
          {source && <p className="author">{serializeText(source)}</p>}
          {metadata && <p className="meta">{serializeText(metadata)}</p>}
        </div>
      )}
    </blockquote>
  );
};

Pullquote.Quote = ({ children, as: As, ...rest }) => (
  <div className="quotes wrapper">
    <Icon className={config.settings.slateQuote.icons.openQuote}></Icon>
    {As ? (
      <As className="quote" {...rest}>
        {children}
      </As>
    ) : (
      <p className="quote">{children}</p>
    )}
    <Icon className={config.settings.slateQuote.icons.closeQuote}></Icon>
  </div>
);

export default Pullquote;
