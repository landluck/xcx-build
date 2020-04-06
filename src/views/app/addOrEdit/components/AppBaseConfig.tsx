import React, { memo, useState, useEffect, useCallback } from 'react';
import { Form, Input } from 'antd';
import Title from './Title';
import AppTypeList from './AppTypeList';
import { AppType, apiGetTypeList } from '../../index/service';
import VerifyUtils from '../../../../utils/verifty';

function AppBaseConfig({ onTypeChecked }: { onTypeChecked: (id: number) => void }) {
  const [typeList, setTypeList] = useState<AppType[]>([]);
  const [currentType, setCurrentType] = useState<AppType>({ id: 0, name: '', key: '' });

  const initTypeList = async () => {
    try {
      const {
        data: { list },
      } = await apiGetTypeList();
      if (list.length > 0) {
        setCurrentType(list[0]);
        onTypeChecked(list[0].id);
      }
      setTypeList(list);
    } catch (error) {
      // do someting
    }
  };

  const onTypeCheck = useCallback(
    (id: number) => {
      const value = typeList.find(item => item.id === id) || currentType;
      setCurrentType(value);
      onTypeChecked(value.id);
    },
    [typeList, currentType],
  );

  useEffect(() => {
    initTypeList();
  }, []);
  return (
    <React.Fragment>
      <Title title="应用类型" />
      <AppTypeList list={typeList} activeId={currentType.id} onCheck={onTypeCheck}></AppTypeList>
      <Title title="基本信息" />

      <Form.Item
        label="应用名称"
        name="name"
        rules={[{ required: true, message: '请输入应用名称', max: 32 }]}
      >
        <Input placeholder="请输入应用名称" />
      </Form.Item>
      <Form.Item
        label="应用描述"
        name="desc"
        rules={[{ required: true, message: '请输入应用描述', max: 100 }]}
      >
        <Input placeholder="请输入应用描述" />
      </Form.Item>

      <Form.Item
        label="仓库地址"
        name="git"
        rules={[
          {
            required: true,
            pattern: VerifyUtils.GIT_REMOTE_REG,
            message: '请输入合法Git地址',
            max: 100,
          },
        ]}
      >
        <Input placeholder="请输入合法Git地址" />
      </Form.Item>
    </React.Fragment>
  );
}

export default memo(AppBaseConfig);
