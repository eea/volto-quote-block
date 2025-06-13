import React from 'react';
import { BlockDataForm, SidebarPortal } from '@plone/volto/components';
import View from './View';
import getSchema from './schema';

import './styles.less';
import { injectIntl } from 'react-intl';

const Edit = (props) => {
  const { data = {}, block = null, selected = false, onChangeBlock } = props;

  const schema = getSchema(props);

  return (
    <>
      <View {...props} mode="edit" />

      <SidebarPortal selected={selected}>
        <BlockDataForm
          block={block}
          schema={schema}
          title={schema.title}
          onChangeBlock={onChangeBlock}
          onChangeField={(id, value) => {
            onChangeBlock(block, {
              ...data,
              [id]: value,
            });
          }}
          formData={data}
        />
      </SidebarPortal>
    </>
  );
};

export default injectIntl(Edit);
