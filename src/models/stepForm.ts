import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import { submitStepForm } from '@/services/stepForm';

export interface StateType {
  current?: string;
  step?: {
    payAccount: string;
    receiverAccount: string;
    receiverName: string;
    amount: string;
  };
}

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: StateType) => T) => T },
) => void;

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    submitStepForm: Effect;
  };
  reducers: {
    saveStepFormData: Reducer<StateType>;
    saveCurrentStep: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'stepForm',
  state: {
    current: 'info',
    step: {
      payAccount: 'fengshuan95@gmail.com',
      receiverAccount: 'fengshuan95@gmail.com',
      receiverName: 'fengshuan',
      amount: '20000',
    },
  },

  effects: {
    *submitStepForm({ payload }, { call, put }) {
      const res = yield call(submitStepForm, payload);
      yield put({
        type: 'saveStepFormData',
        payload,
      });
      yield put({
        type: 'saveCurrentStep',
        payload: 'result',
      });
    },
  },

  reducers: {
    saveCurrentStep(state, { payload }) {
      return {
        ...state,
        current: payload,
      };
    },
    saveStepFormData(state, { payload }) {
      return {
        ...state,
        step: {
          ...(state as StateType).step,
          ...payload,
        },
      };
    },
  },
};

export default Model;
