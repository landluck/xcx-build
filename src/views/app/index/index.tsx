import React, { useMemo, useCallback, useEffect, useState, memo } from 'react';
import { Table, Button, Tag, Select } from 'antd';
import { PaginationProps } from 'antd/lib/pagination';
import { useHistory } from 'react-router-dom';
import SearchForm, { SearchFormItem, SearchFormAction } from '../../components/SearchForm';
import BaseTable from '../../components/BaseTable';

import {
  App,
  AppSearchParams,
  apiGetAppList,
  AppType,
  apiGetTypeList,
} from './service';
import PageWrap from '../../components/PageWrap';
import { PageResponseData } from '../../../typings';
import AppTypeNode from './appType';

const AppButton = memo(
  ({
    index,
    onButtonClick,
  }: {
    index: number;
    onButtonClick: (type: string, index: number) => void;
  }) => (
    <React.Fragment>
      <Button
        size="small"
        style={{ marginRight: '10px' }}
        onClick={() => onButtonClick('edit', index)}
        type="link"
      >
        编辑
      </Button>
      <Button
        size="small"
        style={{ marginRight: '10px' }}
        onClick={() => onButtonClick('make', index)}
        type="link"
      >
        打码
      </Button>
      <Button
        size="small"
        style={{ marginRight: '10px' }}
        onClick={() => onButtonClick('edit', index)}
        type="link"
      >
        发布
      </Button>
    </React.Fragment>
  ),
);

function AppManage() {
  const [typeList, setTypeList] = useState<AppType[]>([]);
  const history = useHistory();

  const initTypeList = async () => {
    try {
      const { data } = await apiGetTypeList();

      setTypeList(data.list);
    } catch (error) {
      // do someting
    }
  };

  const formList = useMemo<SearchFormItem[]>(
    () => [
      {
        name: 'name',
        placeholder: '请输入应用名称',
        label: '应用名称',
      },
      {
        name: 'type',
        label: '应用类型',
        render: (
          <Select placeholder="应用类型" allowClear>
            {typeList.map(type => (
              <Select.Option value={type.id} key={type.id}>{type.name}</Select.Option>
            ))}
          </Select>
        ),
      },
    ],
    [typeList],
  );

  const actions = useMemo<SearchFormAction[]>(
    () => [
      {
        name: '添加应用',
        type: 'primary',
      },
    ],
    [],
  );

  // const [editVisible, setEditVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [page, setPage] = useState<{ page: number; size: number }>({ page: 1, size: 10 });

  const [appData, setAppData] = useState<{ list: App[]; page: PageResponseData }>({
    list: [],
    page: {},
  });

  // const [currentApp, setCurrentApp] = useState<App | null>(null);

  const initPageList = async (params?: AppSearchParams) => {
    setLoading(true);

    try {
      const { data } = await apiGetAppList({
        ...page,
        ...params,
      });
      setAppData(data);
    } catch (error) {
      // dosomethings
    } finally {
      setLoading(false);
    }
  };

  const onSearch = useCallback(
    (params: AppSearchParams) => {
      initPageList(params);
    },
    [page],
  );

  useEffect(() => {
    initPageList();
    initTypeList();
  }, [page]);

  const onButtonClick = useCallback(
    (type: string, index: number) => {
      const app = appData.list[index];
      // 编辑
      if (type === 'edit') {
        history.push(`/app/add/${app.id!}`)
      } else if (type === 'make') {
        history.push(`/app/code/${app.id!}`)
      }
    },
    [appData.list],
  );

  const onAddApp = useCallback(() => {
    history.push('/app/add/0')
  }, []);

  const onTableChange = useCallback(({ current, pageSize }: PaginationProps) => {
    setPage({ page: current as number, size: pageSize as number });
  }, []);

  return (
    <PageWrap>
      {/* 查询表单 */}
      <SearchForm
        formList={formList}
        actions={actions}
        onSearch={onSearch}
        onClick={onAddApp}
      ></SearchForm>
      {/* 数据表格 */}
      <BaseTable<App> data={appData} onChange={onTableChange} loading={loading}>
        <Table.Column<App> title="应用ID" dataIndex="id" align="center"></Table.Column>
        <Table.Column<App> title="应用名称" dataIndex="name" align="center"></Table.Column>
        <Table.Column<App> title="应用描述" dataIndex="desc" align="center"></Table.Column>
        <Table.Column<App> title="应用类型" dataIndex="type" align="center" render={(item, record) => <AppTypeNode type={record.type} />}></Table.Column>

        <Table.Column<App>
          title="应用owner"
          dataIndex="user"
          align="center"
          render={(text, record) => (record.user ? record.user.account : '无')}
        ></Table.Column>
        <Table.Column<App>
          title="应用状态"
          dataIndex="status"
          align="center"
          render={text => (
            <Tag color={text === 1 ? 'green' : 'red'}>{text === 1 ? '启用' : '禁用'}</Tag>
          )}
        ></Table.Column>
        <Table.Column<App>
          title="操作"
          align="center"
          render={(text, record, index) => (
            <AppButton index={index} onButtonClick={onButtonClick} />
          )}
        ></Table.Column>
      </BaseTable>
    </PageWrap>
  );
}

export default AppManage;
