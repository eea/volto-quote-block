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
          'reversed',
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
      reversed: {
        title: 'Reversed',
        type: 'boolean',
      },
      value: {
        title: 'Quote',
        widget: 'slate_richtext',
      },
      source: {
        title: 'Source',
        widget: 'slate_richtext',
      },
      sourceInfo: {
        title: 'Source info',
        widget: 'slate_richtext',
      },
    },
    required: [],
  };
};
