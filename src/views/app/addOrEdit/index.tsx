import React, { memo, useState, useCallback, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Steps, Form, Button, Alert } from 'antd';
import PageWrap from '../../components/PageWrap';
import Title from './components/Title';

import { createDefault, AppModel, apiCreateApp, apiGetAppDetail, SelectValue, AppMember, apiUpdateApp } from '../index/service';
import AppBaseConfig from './components/AppBaseConfig';
import AppDevConfig from './components/AppDevConfig';
import AppMoreConfig from './components/AppMoreConfig';
import Divide from '../../components/Divide';
import '../styles/index.less';


const layout = {
  wrapperCol: { span: 10 },
  labelCol: { span: 2 },
};


function filter(list: AppMember[], role: AppMember['role']): SelectValue[] {
  return list.filter(item => item.role === role).map(item => ({ value: item.userId }))
}

function AddOrEditApp() {
  const [appModel, setAppModel] = useState<AppModel>(createDefault());
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [baseForm] = Form.useForm();
  const history = useHistory();
  const urlParams = useParams<{ id: string }>();

  const onNextStep = useCallback(() => setCurrentStep(index => index + 1), []);
  const onPrevStep = useCallback(() => setCurrentStep(index => index - 1), []);


  const initAppDetail = async () => {
    try {
      const { data } = await apiGetAppDetail(+urlParams.id);

      if (data.member) {
        data.conners = filter(data.member, 'conner')
        data.developers = filter(data.member, 'developer')
        data.approvers = filter(data.member, 'approver')
      }

      delete data.member

      setAppModel(data)

      baseForm.setFieldsValue(data)
    } catch (error) {
      // do
    }
  }

  const onTypeChecked = useCallback((id: number) => {
    setAppModel(app => ({ ...app, typeId: id }));
  }, []);

  const onFinishBase = useCallback(() => {
    const names: string[] = [];
    if (currentStep === 0) {
      names.push(...['name', 'desc', 'git']);
    }
    if (currentStep === 1) {
      names.push(...['appId', 'privateKey', 'developers', 'conners']);
    }
    baseForm.validateFields(names).then(values => {
      setAppModel(app => ({ ...app, ...values }));
      onNextStep();
    });
  }, [currentStep]);

  const onFinish = useCallback(() => {
    baseForm.validateFields().then(values => {
      values.developers = values.developers.map((item: SelectValue) => item.value);
      values.conners = values.conners.map((item: SelectValue) => item.value);
      values.approvers = values.approvers.map((item: SelectValue) => item.value);

      const data = values as AppModel;
      // 创建
      let apiName = apiCreateApp;
      // 更新
      if (appModel.id) {
        apiName = apiUpdateApp;
      }

      apiName({ ...appModel, ...data })
        .then(() => {
          history.push('/app/index');
        })
        .catch(() => {});
    });
  }, [appModel]);

  useEffect(() => {
    if (+urlParams.id !== 0) {
      initAppDetail();
    }
  }, [])

  return (
    <PageWrap>
      <Steps type="navigation" current={currentStep}>
        <Steps.Step title="基本配置" />
        <Steps.Step title="开发配置" />
        <Steps.Step title="更多配置" />
      </Steps>
      <Divide>
        <Alert
          message="创建应用前，默认你已阅读过引导文档以及在项目中配置好配置文件"
          type="warning"
          showIcon
        />
      </Divide>
      <Form {...layout} form={baseForm} labelAlign="left" name="addApp" initialValues={appModel}>
        <div className={currentStep === 0 ? 'base--show' : 'base--hide'}>
          <AppBaseConfig onTypeChecked={onTypeChecked} />
        </div>

        <div className={currentStep === 1 ? 'base--show' : 'base--hide'}>
          <AppDevConfig />
        </div>
        <div className={currentStep === 2 ? 'base--show' : 'base--hide'}>
          <AppMoreConfig />
        </div>
      </Form>

      <Title title="操作" />
      <div className="align--center">
        {currentStep > 0 && (
          <Button style={{ marginRight: '8px' }} onClick={onPrevStep}>
            上一步
          </Button>
        )}
        {currentStep < 2 && (
          <Button style={{ marginRight: '8px' }} onClick={onFinishBase}>
            下一步
          </Button>
        )}
        {currentStep === 2 && <Button onClick={onFinish}>完成</Button>}
      </div>
    </PageWrap>
  );
}

export default memo(AddOrEditApp);
