/*
 * @Description:
 * @version:
 * @Author: fengshuan
 * @Date: 2019-09-04 18:30:44
 * @LastEditors: fengshuan
 * @LastEditTime: 2019-09-04 18:34:56
 */
import request from '@/utils/request';

export async function queryList(): Promise<any> {
  return request('/api/users');
}
