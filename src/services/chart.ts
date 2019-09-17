import request from '@/utils/request';

export async function queryTags() {
  return request('/api/tags');
}
export async function fakeChartData() {
  return request('/api/fake_chart_data');
}
