import DefaultQuote from './DefaultQuote';
import TestimonialQuote from './TestimonialQuote';

export default [
  {
    id: 'default',
    title: 'Quote (default)',
    view: DefaultQuote,
    isDefault: true,
  },
  {
    id: 'testimonial',
    title: 'Testimonial quote',
    view: TestimonialQuote,
    isDefault: true,
    schemaEnhancer: (props) => {
      const { schema } = props;
      return {
        ...schema,
        fieldsets: [
          ...schema.fieldsets,
          {
            id: 'testimonial',
            title: 'Testimonial',
            fields: ['title', 'image'],
          },
        ],
        properties: {
          ...schema.properties,
          title: {
            title: 'Title',
            widget: 'slate_richtext',
          },
          image: {
            title: 'Image',
            widget: 'object_browser',
            mode: 'image',
            return: 'single',
          },
        },
      };
    },
  },
];