/*
 * @Description:
 * @version:
 * @Author: fengshuan
 * @Date: 2019-09-04 18:04:22
 * @LastEditors: fengshuan
 * @LastEditTime: 2019-09-05 12:29:19
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
    update: Reducer<UserModelState>;
  };
}

const UserModel: UserModelType = {
  namespace: 'user',
  state: {
    userList: [],
  },
  effects: {
    *getUserList({ payload }, { call, put }) {
      const response = yield call(queryList);
      console.log('response', response);
      yield put({
        type: 'update',
        payload: response,
      });
    },
  },
  reducers: {
    update(state, { payload }) {
      return {
        ...state,
        userList: payload,
      };
    },
  },
};

export default UserModel;
