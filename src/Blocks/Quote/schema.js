import config from '@plone/volto/registry';

const schema = (props) => {
  const { position } = props.data;
  const variations = config.blocks.blocksConfig.quote.variations;

  return {
    title: 'Quote',
    fieldsets: [
      {
        id: 'default',
        title: 'Default',
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
        title: 'Variation',
        choices: variations.map((extension) => [extension.id, extension.title]),
        defaultValue: 'default',
      },
      value: {
        title: 'Quote',
        widget: 'slate',
      },
      source: {
        title: 'Source',
        widget: 'slate',
      },
      extra: {
        title: 'Extra info',
        widget: 'slate',
      },
    },
    required: [],
  };
};

export default schema;
