/*
 * @Description:
 * @version:
 * @Author: fengshuan
 * @Date: 2019-09-04 18:04:22
 * @LastEditors: fengshuan
 * @LastEditTime: 2019-09-07 13:32:22
 */
import { Reducer } from 'redux';
import { Effect } from 'dva';

import { queryList } from '@/services/user';

export interface UserModelState {
  userList?: Array<Object>;
}

export interface UserModelType {
  namespace: string;
  state: UserModelState;
  effects: {
    getUserList: Effect;
  };
  reducers: {
    updateState: Reducer<UserModelState>;
  };
}

const UserModel: UserModelType = {
  namespace: 'user',
  state: {
    userList: [],
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
