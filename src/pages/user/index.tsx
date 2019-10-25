import React, { useEffect, useState, useCallback, Component, Fragment } from 'react';
import {
  Badge,
  Button,
  Card,
  Col,
  DatePicker,
  Divider,
  Dropdown,
  Form,
  Icon,
  Input,
  InputNumber,
  Menu,
  Row,
  Select,
  message,
} from 'antd';

import { Dispatch } from 'redux';
import { FormComponentProps } from 'antd/es/form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { SorterResult } from 'antd/es/table';
import { connect } from 'dva';
import dayjs from 'dayjs';
import { UserStateType } from '@/models/user';
import StandardTable, {
  StandardTableColumnProps,
  StandardTableColumnsProps,
} from '@/components/StandardTable';
import { TableListItem, TableListPagination, TableListParams } from '@/types/user.d';
import styles from './index.less';

const FormItem = Form.Item;
const { Option } = Select;
const getValue = (obj: { [x: string]: string[] }) =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

type IStatusMapType = 'default' | 'processing' | 'success' | 'error';
const statusMap = ['default', 'processing', 'success', 'error'];
const status = ['关闭', '运行中', '已上线', '异常'];

interface UserListProps extends FormComponentProps {
  dispatch: Dispatch<any>;
  loading: boolean;
  user: UserStateType;
}

// interface UserListState {
//   selectedRows: TableListItem[];
//   formValues: {
//     [key: string]: string;
//   };
// }

const UserList = (props: UserListProps) => {
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [selectedRows, setRows] = useState([]);
  const [formValues, setFormValues] = useState({});

  const { dispatch, loading, user, form } = props;
  const columns: StandardTableColumnsProps[] = [
    {
      title: '规则名称',
      dataIndex: 'name',
    },
    {
      title: '描述',
      dataIndex: 'desc',
    },
    {
      title: '服务调用次数',
      dataIndex: 'callNo',
      sorter: true,
      align: 'right',
      render: (val: string) => `${val}万`,
    },
    {
      title: '状态',
      dataIndex: 'status',
      filters: [
        {
          text: status[0],
          value: '0',
        },
        {
          text: status[1],
          value: '1',
        },
        {
          text: status[2],
          value: '2',
        },
        {
          text: status[3],
          value: '3',
        },
      ],
      render(val: IStatusMapType) {
        return <Badge status={statusMap[val]} text={status[val]} />;
      },
    },
    {
      title: '上次调度时间',
      dataIndex: 'updatedAt',
      sorter: true,
      render: (val: string) => <span>{dayjs(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          {/* <a onClick={() => this.handleUpdateModalVisible(true, record)}>配置</a> */}
          <a href="">编辑</a>
          <Divider type="vertical" />
          <a href="">配置</a>
        </Fragment>
      ),
    },
  ];

  useEffect(() => {
    fetchUserList();
  }, [formValues]);

  const fetchUserList = useCallback(
    (params?: any) => {
      console.log('搜索条件', formValues);
      dispatch({
        type: 'user/fetchUserList',
        payload: {
          currentPage: current,
          pageSize,
          ...formValues,
          ...params,
        },
      });
    },
    [current, pageSize, formValues],
  );

  const handleSelectRows = (rows: any) => {
    setRows(rows);
  };

  const handleTableChange = async (
    pagination: Partial<TableListPagination>,
    filtersArg: Record<keyof TableListItem, string[]>,
    sorter: SorterResult<TableListItem>,
  ) => {
    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});
    setCurrent(pagination.current as number);
    setPageSize(pagination.pageSize as number);
    const params: Partial<TableListParams> = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }
    fetchUserList(params);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
      };

      setFormValues(values);
      console.log('搜索条件', formValues, values);
      // fetchUserList(values);
    });
  };

  const handleFormReset = () => {
    form.resetFields();
    setFormValues({});
    // fetchUserList({});
  };

  const handleMenuClick = (e: { key: string }) => {
    if (!selectedRows) return;
    switch (e.key) {
      case 'remove':
        dispatch({
          type: 'user/removeUser',
          payload: {
            key: selectedRows.map((row: TableListItem[]): number[] => {
              return row.key;
            }),
          },
          callback: () => {
            setRows([]);
          },
        });
        break;
      default:
        break;
    }
  };

  const renderSimpleForm = (): React.ReactElement => {
    const { getFieldDecorator } = form;
    return (
      <Form onSubmit={handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="规则名称">
              {getFieldDecorator('name')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="使用状态">
              {getFieldDecorator('status')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="0">关闭</Option>
                  <Option value="1">运行中</Option>
                </Select>,
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={handleFormReset}>
                重置
              </Button>
            </span>
          </Col>
        </Row>
      </Form>
    );
  };

  const {
    user: { data },
  } = props;

  const menu = (): React.ReactElement => (
    <Menu onClick={handleMenuClick} selectedKeys={[]}>
      <Menu.Item key="remove">删除</Menu.Item>
      <Menu.Item key="approval">批量审批</Menu.Item>
    </Menu>
  );

  return (
    <Fragment>
      <Card bordered={false}>
        <div className={styles.tableList}>
          <div className={styles.tableListForm}>{renderSimpleForm()}</div>
          <div className={styles.tableListOperator}>
            <Button icon="plus" type="primary">
              新建
            </Button>
            {selectedRows.length > 0 && (
              <span>
                <Button>批量操作</Button>
                <Dropdown overlay={menu}>
                  <Button>
                    更多操作 <Icon type="down" />
                  </Button>
                </Dropdown>
              </span>
            )}
          </div>
          <StandardTable
            selectedRows={selectedRows}
            loading={loading}
            data={data}
            columns={columns}
            onSelectRow={handleSelectRows}
            onChange={handleTableChange}
          />
        </div>
      </Card>
    </Fragment>
  );
};

export default connect(
  ({
    user,
    loading,
  }: {
    user: UserStateType;
    loading: {
      models: {
        [key: string]: boolean;
      };
    };
  }) => ({
    user,
    loading: loading.models.user,
  }),
)(Form.create<UserListProps>()(UserList));
