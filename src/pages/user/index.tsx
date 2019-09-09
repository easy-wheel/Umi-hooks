import React, { useState, useEffect, Fragment, useCallback } from 'react';
import { Table, Card, Row, Col, Button, Divider, Popover } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import StandardTable from '@/components/StandardTable';
import SearchForm from '@/components/SearchForm/index';
import { ColumnProps, TableRowSelection, TableProps } from 'antd/es/table';
import { TableListItem } from '../data.d';
import { UserStateProps } from '@/models/user';
import styles from './index.less';
import { ConnectState } from '@/models/connect';
import { number, string } from 'prop-types';
import { UserProps } from '@/services/user';
import router from 'umi/router';

interface TableListProps {
  dispatch: Dispatch<any>;
  user: UserStateProps;
  loading: {
    models: {
      [key: string]: boolean;
    };
  };
}
interface SearchFormProps {
  searchValue?: string | number;
  searchType?: string;
  pageNum?: number;
}

const UserList = (props: TableListProps) => {
  const [selectedRows, setRows] = useState([]);
  const [searchValue, setSearchValue] = useState<SearchFormProps>({});

  const { dispatch, user, loading } = props;

  const handleSelectRows = (rows: any) => {
    setRows(rows);
  };
  const handleStandardTableChange = (pagination: any) => {
    // TODO: 表格筛选项发生改变，重新请求接口
    console.log('表格筛选项发生改变，重新请求接口');
  };
  const submit = (values: any) => {
    const data = {
      ...values,
      pageNum: 1,
    };
    setSearchValue(data);
  };
  const columns: ColumnProps<any>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '备注',
      dataIndex: 'subtitle',
      key: 'subtitle',
    },
    {
      title: '价格',
      dataIndex: 'price',
      key: 'price',
    },
    // {
    //   title: '状态',
    //   dataIndex: '',
    //   key: 'status',
    //   width: 120,
    //   render: (item: any) => {
    //     interface statusObj {

    //     }
    //   }
    // }
    {
      title: '操作',
      dataIndex: '',
      key: 'x',
      width: 220,
      render: (item: any) => {
        return (
          <>
            <Button type="primary" icon="eye" onClick={() => handleProduct(item.id, false)}>
              查看
            </Button>
            <Divider type="vertical" />
            <Button type="ghost" icon="edit" onClick={() => handleProduct(item.id)}>
              编辑
            </Button>
          </>
        );
      },
    },
  ];

  const handleProduct = (id?: number, editable?: boolean) => {
    // TODO: 依据editable来区分是详情还是编辑
    // router.push({
    //   pathname: '',
    //   query: {
    //     id,
    //     editable
    //   }
    // })
  };

  return (
    <PageHeaderWrapper>
      <Row style={{ marginBottom: 15 }} type="flex" justify="space-between">
        <Col>
          <SearchForm handleSubmit={submit} />
        </Col>
        <Col>
          <Button icon="plus" type="primary" onClick={() => handleProduct()}>
            新建
          </Button>
        </Col>
      </Row>

      <StandardTable
        data={user}
        rowKey="id"
        selectedRows={selectedRows}
        onSelectRow={handleSelectRows}
        columns={columns}
        loading={!!loading}
        onChange={handleStandardTableChange}
      />
    </PageHeaderWrapper>
  );
};

// export default User;
export default connect(
  ({
    user,
    loading,
  }: {
    user: UserProps[];
    loading: {
      models: {
        [key: string]: boolean;
      };
    };
  }) => ({
    user,
    loading: loading.models.user,
  }),
)(UserList);
