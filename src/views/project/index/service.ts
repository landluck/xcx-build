import { request } from '../../../api/request';
import { QueryListResponseData, PageQueryParams } from '../../../typings';
import { Menu } from '../../auth/menu/service';

interface PlainObject {}

export interface Project {
  id?: number;

  account: string;

  password: string;

  avatar?: string | null;

  mobile: string;

  roleId: number;

  role?: {
    id: number;
    name: string;
  };

  status: number;
}

export interface ProjectType {
  id: number;
  name: string
}

export interface ProjectSearchParams extends PageQueryParams {
  name?: string;
  id?: number;
  account?: string;
  mobile?: number;
}


export function apiGetTypeList() {
  return request<QueryListResponseData<ProjectType>>({
    method: 'GET',
    url: '/project/type',
  });
}

export function apiGetProjectList(params?: ProjectSearchParams) {
  return request<QueryListResponseData<Project>>({
    method: 'GET',
    url: '/project',
    params,
  });
}

export function apiUpdateProject(data: Project) {
  return request<PlainObject>({
    method: 'PUT',
    url: '/project',
    data,
  });
}

export function apiCreateProject(data: Project) {
  return request<PlainObject>({
    method: 'POST',
    url: '/project',
    data,
  });
}

export function apiRemoveProject(id: number) {
  return request<PlainObject>({
    method: 'DELETE',
    url: `/project/${id}`,
  });
}

export function apiGetMenuList() {
  return request<{ list: Menu[]; ids: number[] }>({
    method: 'GET',
    url: '/project/menu',
  });
}
