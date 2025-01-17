import config from '@plone/volto/registry';
import { defineMessages } from 'react-intl';

const messages = defineMessages({
  quoteTitle: {
    id: 'quoteTitle',
    defaultMessage: 'Quote',
  },
  default: {
    id: 'default',
    defaultMessage: 'Default',
  },
  variation: {
    id: 'variation',
    defaultMessage: 'Variation',
  },
  source: {
    id: 'source',
    defaultMessage: 'Source',
  },
  extraInfo: {
    id: 'extraInfo',
    defaultMessage: 'Extra info',
  },
});

const schema = (props) => {
  const { position } = props.data;
  const variations = config.blocks.blocksConfig.quote.variations;

  return {
    title: props.intl.formatMessage(messages.quoteTitle),
    fieldsets: [
      {
        id: 'default',
        title: props.intl.formatMessage(messages.default),
        fields: [
          'variation',
          ...(position && ['left', 'right'].includes(position)
            ? ['value']
            : []),
          'source',
          'extra',
        ],
      },
    ],
    properties: {
      variation: {
        title: props.intl.formatMessage(messages.variation),
        choices: variations.map((extension) => [extension.id, extension.title]),
        defaultValue: 'default',
      },
      value: {
        title: props.intl.formatMessage(messages.quoteTitle),
        widget: 'slate',
      },
      source: {
        title: props.intl.formatMessage(messages.source),
        widget: 'slate',
      },
      extra: {
        title: props.intl.formatMessage(messages.extraInfo),
        widget: 'slate',
      },
    },
    required: [],
  };
};

export default schema;
