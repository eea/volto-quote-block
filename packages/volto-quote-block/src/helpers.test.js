import { vi } from 'vitest';
import isArray from 'lodash/isArray';
import { serializeNodes } from '@plone/volto-slate/editor/render';
import config from '@plone/volto/registry';
import { createSlateParagraph, serializeText, isFloated } from './helpers';

vi.mock('@plone/volto/registry', () => ({
  default: {
    settings: {
      slate: {
        defaultValue: vi.fn(),
      },
    },
  },
  settings: {
    slate: {
      defaultValue: vi.fn(),
    },
  },
}));

vi.mock('@plone/volto-slate/editor/render', () => ({
  serializeNodes: vi.fn(),
}));

describe('createSlateParagraph', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  afterAll(() => {
    vi.resetModules();
  });

  it('should return default value when input is not an array', () => {
    const input = 'test';
    createSlateParagraph(input);
    expect(config.settings.slate.defaultValue).toHaveBeenCalledTimes(1);
  });

  it('should return input when input is an array', () => {
    const input = ['test'];
    const result = createSlateParagraph(input);
    expect(result).toBe(input);
  });
});

describe('serializeText', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  afterAll(() => {
    vi.resetModules();
    vi.clearAllMocks();
  });

  it('should return the text when it is not an array', () => {
    const input = 'test';

    expect(serializeText(input)).toEqual(input);
    expect(isArray(input)).toBe(false);
    expect(serializeNodes).not.toHaveBeenCalled();
  });

  it('should call serializeNodes when text is an array', () => {
    const input = ['test'];

    serializeText(input);
    expect(isArray(input)).toBe(true);
    expect(serializeNodes).toHaveBeenCalledWith(input);
  });
});

describe('isFloated', () => {
  it('should return true if position is left', () => {
    expect(isFloated('left')).toBe(true);
  });

  it('should return true if position is right', () => {
    expect(isFloated('right')).toBe(true);
  });

  it('should return false if position is not left or right', () => {
    expect(isFloated('center')).toBe(false);
  });
});
