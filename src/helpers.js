import { isArray } from 'lodash';
import config from '@plone/volto/registry';
import {
  serializeNodes,
  serializeNodesToText,
} from 'volto-slate/editor/render';

export const createSlateParagraph = (text) => {
  return isArray(text) ? text : config.settings.slate.defaultValue();
};

export const serializeText = (text) => {
  return isArray(text) ? serializeNodes(text) : text;
};

export const isFloated = (position) => {
  return position && ['left', 'right'].includes(position);
};

export const textNotEmpty = (text) => {
  if (text && isArray(text) && serializeNodesToText(text).length > 0)
    return true;
  if (text && typeof text === 'string' && text.length > 0) return true;
  return false;
};
