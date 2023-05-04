import isArray from 'lodash/isArray';
import isObject from 'lodash/isObject';
import isString from 'lodash/isString';
import config from '@plone/volto/registry';
import { serializeNodes } from '@plone/volto-slate/editor/render';
import { isInternalURL, flattenToAppURL } from '@plone/volto/helpers';

export const getFieldURL = (data) => {
  let url = data;
  const _isObject = data && isObject(data) && !isArray(data);
  if (_isObject && data['@type'] === 'URL') {
    url = data['value'] || data['url'] || data['href'] || data;
  } else if (_isObject) {
    url = data['@id'] || data['url'] || data['href'] || data;
  }
  if (isArray(data)) {
    url = data.map((item) => getFieldURL(item));
  }
  if (isString(url) && isInternalURL(url)) return flattenToAppURL(url);
  return url;
};

export const createSlateParagraph = (text) => {
  return isArray(text) ? text : config.settings.slate.defaultValue();
};

export const serializeText = (text) => {
  return isArray(text) ? serializeNodes(text) : text;
};

export const isFloated = (position) => {
  return position && ['left', 'right'].includes(position);
};
