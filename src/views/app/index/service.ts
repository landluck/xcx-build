import { request } from '../../../api/request';
import { QueryListResponseData, PageQueryParams } from '../../../typings';

interface PlainObject {}

export interface SelectValue {
  value: number;
  label?: string;
}

export interface AppMember {
  id: number;
  appId: number;
  userId: number;
  role: 'conner' | 'developer' | 'approver'
}

interface AppExtends {
  user: AppOwner;

  type: AppType;
}

export interface AppModel {
  id?: number;

  name: string;

  desc: string;

  git: string;

  typeId?: number;

  status: number;

  appId: string;

  privateKey: string;

  msgType: string;

  webHook: string;

  developers: SelectValue[];

  conners: SelectValue[];

  approvers: SelectValue[];

  member?: AppMember[]
}

export interface App extends AppExtends, AppModel {}

export interface AppType {
  id: number;
  name: string;
  key: string;
}

export interface AppOwner {
  id: number;
  account: string;
}

export interface AppSearchParams extends PageQueryParams {
  name?: string;
  id?: number;
  account?: string;
  mobile?: number;
}

export function createDefault(): AppModel {
  return {
    name: '',

    desc: '',

    git: '',

    typeId: 0,

    status: 1,

    developers: [],

    conners: [],

    approvers: [],

    webHook: '',

    msgType: '',

    appId: '',

    privateKey: '',
  };
}

export function apiGetTypeList() {
  return request<QueryListResponseData<AppType>>({
    method: 'GET',
    url: '/app/type',
  });
}

export function apiGetAppList(params?: AppSearchParams) {
  return request<QueryListResponseData<App>>({
    method: 'GET',
    url: '/app',
    params,
  });
}

export function apiGetAppDetail(id: number) {
  return request<App>({
    method: 'GET',
    url: `/app/${id}`,
  });
}

export function apiUpdateApp(data: AppModel) {
  return request<PlainObject>({
    method: 'PUT',
    url: '/app',
    data,
  });
}

export function apiCreateApp(data: AppModel) {
  return request<PlainObject>({
    method: 'POST',
    url: '/app',
    data,
  });
}

export function apiRemoveApp(id: number) {
  return request<PlainObject>({
    method: 'DELETE',
    url: `/app/${id}`,
  });
}
