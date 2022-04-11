export default {
  title: 'Quote',
  fieldsets: [
    {
      id: 'default',
      title: 'Properties',
      fields: ['reversed', 'position', 'source', 'metadata'],
    },
  ],
  properties: {
    // template: {
    //   title: 'Template',
    //   choices: [['default', 'Default']],
    //   default: 'default',
    // },
    reversed: {
      title: 'Reversed',
      type: 'boolean',
    },
    position: {
      title: 'Alignment',
      widget: 'align',
    },
    source: {
      title: 'Source',
      widget: 'slate_richtext',
    },
    metadata: {
      title: 'Extra info',
      widget: 'slate_richtext',
    },
  },
  required: [],
};
