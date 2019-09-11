/*
 * @Description:
 * @version:
 * @Author: fengshuan
 * @Date: 2019-09-04 18:30:44
 * @LastEditors: fengshuan
 * @LastEditTime: 2019-09-04 18:34:56
 */
import request from '@/utils/request';
import { TableListParams } from '@/types/user.d';

// export interface UserProps {
//   id: number;
//   name: string;
//   subtitle: string;
//   price: number;
// }
// export async function queryList(): Promise<any> {
//   return request('/api/users');
// }

export async function queryUser(params: TableListParams): Promise<any> {
  return request('/api/user', {
    params,
  });
}

export async function removeUser(params: TableListParams): Promise<any> {
  return request('/api/user', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addUser(params: TableListParams): Promise<any> {
  return request('/api/user', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateUser(params: TableListParams): Promise<any> {
  return request('/api/user', {
    method: 'POST',
    data: {
      ...params,
      method: 'update',
    },
  });
}
