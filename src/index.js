import installQuoteBlock from './Blocks/Quote';

const applyConfig = (config) => {
  return [installQuoteBlock].reduce((acc, apply) => apply(acc), config);
};

export default applyConfig;
