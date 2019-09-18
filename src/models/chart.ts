import { AnyAction, Reducer } from 'redux';

import { EffectsCommandMap } from 'dva';
import { TagType, VisitDataType } from '@/types/chart';
import { queryTags, fakeChartData } from '@/services/chart';

export interface ChartStateType {
  tags: TagType[];
  salesData: VisitDataType[];
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
    fetchSalesData: Effect;
  };
  reducers: {
    // saveTags: Reducer<ChartStateType>;
    save: Reducer<ChartStateType>;
    clear: Reducer<ChartStateType>;
  };
}

const ChartModel: ChartModelType = {
  namespace: 'chart',
  state: {
    tags: [],
    salesData: [],
  },

  effects: {
    *fetchTags(_, { call, put }) {
      const res = yield call(queryTags);
      yield put({
        type: 'save',
        payload: {
          tags: res.list,
        },
      });
    },
    *fetchSalesData(_, { call, put }) {
      const response = yield call(fakeChartData);
      yield put({
        type: 'save',
        payload: {
          salesData: response,
        },
      });
    },
  },

  reducers: {
    // saveTags(state, action) {
    //   return {
    //     ...state,
    //     tags: action.payload,
    //   };
    // },
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    clear(state, { payload }) {
      return {
        ...state,
        tags: [],
        salesData: [],
      };
    },
  },
};

export default ChartModel;
