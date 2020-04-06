import React, { memo } from 'react';
import { Form, Select, Input } from 'antd';
import Title from './Title';

function AppMoreConfig() {
  return (
    <React.Fragment>
      <Title title="更多配置" />
      <Form.Item
        label="消息通知"
        name="msgType"
        rules={[{ required: false, message: '请输入消息通知类型' }]}
      >
        <Select placeholder="请选择消息通知类型">
          <Select.Option value="dd">钉钉</Select.Option>
          <Select.Option value="wx">企业微信</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item
        label="WebHook"
        name="webHook"
        rules={[{ required: false, message: '请输入合法webHook', max: 100 }]}
      >
        <Input placeholder="请输入钉钉或者企业微信提供的webHook" />
      </Form.Item>
    </React.Fragment>
  );
}

export default memo(AppMoreConfig);
