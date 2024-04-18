import DefaultQuote from './DefaultQuote';
import TestimonialQuote from './TestimonialQuote';

const variations = [
  {
    id: 'default',
    title: 'Quote (default)',
    view: DefaultQuote,
    isDefault: true,
    schemaEnhancer: (props) => {
      const { schema } = props;
      return {
        ...schema,
        fieldsets: [
          ...schema.fieldsets,
          { id: 'layout', title: 'Layout', fields: ['position', 'reversed'] },
        ],
        properties: {
          ...schema.properties,
          position: {
            title: 'Alignment',
            widget: 'align',
          },
          reversed: {
            title: 'Reversed',
            type: 'boolean',
          },
        },
      };
    },
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
            widget: 'slate',
          },
          image: {
            title: 'Image',
            widget: 'attachedimage',
            mode: 'image',
            return: 'single',
          },
        },
      };
    },
  },
];

export default variations;
