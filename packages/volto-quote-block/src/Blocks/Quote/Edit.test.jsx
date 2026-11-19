import { vi } from 'vitest';
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-intl-redux';
import configureStore from 'redux-mock-store';
import Edit from './Edit';
import config from '@plone/volto/registry';
import '@testing-library/jest-dom';

config.blocks = {
  blocksConfig: {
    quote: {
      variations: ['testimonial', 'simple'],
    },
  },
};

vi.mock('@plone/volto/helpers/Extensions', () => ({
  withBlockExtensions: vi.fn((Component) => Component),
  withVariationSchemaEnhancer: vi.fn((Component) => Component),
}));

vi.mock('@plone/volto/components/manage/Sidebar/SidebarPortal', () => {
  return {
    default: ({ children }) => (
      <div data-testid="sidebar-portal">{children}</div>
    ),
  };
});

vi.mock('@plone/volto/components/manage/Form/BlockDataForm', () => {
  return {
    default: (props) => (
      <div data-testid="block-data-form">
        <p>Mocked BlockDataForm</p>
        <input data-testid="block-data-input" onChange={props.onChangeField} />
      </div>
    ),
  };
});

const mockStore = configureStore([]);

describe('Edit component', () => {
  let store;
  let mockOnChangeBlock;

  beforeEach(() => {
    store = mockStore({
      intl: {
        locale: 'en',
        messages: {},
      },
    });

    mockOnChangeBlock = vi.fn();
  });

  it('should render View component with mode set to edit', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <Edit
          onChangeBlock={mockOnChangeBlock}
          selected={true}
          data={{ position: 'test' }}
          variation={{
            view: (props) => (
              <div data-testid="view-component" mode={props.mode} />
            ),
          }}
        />
      </Provider>,
    );

    const viewComponent = getByTestId('view-component');
    expect(viewComponent).toBeInTheDocument();
    expect(viewComponent).toHaveAttribute('mode', 'edit');
  });

  it('should render SidebarPortal when selected is true', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <Edit
          onChangeBlock={mockOnChangeBlock}
          selected={true}
          data={{ position: 'test' }}
          variation={{
            view: (props) => (
              <div data-testid="view-component" mode={props.mode} />
            ),
          }}
        />
      </Provider>,
    );

    const sidebarPortal = getByTestId('sidebar-portal');
    expect(sidebarPortal).toBeInTheDocument();
  });

  it('should render SidebarPortal and BlockDataForm', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <Edit
          onChangeBlock={mockOnChangeBlock}
          selected={true}
          data={{ position: 'test' }}
          variation={{
            view: (props) => (
              <div data-testid="view-component" mode={props.mode} />
            ),
          }}
        />
      </Provider>,
    );

    const sidebarPortal = getByTestId('sidebar-portal');
    const blockDataForm = getByTestId('block-data-form');
    expect(sidebarPortal).toBeInTheDocument();
    expect(blockDataForm).toBeInTheDocument();
  });

  it('should call onChangeBlock when onChangeField is triggered', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <Edit
          onChangeBlock={mockOnChangeBlock}
          selected={true}
          data={{ position: 'test' }}
          variation={{
            view: (props) => (
              <div data-testid="view-component" mode={props.mode} />
            ),
          }}
        />
      </Provider>,
    );

    const inputField = getByTestId('block-data-input');
    fireEvent.change(inputField, { target: { value: 'new value' } });

    expect(mockOnChangeBlock).toHaveBeenCalled();
  });

  it('should render with the default value for selected', () => {
    render(
      <Provider store={store}>
        <Edit
          onChangeBlock={mockOnChangeBlock}
          data={{ position: 'test' }}
          variation={{
            view: (props) => (
              <div data-testid="view-component" mode={props.mode} />
            ),
          }}
        />
      </Provider>,
    );
  });
});
