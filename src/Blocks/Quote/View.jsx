import React, { useMemo } from 'react';
import { withBlockExtensions } from '@plone/volto/helpers';

import './styles.less';

const View = (props) => {
  const { variation } = props;

  const Quote = useMemo(() => variation?.view, [variation]);
  return <Quote {...props} />;
};

export default withBlockExtensions(View);
