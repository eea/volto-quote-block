import quoteSVG from '@plone/volto/icons/quote.svg';
import QuoteEdit from './Edit';
import QuoteView from './View';

import BlockquoteView from './templates/Blockquote/Blockquote';
import PullquoteView from './templates/Pullquote/Pullquote';

export default (config) => {
  config.blocks.blocksConfig.quote = {
    id: 'quote',
    title: 'Quote',
    icon: quoteSVG,
    group: 'text',
    edit: QuoteEdit,
    view: QuoteView,
    templates: {
      default: {
        title: 'Quote',
        view: PullquoteView,
      },
      blockquote: {
        title: 'Blockquote',
        view: BlockquoteView,
      },
    },
    blockHasOwnFocusManagement: true,
    restricted: false,
    mostUsed: false,
    sidebarTab: 1,
    security: {
      addPermission: [],
      view: [],
    },
  };
  return config;
};
