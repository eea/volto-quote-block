import quoteSVG from '@plone/volto/icons/quote.svg';
import QuoteEdit from './Edit';
import QuoteView from './View';
import QuoteVariations from './variations';

export default (config) => {
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
  config.settings.blocksWithFootnotes = [
    ...(config.settings.blocksWithFootnotes || []),
    'quote',
  ];

  return config;
};
