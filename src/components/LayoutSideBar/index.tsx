import React, { useState, useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Menu } from 'antd';
import Logo from '../SidebarLogo';
import { IStoreState } from '../../store/types';
import { AppState } from '../../store/module/app';
import { IRoute } from '../../router/config';
import renderMenu from '../SideMenu';
import './index.less';
import { Settings } from '../../store/module/settings';
import { getPagePathList } from '../../router/utils';
import AdminConfig from '../../config/index';

interface LayoutSideBarProps extends Settings {
  sidebar: AppState['sidebar'];
  routes: AppState['routes'];
  init: boolean;
}

function LayoutSideBar({ theme, layout, sidebar, routes }: LayoutSideBarProps) {
  const inlineCollapsed: {
    inlineCollapsed?: boolean;
  } = {};

  if (layout === 'side') {
    inlineCollapsed.inlineCollapsed = !sidebar.opened;
  }
  const { pathname } = window.location;
  const paths = getPagePathList(pathname);
  const [keys, setKeys] = useState<string[]>([pathname]);

  const onSelect = useCallback(({ selectedKeys }) => {
    setKeys(selectedKeys)
  }, [])

  const history = useHistory();

  useEffect(() => {
    history.listen(route => {
      setKeys([AdminConfig.BASENAME + route.pathname])
    })
  }, [])

  return (
    <aside
      className={classnames(
        'layout__side-bar',
        `layout__side-bar--${theme}`,
        `layout__side-bar--${layout}`,
        {
          'layout__side-bar--close': !sidebar.opened && layout === 'side',
        },
      )}
    >
      <div className={`layout__side-bar__logo--${layout}`}>
        <Logo opened={!sidebar.opened} layout={layout} />
      </div>
      <div className="layout__side-bar__menu">
        <Menu
          defaultSelectedKeys={[pathname]}
          defaultOpenKeys={layout === 'side' && sidebar.opened ? paths : []}
          mode={layout === 'side' ? 'inline' : 'horizontal'}
          theme={theme}
          selectedKeys={keys}
          onSelect={onSelect}
          {...inlineCollapsed}
        >
          {routes.map((menu: IRoute) => renderMenu(menu))}
        </Menu>
      </div>
    </aside>
  );
}

export default connect(({ settings, app: { sidebar, routes, init } }: IStoreState) => ({
  ...settings,
  sidebar,
  routes,
  init,
}))(LayoutSideBar);
