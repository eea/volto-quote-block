import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import TestimonialQuote from './TestimonialQuote';
import config from '@plone/volto/registry';
import '@testing-library/jest-dom/extend-expect';

const mockStore = configureStore([]);

config.settings = {
  slate: {
    textblockExtensions: [],
    defaultValue: () => 'test',
  },
};

jest.mock('@plone/volto/helpers/Url/Url', () => ({
  flattenToAppURL: jest.fn((url) => url),
  isInternalURL: jest.fn((url) => url),
  getFieldURL: jest.fn((data) => {
    if (Array.isArray(data)) {
      return data.map(
        (item) => item.value || item.url || item.href || item['@id'] || item,
      );
    }
    return data?.value || data?.url || data?.href || data?.['@id'] || data;
  }),
}));

jest.mock('@plone/volto-slate/editor/SlateEditor', () => {
  return ({ onChange, onKeyDown, placeholder, onFocus }) => (
    <input
      data-testid="mockedSlateEditor"
      placeholder={placeholder}
      onChange={onChange}
      onKeyDown={(event) => {
        const mockHandleKey = jest.fn();
        if (onKeyDown) {
          onKeyDown(event, mockHandleKey);
        }
      }}
      onFocus={onFocus}
    />
  );
});

jest.mock('@plone/volto-slate/blocks/Text/keyboard', () => ({
  handleKey: jest.fn(),
}));

describe('TestimonialQuote component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      slate_block_selections: {
        testId: 'testSelection',
      },
      upload_content: {},
      intl: {
        locale: 'en',
        messages: {},
      },
    });
    jest.clearAllMocks();
  });

  it('should render TestimonialQuote component in view mode', () => {
    const { getByText } = render(
      <Provider store={store}>
        <TestimonialQuote
          data={{ value: 'Test quote', source: 'John Doe', extra: 'CEO' }}
          mode="view"
        />
      </Provider>,
    );

    expect(getByText('Test quote')).toBeInTheDocument();
    expect(getByText('John Doe')).toBeInTheDocument();
    expect(getByText('CEO')).toBeInTheDocument();
  });

  it('should render TestimonialQuote component in edit mode', () => {
    const { getByPlaceholderText } = render(
      <Provider store={store}>
        <TestimonialQuote
          data={{
            value: 'Test quote',
            source: 'John Doe',
            extra: 'CEO',
            title: 'Test title',
          }}
          mode="edit"
        />
      </Provider>,
    );

    expect(getByPlaceholderText('Add quote')).toBeInTheDocument();
  });

  it('should call onChangeBlock when the quote is edited and onSelectBlock when in focus', () => {
    const mockOnChangeBlock = jest.fn();
    const mockOnSelectBlock = jest.fn();
    const { getByText, getByPlaceholderText } = render(
      <Provider store={store}>
        <TestimonialQuote
          data={{
            value: 'Test quote',
            source: 'John Doe',
            extra: 'CEO',
            image: [
              {
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
              },
            ],
          }}
          mode="edit"
          onChangeBlock={mockOnChangeBlock}
          onSelectBlock={mockOnSelectBlock}
        />
      </Provider>,
    );

    expect(getByText('John Doe')).toBeInTheDocument();
    expect(getByText('CEO')).toBeInTheDocument();

    const input = getByPlaceholderText('Add quote');
    fireEvent.change(input, { target: { value: 'New quote' } });
    expect(input.value).toBe('New quote');
    fireEvent.focus(input);
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    expect(mockOnChangeBlock).toHaveBeenCalled();
    expect(mockOnSelectBlock).toHaveBeenCalled();
  });

  it('should call onChangeBlock when the quote is edited but not call onSelectBlock, and should render description', () => {
    const mockOnChangeBlock = jest.fn();
    const mockOnSelectBlock = jest.fn();
    const { getByText, getByPlaceholderText } = render(
      <Provider store={store}>
        <TestimonialQuote
          data={{
            value: 'Test quote',
            extra: 'Test description',
            image: [
              {
                '@id': 'URL',
                value: 'value_url',
              },
            ],
          }}
          selected={true}
          mode="edit"
          onChangeBlock={mockOnChangeBlock}
          onSelectBlock={mockOnSelectBlock}
        />
      </Provider>,
    );

    const input = getByPlaceholderText('Add quote');
    fireEvent.change(input, { target: { value: 'New quote' } });
    expect(input.value).toBe('New quote');
    fireEvent.focus(input);
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    expect(getByText('Test description')).toBeInTheDocument();
    expect(mockOnChangeBlock).toHaveBeenCalled();
    expect(mockOnSelectBlock).not.toHaveBeenCalled();
  });

  it('should not render title or description', () => {
    const mockOnChangeBlock = jest.fn();
    const mockOnSelectBlock = jest.fn();
    const { getByPlaceholderText } = render(
      <Provider store={store}>
        <TestimonialQuote
          data={{
            value: 'Test quote',
            image: [
              {
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
              },
            ],
          }}
          selected={true}
          mode="edit"
          block="testId"
          onChangeBlock={mockOnChangeBlock}
          onSelectBlock={mockOnSelectBlock}
        />
      </Provider>,
    );

    const input = getByPlaceholderText('Add quote');
    fireEvent.change(input, { target: { value: 'New quote' } });
    expect(input.value).toBe('New quote');
    fireEvent.focus(input);
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    expect(mockOnChangeBlock).toHaveBeenCalled();
    expect(mockOnSelectBlock).not.toHaveBeenCalled();
  });

  it('should preserve slate text when image data changes', () => {
    const mockOnChangeBlock = jest.fn();
    const initialData = {
      value: 'Test quote content',
      image: [
        {
          '@id': 'URL',
          value: 'value_url',
        },
      ],
    };

    const { rerender } = render(
      <Provider store={store}>
        <TestimonialQuote
          data={initialData}
          mode="edit"
          onChangeBlock={mockOnChangeBlock}
        />
      </Provider>,
    );

    // Simulate image being removed (image field becomes empty)
    const updatedData = {
      ...initialData,
      image: '',
    };

    rerender(
      <Provider store={store}>
        <TestimonialQuote
          data={updatedData}
          mode="edit"
          onChangeBlock={mockOnChangeBlock}
        />
      </Provider>,
    );

    // The slate text should still be preserved
    expect(updatedData.value).toBe('Test quote content');
  });
});
