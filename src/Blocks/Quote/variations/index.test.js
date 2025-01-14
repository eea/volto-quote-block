import myExportedArray from './index';
import { createIntl } from 'react-intl';

const intl = createIntl({
  locale: 'en',
  messages: {},
});

describe('My exported array', () => {
  it('should have the correct properties', () => {
    expect(myExportedArray).toBeInstanceOf(Array);
    myExportedArray.forEach((item) => {
      expect(item).toHaveProperty('id');
      expect(item).toHaveProperty('title');
      expect(item).toHaveProperty('view');
      expect(item).toHaveProperty('isDefault');
      expect(item).toHaveProperty('schemaEnhancer');
    });
  });

  it('should enhance the schema correctly for default quote', () => {
    const defaultQuote = myExportedArray.find((item) => item.id === 'default');
    const mockProps = {
      schema: {
        fieldsets: [],
        properties: {},
      },
      intl,
    };
    const enhancedSchema = defaultQuote.schemaEnhancer(mockProps);
    expect(enhancedSchema).toHaveProperty('fieldsets');
    expect(enhancedSchema).toHaveProperty('properties.position');
    expect(enhancedSchema).toHaveProperty('properties.reversed');
  });

  it('should enhance the schema correctly for testimonial quote', () => {
    const testimonialQuote = myExportedArray.find(
      (item) => item.id === 'testimonial',
    );
    const mockProps = {
      schema: {
        fieldsets: [],
        properties: {},
      },
      intl,
    };
    const enhancedSchema = testimonialQuote.schemaEnhancer(mockProps);
    expect(enhancedSchema).toHaveProperty('fieldsets');
    expect(enhancedSchema).toHaveProperty('properties.title');
    expect(enhancedSchema).toHaveProperty('properties.image');
  });
});
