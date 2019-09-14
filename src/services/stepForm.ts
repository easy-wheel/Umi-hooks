import request from '@/utils/request';

export async function submitStepForm(payload: any): Promise<any> {
  return request('/api/submitStepForm', {
    method: 'POST',
    data: payload,
  });
}
