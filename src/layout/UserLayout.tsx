import React, { Suspense } from 'react';
import { Helmet } from 'react-helmet';
import { Route, Switch, Link } from 'react-router-dom';
import { Spin, Result, Button, Layout, Typography } from 'antd';
import { getPageTitle, systemRouteList } from '../router/utils';
import { IRoute } from '../router/config';
import AdminConfig from '../config/index';
import './UserLayout.less';

interface UserLayoutState {
  isError: boolean;
}

class UserLayout extends React.PureComponent<any, UserLayoutState> {
  state: UserLayoutState = {
    isError: false,
  };

  static getDerivedStateFromError() {
    return { isError: true };
  }

  componentDidCatch() {
    // 上报错误
  }

  render() {
    if (this.state.isError) {
      return (
        <Result
          status="warning"
          title="系统错误，请联系管理员"
          extra={
            <Button type="primary" key="console">
              Go Contact
            </Button>
          }
        />
      );
    }

    const title = getPageTitle(systemRouteList);

    return (
      <>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={title} />
        </Helmet>

        <div className="container">
          <div className="content">
            <div className="top">
              <Typography.Title className="header">
                <Link to="/">
                  <span className="title">{ AdminConfig.title } </span>
                </Link>
              </Typography.Title>
              <div className="desc">专为小程序服务的运维系统</div>
            </div>
            <Suspense fallback={<Spin className="layout__loading" />}>
              <Switch>
                {systemRouteList.map((menu: IRoute) => (
                  <Route exact key={menu.path} path={menu.path} component={menu.component}></Route>
                ))}
              </Switch>
            </Suspense>
          </div>
          <Layout.Footer style={{ textAlign: 'center' }}>
            { AdminConfig.title } 是这条街最靓的仔
          </Layout.Footer>
        </div>
      </>
    );
  }
}

export default UserLayout;
