import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import { submitStepForm } from '@/services/stepForm';

export interface StepFormStateType {
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
  effects: EffectsCommandMap & { select: <T>(func: (state: StepFormStateType) => T) => T },
) => void;

export interface StepFormModelType {
  namespace: string;
  state: StepFormStateType;
  effects: {
    submitStepForm: Effect;
  };
  reducers: {
    saveStepFormData: Reducer<StepFormStateType>;
    saveCurrentStep: Reducer<StepFormStateType>;
  };
}

const StepFormModel: StepFormModelType = {
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
          ...(state as StepFormStateType).step,
          ...payload,
        },
      };
    },
  },
};

export default StepFormModel;
