import installQuotePlugin from './Quote';

export default (config) => {
  return [installQuotePlugin].reduce((acc, apply) => apply(acc), config);
};
