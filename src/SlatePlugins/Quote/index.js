import { defineMessages } from 'react-intl';
import { makeInlineElementPlugin } from 'volto-slate/components/ElementEditor';
import Quote from './Quote';
import quoteSchema from './schema';
import { withBlockquote, withBeforeInsertFragment } from './extensions';

import quoteIcon from '@plone/volto/icons/quote.svg';

const messages = defineMessages({
  edit: {
    id: 'Edit quote',
    defaultMessage: 'Edit quote',
  },
  delete: {
    id: 'Remove quote',
    defaultMessage: 'Remove quote',
  },
});

export default (config) => {
  const opts = {
    title: 'Quote',
    pluginId: 'blockquote',
    elementType: 'blockquote',
    element: Quote,
    isInlineElement: true,
    editSchema: quoteSchema,
    extensions: [withBlockquote, withBeforeInsertFragment],
    hasValue: (formData) => !!formData,
    toolbarButtonIcon: quoteIcon,
    messages,
  };

  const [installQuote] = makeInlineElementPlugin(opts);
  config = installQuote(config);

  return config;
};
