import React from 'react';
import templates from './templates';

function Quote(props) {
  const data = props.element.data || {};
  const QuoteElement = templates[data.template || 'default'].view;

  return <QuoteElement {...props} />;
}

export default Quote;
