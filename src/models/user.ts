/*
 * @Description:
 * @version:
 * @Author: fengshuan
 * @Date: 2019-09-04 18:04:22
 * @LastEditors: fengshuan
 * @LastEditTime: 2019-09-07 13:32:22
 */
import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import { message } from 'antd';
import { routerRedux } from 'dva/router';
import { queryList } from '@/services/user';

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: {}) => T) => T },
) => void;

export interface paginationProps {
  pageNum: number;
  total: number;
}
export interface UserStateProps {
  userList: Array<Object>;
  pagination: paginationProps;
}

export interface UserModelType {
  namespace: string;
  state: UserStateProps;
  effects: {
    getUserList: Effect;
  };
  reducers: {
    updateState: Reducer<{}>;
  };
}

const UserModel: UserModelType = {
  namespace: 'user',
  state: {
    userList: [],
    pagination: {
      pageNum: 1,
      total: 0,
    },
  },
  effects: {
    *getUserList({ payload }, { call, put }) {
      const response = yield call(queryList, payload);
      console.log('response', response);
      yield put({
        type: 'updateState',
        payload: {
          userList: response,
        },
      });
    },
  },
  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};

export default UserModel;
