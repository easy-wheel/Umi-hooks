import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import { message } from 'antd';
import { routerRedux } from 'dva/router';
import { queryUser, removeUser, addUser, updateUser } from '@/services/user';

import { TableListData } from '@/types/user.d';

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: {}) => T) => T },
) => void;

export interface UserStateType {
  data: TableListData;
}

// export interface paginationProps {
//   pageNum: number;
//   pageSize: number;
//   total: number;
// }
// export interface UserStateProps {
//   userList: Array<Object>;
//   pagination: paginationProps;
// }

export interface UserModelType {
  namespace: string;
  state: UserStateType;
  effects: {
    fetchUserList: Effect;
    removeUser: Effect;
  };
  reducers: {
    updateState: Reducer<UserStateType>;
    save: Reducer<UserStateType>;
  };
}

const UserModel: UserModelType = {
  namespace: 'user',
  state: {
    data: {
      list: [],
      pagination: {},
    },
  },
  effects: {
    *fetchUserList({ payload }, { call, put }) {
      const response = yield call(queryUser, payload);

      yield put({
        type: 'save',
        payload: response,
      });
    },
    *removeUser({ payload, callback }, { call, put }) {
      const response = yield call(removeUser, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
  },
  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    save(state, { payload }) {
      return {
        ...state,
        data: payload,
      };
    },
  },
};

export default UserModel;
