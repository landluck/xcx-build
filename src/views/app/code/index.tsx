import React, { useMemo, useCallback, useEffect, useState } from 'react';
import { List, Statistic, Avatar } from 'antd';
import { useParams } from 'react-router-dom';
import SearchForm, { SearchFormItem, SearchFormAction } from '../../components/SearchForm';

import { Code, apiGetCodeList, CodeSearchParams } from './service';
import PageWrap from '../../components/PageWrap';
import { PageResponseData } from '../../../typings';
import Title from '../addOrEdit/components/Title';
import '../styles/index.less';

function CodeManage() {
  const urlParams = useParams<{ id: string }>();

  const formList = useMemo<SearchFormItem[]>(
    () => [
      {
        name: 'name',
        placeholder: '请输入分支名',
        label: '分支名',
      },
      {
        name: 'commitId',
        placeholder: '请输入commitId',
        label: 'commitId',
      },
    ],
    [],
  );

  const actions = useMemo<SearchFormAction[]>(
    () => [
      {
        name: '开始打码',
        type: 'primary',
      },
    ],
    [],
  );

  // const [editVisible, setEditVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [page, setPage] = useState<{ page: number; size: number }>({ page: 1, size: 10 });

  const [codeData, setCodeData] = useState<{ list: Code[]; page: PageResponseData }>({
    list: [],
    page: {},
  });

  // const [currentCode, setCurrentCode] = useState<Code | null>(null);

  const initPageList = async (params?: CodeSearchParams) => {
    setLoading(true);

    try {
      const { data } = await apiGetCodeList({
        ...page,
        ...params,
        appId: urlParams.id ? +urlParams.id : 0,
      });
      setCodeData(data);
    } catch (error) {
      // dosomethings
    } finally {
      setLoading(false);
    }
  };

  const onSearch = useCallback(
    (params: CodeSearchParams) => {
      initPageList(params);
    },
    [page],
  );

  const onMakeCode = useCallback(() => {
    // do
  }, [])

  useEffect(() => {
    initPageList();
  }, [page]);

  const onPageChange = useCallback(
    (pageNum: number, pageSize?: number) => {
      setPage({ page: pageNum, size: pageSize! });
    },
    [],
  );

  return (
    <PageWrap>
      {/* 查询表单 */}
      <SearchForm
        formList={formList}
        actions={actions}
        onSearch={onSearch}
        onClick={onMakeCode}
      ></SearchForm>
      <Title title="打码记录" />
      <List
        itemLayout="vertical"
        size="large"
        loading={loading}
        pagination={{
          onChange: onPageChange,
          pageSize: page.size,
        }}
        dataSource={codeData.list}
        renderItem={item => (
          <List.Item
            key={item.branch}
            actions={[
              <div>{ item.createdAt }</div>,
              <Statistic.Countdown value={+item.expireTime}></Statistic.Countdown>,
            ]}
            extra={
              <img
                width={100}
                alt="code"
                src={item.qrcodeOutputDest}
              />
            }
          >
            <List.Item.Meta
              avatar={<Avatar size="large" src={item.user.avatar} />}
              title={item.branch}
              description={item.commitMessage}
            />
            {item.commitId}
          </List.Item>
        )}
      />
    </PageWrap>
  );
}

export default CodeManage;
