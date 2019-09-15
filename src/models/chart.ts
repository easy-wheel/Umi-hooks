import { AnyAction, Reducer } from 'redux';

import { EffectsCommandMap } from 'dva';
import { TagType } from '@/types/chart';
import { queryTags } from '@/services/chart';

export interface ChartStateType {
  tags: TagType[];
}

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: ChartStateType) => T) => T },
) => void;

export interface ChartModelType {
  namespace: string;
  state: ChartStateType;
  effects: {
    fetchTags: Effect;
  };
  reducers: {
    saveTags: Reducer<ChartStateType>;
  };
}

const ChartModel: ChartModelType = {
  namespace: 'chart',
  state: {
    tags: [],
  },

  effects: {
    *fetchTags(_, { call, put }) {
      const res = yield call(queryTags);
      yield put({
        type: 'saveTags',
        payload: res.list,
      });
    },
  },

  reducers: {
    saveTags(state, action) {
      return {
        ...state,
        tags: action.payload,
      };
    },
  },
};

export default ChartModel;
