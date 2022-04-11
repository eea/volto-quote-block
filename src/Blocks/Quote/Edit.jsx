import React from 'react';
import { SidebarPortal } from '@plone/volto/components';
import InlineForm from '@plone/volto/components/manage/Form/InlineForm';
import View from './View';
import getSchema from './schema';

import './styles.less';

const Edit = (props) => {
  const { data = {}, block = null, selected = false, onChangeBlock } = props;

  const schema = getSchema(props);

  return (
    <>
      <View {...props} mode="edit" />

      <SidebarPortal selected={selected}>
        <InlineForm
          schema={schema}
          title={schema.title}
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

export default Edit;
