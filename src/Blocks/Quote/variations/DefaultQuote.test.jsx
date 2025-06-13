import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Quote from './DefaultQuote';
import '@testing-library/jest-dom/extend-expect';
import { IntlProvider } from 'react-intl';

const mockStore = configureStore([]);

jest.mock('@plone/volto/registry', () => ({
  settings: {
    slate: {
      defaultValue: jest.fn(() => 'default value'),
    },
  },
}));

jest.mock('@plone/volto-slate/editor/SlateEditor', () => () => <textarea />);

describe('Quote', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      slate_block_selections: {},
      upload_content: {},
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the Quote component', () => {
    const { getByText } = renderWithIntl(
      <Provider store={store}>
        <Quote
          data={{
            value: 'Test value',
            source: 'Test source',
            extra: 'Test extra',
            position: 'left',
          }}
          mode="edit"
          index={0}
          block="block1"
          selected={false}
          properties={{}}
          onChangeBlock={() => {}}
          onSelectBlock={() => {}}
        />
      </Provider>,
    );
    expect(getByText('Test source')).toBeInTheDocument();
    expect(getByText('Test extra')).toBeInTheDocument();
  });

  it('renders the Quote component with reversed and no block', () => {
    const { getByText } = renderWithIntl(
      <Provider store={store}>
        <Quote
          data={{
            value: 'Test value',
            source: 'Test source',
            extra: 'Test extra',
            reversed: true,
          }}
          mode="edit"
          index={0}
          block={undefined}
          selected={false}
          properties={{}}
          onChangeBlock={() => {}}
          onSelectBlock={() => {}}
        />
      </Provider>,
    );

    expect(getByText('Test source')).toBeInTheDocument();
    expect(getByText('Test extra')).toBeInTheDocument();
  });
});

const renderWithIntl = (ui, { locale = 'en', messages = {} } = {}) => {
  return render(
    <IntlProvider locale={locale} messages={messages}>
      {ui}
    </IntlProvider>,
  );
};
