import React from 'react';
import config from '@plone/volto/registry';

import './styles.less';

const View = (props) => {
  const { data, mode, block, onChangeBlock } = props;
  const { template = 'default' } = data;

  const Quote =
    config.blocks.blocksConfig.quote.templates[template]?.view || (() => '');

  React.useEffect(() => {
    if (mode === 'edit' && !template) {
      onChangeBlock(block, {
        ...data,
        template: 'default',
      });
    }
    /* eslint-disable-next-line */
  }, []);

  return <Quote {...props} />;
};

export default View;
