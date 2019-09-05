import React, { useState, useEffect, Fragment } from 'react';
import { Table } from 'antd';
import { connect } from 'dva';
import { ColumnProps } from 'antd/lib/table';
import { ConnectState } from '@/models/connect';

const User: React.FC = props => {
  const { user, dispatch } = props;
  const { userList } = user;
  console.log(user);
  useEffect(() => {
    dispatch({
      type: 'user/getUserList',
      payload: {},
    });
  }, []);

  const columns: ColumnProps<any>[] = [
    {
      title: 'ID',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '地址',
      dataIndex: 'address',
      key: 'address',
    },
  ];
  return (
    <Fragment>
      <Table columns={columns} dataSource={userList} />
    </Fragment>
  );
};

// export default User;
export default connect(({ user }: ConnectState) => ({
  user,
}))(User);
