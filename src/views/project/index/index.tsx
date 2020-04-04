import React, { useMemo, useCallback, useEffect, useState, memo } from 'react';
import { Table, Button, Modal, message, Avatar, Tag, Select } from 'antd';
import { PaginationProps } from 'antd/lib/pagination';
import SearchForm, { SearchFormItem, SearchFormAction } from '../../components/SearchForm';
import BaseTable from '../../components/BaseTable';
import {
  Project,
  ProjectSearchParams,
  apiGetProjectList,
  apiRemoveProject,
  ProjectType,
  apiGetTypeList,
} from './service';
import PageWrap from '../../components/PageWrap';
import { PageResponseData } from '../../../typings';

const ProjectButton = memo(
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
      <Button size="small" type="link" onClick={() => onButtonClick('remove', index)}>
        删除
      </Button>
    </React.Fragment>
  ),
);

function ProjectManage() {
  const [typeList, setTypeList] = useState<ProjectType[]>([]);

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
        placeholder: '请输入项目名称',
        label: '项目名称',
      },
      {
        name: 'type',
        placeholder: '请选择项目类型',
        label: '项目类型',
        render: (
          <Select>
            {typeList.map(type => (
              <Select.Option value={type.id}>{type.name}</Select.Option>
            ))}
          </Select>
        ),
      },
    ],
    [],
  );

  const actions = useMemo<SearchFormAction[]>(
    () => [
      {
        name: '添加项目',
        type: 'primary',
      },
    ],
    [],
  );

  // const [editVisible, setEditVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [page, setPage] = useState<{ page: number; size: number }>({ page: 1, size: 10 });

  const [projectData, setProjectData] = useState<{ list: Project[]; page: PageResponseData }>({
    list: [],
    page: {},
  });

  // const [currentProject, setCurrentProject] = useState<Project | null>(null);

  const initPageList = async (params?: ProjectSearchParams) => {
    setLoading(true);

    try {
      const { data } = await apiGetProjectList({
        ...page,
        ...params,
      });
      setProjectData(data);
    } catch (error) {
      // dosomethings
    } finally {
      setLoading(false);
    }
  };

  const onSearch = useCallback(
    (params: ProjectSearchParams) => {
      initPageList(params);
    },
    [page],
  );

  useEffect(() => {
    initPageList();
    initTypeList();
  }, [page]);

  // const closeEditModal = useCallback(() => {
  //   setEditVisible(false);
  // }, [setEditVisible]);

  // const onOkEditModal = useCallback(() => {
  //   setEditVisible(false);
  //   initPageList();
  // }, [setEditVisible]);

  const onButtonClick = useCallback(
    (type: string, index: number) => {
      if (type === 'remove') {
        Modal.confirm({
          title: '系统提示',
          content: '此操作将永久删除该用户, 是否继续?',
          onOk() {
            apiRemoveProject(projectData.list[index].id!)
              .then(() => {
                message.success('删除成功！');
                initPageList();
              })
              .catch(() => {});
          },
          onCancel() {},
        });
      }
      // setCurrentProject(projectData.list[index]);

      // setEditVisible(true);
    },
    [projectData.list],
  );

  // const onAddProject = useCallback(() => {
  //   setCurrentProject(null);
  //   setEditVisible(true);
  // }, []);

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
        // onClick={onAddProject}
      ></SearchForm>
      {/* 数据表格 */}
      <BaseTable<Project> data={projectData} onChange={onTableChange} loading={loading}>
        <Table.Column<Project> title="用户id" dataIndex="id" align="center"></Table.Column>
        <Table.Column<Project> title="用户账号" dataIndex="account" align="center"></Table.Column>
        <Table.Column<Project> title="用户手机号" dataIndex="mobile" align="center"></Table.Column>
        <Table.Column<Project>
          title="用户头像"
          dataIndex="avatar"
          align="center"
          render={text => <Avatar src={text}></Avatar>}
        ></Table.Column>

        <Table.Column<Project>
          title="用户角色"
          dataIndex="role"
          align="center"
          render={(text, record) => (record.role ? record.role.name : '无')}
        ></Table.Column>
        <Table.Column<Project>
          title="用户状态"
          dataIndex="status"
          align="center"
          render={text => (
            <Tag color={text === 1 ? 'green' : 'red'}>{text === 1 ? '启用' : '禁用'}</Tag>
          )}
        ></Table.Column>
        <Table.Column<Project>
          title="操作"
          align="center"
          render={(text, record, index) => (
            <ProjectButton index={index} onButtonClick={onButtonClick} />
          )}
        ></Table.Column>
      </BaseTable>
    </PageWrap>
  );
}

export default ProjectManage;
