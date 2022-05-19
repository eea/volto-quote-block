import config from '@plone/volto/registry';

export default (props) => {
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
          'sourceInfo',
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
      sourceInfo: {
        title: 'Source info',
        widget: 'slate',
      },
    },
    required: [],
  };
};
