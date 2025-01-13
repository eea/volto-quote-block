import DefaultQuote from './DefaultQuote';
import TestimonialQuote from './TestimonialQuote';
import { defineMessages } from 'react-intl';

const messages = defineMessages({
  alignment: {
    id: 'alignment',
    defaultMessage: 'Alignment',
  },
  reversed: {
    id: 'reversed',
    defaultMessage: 'Reversed',
  },
  testimonial: {
    id: 'testimonial',
    defaultMessage: 'Testimonial',
  },
  testimonialTitle: {
    id: 'testimonialTitle',
    defaultMessage: 'Title',
  },
  image: {
    id: 'image',
    defaultMessage: 'Image',
  }
})

const variations = [
  {
    id: 'default',
    title: 'Quote (default)',
    view: DefaultQuote,
    isDefault: true,
    schemaEnhancer: (props) => {
      const { schema, intl } = props;
      return {
        ...schema,
        fieldsets: [
          ...schema.fieldsets,
          { id: 'layout', title: 'Layout', fields: ['position', 'reversed'] },
        ],
        properties: {
          ...schema.properties,
          position: {
            title: intl.formatMessage(messages.alignment),
            widget: 'align',
          },
          reversed: {
            title: intl.formatMessage(messages.reversed),
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
      const { schema, intl } = props;
      return {
        ...schema,
        fieldsets: [
          ...schema.fieldsets,
          {
            id: 'testimonial',
            title: intl.formatMessage(messages.testimonial),
            fields: ['title', 'image'],
          },
        ],
        properties: {
          ...schema.properties,
          title: {
            title: intl.formatMessage(messages.testimonialTitle),
            widget: 'slate',
          },
          image: {
            title: intl.formatMessage(messages.image),
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
