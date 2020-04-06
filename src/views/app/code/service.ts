import { request } from '../../../api/request';
import { QueryListResponseData, PageQueryParams } from '../../../typings';

interface PlainObject {}

interface CodeExtends {
  user: CodeOwner;
}

export interface CodeModel {
  id: number;

  uesrId: number;

  branch: string;

  commitId: string;

  commitMessage: string;

  desc: string;

  setting: string;

  qrcodeOutputDest: string;

  pagePath: string;

  searchQuery: string;

  createdAt: Date;

  expireTime: Date;
}

export interface Code extends CodeExtends, CodeModel {}


export interface CodeOwner {
  id: number;
  avatar: string;
}

export interface CodeSearchParams extends PageQueryParams {
  name?: string;
  id?: number;
  account?: string;
  mobile?: number;
  appId: number;
}

export function createDefault(): CodeModel {
  return {
    id: 0,

    uesrId: 0,

    branch: '',

    commitId: '',

    commitMessage: '',

    desc: '',

    setting: '',

    qrcodeOutputDest: '',

    pagePath: '',

    searchQuery: '',

    expireTime: new Date(),

    createdAt: new Date(),
  };
}


export function apiGetCodeList(params?: CodeSearchParams) {
  return request<QueryListResponseData<Code>>({
    method: 'GET',
    url: '/app/code',
    params,
  });
}


export function apiCreateCode(data: CodeModel) {
  return request<PlainObject>({
    method: 'POST',
    url: '/code',
    data,
  });
}
