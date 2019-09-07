/*
 * @Description:
 * @version:
 * @Author: fengshuan
 * @Date: 2019-09-07 11:23:11
 * @LastEditors: fengshuan
 * @LastEditTime: 2019-09-07 14:41:53
 */
import request from '@/utils/request';

interface submitBasicParams {
  startTime: string; // 开始时间
  endTime: string; // 结束时间
  select: string; // 选择器
  selectMultiple: Array<string>; // 多选选择器
  slider: number; // 滑动输入条
  rate?: number; // 评分
}

export async function submitBasicForm(payload: submitBasicParams): Promise<any> {
  return request('/api/submitBasicForm', {
    method: 'POST',
    data: payload,
  });
}
