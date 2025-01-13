import quoteSVG from '@plone/volto/icons/quote.svg';
import QuoteEdit from './Edit';
import QuoteView from './View';
import QuoteVariations from './variations';
import { defineMessages } from 'react-intl';

defineMessages({
  testimonialVariation: {
    id: 'Testimonial quote',
    defaultMessage: 'Testimonial quote',
  },
  quoteVariation: {
    id: 'Quote (default)',
    defaultMessage: 'Quote (default)',
  },
})

const applyConfig = (config) => {
  config.blocks.blocksConfig.quote = {
    id: 'quote',
    title: 'Quote',
    icon: quoteSVG,
    group: 'text',
    edit: QuoteEdit,
    view: QuoteView,
    variations: QuoteVariations,
    blockHasOwnFocusManagement: true,
    restricted: false,
    mostUsed: false,
    sidebarTab: 1,
    security: {
      addPermission: [],
      view: [],
    },
  };

  // Footnotes
  config.settings.blocksWithFootnotesSupport = {
    ...(config.settings.blocksWithFootnotesSupport || {}),
    quote: ['value', 'source', 'extra', 'title'],
  };

  return config;
};

export default applyConfig;
