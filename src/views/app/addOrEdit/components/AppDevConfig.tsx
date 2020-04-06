import React, { memo, useState, useEffect } from 'react';
import { Form, Select, Input } from 'antd';
import Title from './Title';
import { apiGetUserList } from '../../../auth/user/service';

function AppDevConfig() {
  const [userList, setUserList] = useState<{ key: number; value: number; label: string }[]>([]);

  const initUserList = async () => {
    try {
      const {
        data: { list },
      } = await apiGetUserList();
      setUserList(
        list.map(user => ({ key: user.id!, value: user.id!, label: user.account })),
      );
    } catch (error) {
      // do someting
    }
  };

  useEffect(() => {
    initUserList();
  }, []);
  return (
    <React.Fragment>
      <Title title="开发配置" />
      <Form.Item
        label="AppId"
        name="appId"
        rules={[{ required: true, message: '请输入AppId', max: 32 }]}
      >
        <Input placeholder="请输入微信AppId" />
      </Form.Item>
      <Form.Item
        label="上传密钥"
        name="privateKey"
        rules={[{ required: true, message: '请输入privateKey', max: 32 }]}
      >
        <Input placeholder="请输入微信上传密钥" />
      </Form.Item>
      <Form.Item
        label="开发人员"
        name="developers"
        rules={[{ required: true, message: '请选择开发人员', min: 1, type: 'array' }]}
      >
        <Select
          placeholder="请选择开发人员，具有打码和申请发布权限"
          mode="multiple"
          options={userList}
          labelInValue
        />
      </Form.Item>
      <Form.Item
        label="测试人员"
        name="conners"
        rules={[{ required: true, message: '请选择测试人员', min: 1, type: 'array' }]}
      >
        <Select
          placeholder="请选择测试人员，具有打码和通过发布单审批权限"
          mode="multiple"
          options={userList}
          labelInValue
        />
      </Form.Item>
      <Form.Item
        label="主管审批"
        name="approvers"
        rules={[{ required: true, message: '请选择主管审批人员', min: 1, type: 'array' }]}
      >
        <Select
          placeholder="请选择主管审批人员，可多选，具体权限参考权限文档"
          mode="multiple"
          options={userList}
          labelInValue
        />
      </Form.Item>
    </React.Fragment>
  );
}

export default memo(AppDevConfig);
