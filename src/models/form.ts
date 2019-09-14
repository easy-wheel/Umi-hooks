import { AnyAction } from 'redux';
import { EffectsCommandMap } from 'dva';
import { submitBasicForm } from '@/services/form';
import { message } from 'antd';

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: {}) => T) => T },
) => void;

export interface BasicFormModelType {
  namespace: string;
  state: {};
  effects: {
    submitBasicForm: Effect;
  };
}

const FormModel: BasicFormModelType = {
  namespace: 'form',
  state: {},
  effects: {
    *submitBasicForm({ payload }, { call }) {
      const res = yield call(submitBasicForm, payload);
      console.log('基础表单提交结果', res);
      message.success('提交成功');
    },
  },
};

export default FormModel;
