import isArray from 'lodash/isArray';
import { serializeNodes } from '@plone/volto-slate/editor/render';
import config from '@plone/volto/registry';

export const createSlateParagraph = (text) => {
  return isArray(text) ? text : config.settings.slate.defaultValue();
};

export const serializeText = (text) => {
  return isArray(text) ? serializeNodes(text) : text;
};

export const isFloated = (position) => {
  return position && ['left', 'right'].includes(position);
};
