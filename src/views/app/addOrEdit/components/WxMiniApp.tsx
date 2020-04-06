import React, { memo } from 'react';
import { Form, Input } from 'antd';
import Title from './Title';

function WxMiniApp() {
  return (
    <React.Fragment>
      <Title title="微信配置" />
      <Form.Item
        label="AppId"
        name="appId"
        rules={[
          { required: true, message: '请输入AppId', max: 32 },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="上传密钥"
        name="privateKey"
        rules={[
          { required: true, message: '请输入privateKey', max: 32 },
        ]}
      >
        <Input />
      </Form.Item>
    </React.Fragment>
  );
}

export default memo(WxMiniApp);
