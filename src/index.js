import installQuoteBlock from './Blocks/Quote';
import installSlatePlugins from './SlatePlugins';

const applyConfig = (config) => {
  return [installQuoteBlock, installSlatePlugins].reduce(
    (acc, apply) => apply(acc),
    config,
  );
};

export default applyConfig;
