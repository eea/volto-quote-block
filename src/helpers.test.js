import { isArray } from 'lodash';
import config from '@plone/volto/registry';
import { serializeNodes } from '@plone/volto-slate/editor/render';
import { flattenToAppURL } from '@plone/volto/helpers';
import {
  createSlateParagraph,
  serializeText,
  isFloated,
  getFieldURL,
  getImageScaleParams,
} from './helpers';

jest.mock('@plone/volto/registry', () => ({
  settings: {
    slate: {
      defaultValue: jest.fn(),
    },
  },
}));

jest.mock('@plone/volto-slate/editor/render', () => ({
  serializeNodes: jest.fn(),
}));

jest.mock('@plone/volto/helpers', () => ({
  flattenToAppURL: jest.fn((url) => url),
  isInternalURL: jest.fn((url) => true),
}));

describe('getImageScaleParams', () => {
  it('returns expected image scale URL obj when image_field and image_scales properties are passed', () => {
    const image = {
      '@id': 'http://localhost:3000/image',
      image_field: 'image',
      image_scales: {
        image: [
          {
            download: '@@images/image.png',
            width: 400,
            height: 400,
            scales: {
              preview: {
                download: '@@images/image-400.png',
                width: 400,
                height: 400,
              },
            },
          },
        ],
      },
    };

    const expectedUrlObj = {
      download: 'http://localhost:3000/image/@@images/image-400.png',
      width: 400,
      height: 400,
    };
    expect(getImageScaleParams(image, 'preview')).toEqual(expectedUrlObj);
  });

  it('returns expected image scale URL obj when image properties are passed', () => {
    const image = {
      '@id': 'http://localhost:3000/image',
      image: {
        download: 'http://localhost:3000/image/@@images/image.png',
        width: 400,
        height: 400,
        scales: {
          preview: {
            download: 'http://localhost:3000/image/@@images/image-400.png',
            width: 400,
            height: 400,
          },
        },
      },
    };
    const expectedUrlObj = {
      download: 'http://localhost:3000/image/@@images/image-400.png',
      width: 400,
      height: 400,
    };
    expect(getImageScaleParams(image, 'preview')).toEqual(expectedUrlObj);
  });

  it('calls flattenToAppURL when internalUrl', () => {
    const url = 'http://localhost:3000/image';
    const size = 'large';
    getImageScaleParams(url, size);
    expect(flattenToAppURL).toHaveBeenCalledWith('http://localhost:3000/image');
  });
});

describe('getFieldURL', () => {
  it('handles a URL type object with type and value', () => {
    const data = {
      '@type': 'URL',
      value: 'value_url',
      url: 'url_url',
      href: 'href_url',
    };
    expect(getFieldURL(data)).toEqual('value_url');
  });

  it('handles an object with type and url', () => {
    const data = {
      '@type': 'URL',
      url: 'url_url',
      href: 'href_url',
    };
    expect(getFieldURL(data)).toEqual('url_url');
  });

  it('handles an object with type and href', () => {
    const data = {
      '@type': 'URL',
      href: 'href_url',
    };
    expect(getFieldURL(data)).toEqual('href_url');
  });

  it('handles an object with type and no value, url and href', () => {
    const data = {
      '@type': 'URL',
    };
    expect(getFieldURL(data)).toEqual({ '@type': 'URL' });
  });

  it('handles an object without a specific type and url', () => {
    const data = {
      url: 'url_url',
      href: 'href_url',
    };
    expect(getFieldURL(data)).toEqual('url_url');
  });

  it('handles an object without a specific type and href', () => {
    const data = {
      href: 'href_url',
    };
    expect(getFieldURL(data)).toEqual('href_url');
  });

  it('handles an object without a specific type and no id, url, href', () => {
    const data = {
      test: 'test_url',
    };
    expect(getFieldURL(data)).toEqual({
      test: 'test_url',
    });
  });

  it('handles an array', () => {
    const data = [
      {
        '@type': 'URL',
        value: 'value_url',
        url: 'url_url',
        href: 'href_url',
      },
      {
        '@id': 'id_url',
        url: 'url_url',
        href: 'href_url',
      },
    ];
    expect(getFieldURL(data)).toEqual(['value_url', 'id_url']);
  });

  it('handles a string', () => {
    const data = '/some/url';
    expect(getFieldURL(data)).toEqual('/some/url');
  });

  it('returns the data unchanged for non-object/non-array/non-string inputs', () => {
    expect(getFieldURL(42)).toEqual(42);
    expect(getFieldURL(undefined)).toEqual(undefined);
    expect(getFieldURL(null)).toEqual(null);
  });
});

describe('createSlateParagraph', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.resetModules();
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
    jest.resetAllMocks();
  });

  afterAll(() => {
    jest.resetModules();
    jest.clearAllMocks();
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
