import config from '@plone/volto/registry';

export default (props) => {
  const { position } = props.data;
  const templatesConfig = config.blocks.blocksConfig.quote?.templates;
  const templates = Object.keys(templatesConfig).map((template) => [
    template,
    templatesConfig[template].title || template,
  ]);
  const schema =
    templatesConfig[
      props.data?.template || config.blocks.blocksConfig.quote.defaultTemplate
    ]?.schema || [];
  const templateSchema = typeof schema === 'function' ? schema(props) : schema;
  const defaultFieldset =
    templateSchema.fieldsets?.filter(
      (fieldset) => fieldset.id === 'default',
    )[0] || {};
  return {
    title: templateSchema.title || 'Quote',
    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields: [
          'template',
          ...(position && ['left', 'right'].includes(position)
            ? ['quote']
            : []),
          'reversed',
          'position',
          'source',
          'metadata',
          ...(defaultFieldset?.fields || []),
        ],
      },
      ...(templateSchema.fieldsets?.filter(
        (fieldset) => fieldset.id !== 'default',
      ) || []),
    ],
    properties: {
      template: {
        title: 'Template',
        choices: templates,
      },
      reversed: {
        title: 'Reversed',
        type: 'boolean',
      },
      position: {
        title: 'Alignment',
        widget: 'align',
      },
      quote: {
        title: 'Quote',
        widget: 'slate_richtext',
      },
      source: {
        title: 'Source',
        widget: 'slate_richtext',
      },
      metadata: {
        title: 'Extra info',
        widget: 'slate_richtext',
      },
      ...(templateSchema.properties || {}),
    },
    required: [...(templateSchema.required || [])],
  };
};
