import React from 'react';
import { withBlockExtensions } from '@plone/volto/helpers/Extensions';

import './styles.less';

const View = (props) => {
  const { variation } = props;

  const Quote = variation?.view;
  return <Quote {...props} />;
};

export default withBlockExtensions(View);
