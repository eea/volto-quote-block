import React from 'react';
import { withBlockExtensions } from '@plone/volto/helpers';

import './styles.less';

const View = (props) => {
  const { variation } = props;

  const Quote = variation?.view;
  return <Quote {...props} />;
};

export default withBlockExtensions(View);
