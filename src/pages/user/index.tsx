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
import React, { Component, Fragment } from 'react';

import { Dispatch } from 'redux';
import { FormComponentProps } from 'antd/es/form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { SorterResult } from 'antd/es/table';
import { connect } from 'dva';
import dayjs from 'dayjs';
import { UserStateType } from '@/models/user';
import StandardTable, { StandardTableColumnProps } from '@/components/StandardTable';
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

interface UserListState {
  selectedRows: TableListItem[];
}
/* eslint react/no-multi-comp:0 */
@connect(
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
)
class UserList extends Component<UserListProps, UserListState> {
  state: UserListState = {
    selectedRows: [],
  };

  columns: StandardTableColumnProps[] = [
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

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'user/fetchUserList',
    });
  }

  handleSelectRows = (rows: TableListItem[]) => {
    this.setState({
      selectedRows: rows,
    });
  };

  handleTableChange = (
    pagination: Partial<TableListPagination>,
    filtersArg: Record<keyof TableListItem, string[]>,
    sorter: SorterResult<TableListItem>,
  ) => {
    // console.log('pagination', pagination);
    // console.log('filtersArg', filtersArg);
    // console.log('sorter', sorter);
    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});
    console.log('filters', filters);
    const { dispatch } = this.props;

    const params: Partial<TableListParams> = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: 'user/fetchUserList',
      payload: params,
    });
  };

  render() {
    const {
      user: { data },
      loading,
    } = this.props;
    const { selectedRows } = this.state;

    return (
      <Fragment>
        <Card bordered={false}>
          <StandardTable
            selectedRows={selectedRows}
            loading={loading}
            data={data}
            columns={this.columns}
            onSelectRow={this.handleSelectRows}
            onChange={this.handleTableChange}
          />
        </Card>
      </Fragment>
    );
  }
}

export default Form.create<UserListProps>()(UserList);

// TODO: Hooks版本，后期需重构为Hooks + ts组合
// import React, { useState, useEffect, Fragment, useCallback } from 'react';
// import { Table, Card, Row, Col, Button, Divider, Popover } from 'antd';
// import { PageHeaderWrapper } from '@ant-design/pro-layout';
// import { Dispatch } from 'redux';
// import { connect } from 'dva';
// import StandardTable from '@/components/StandardTable';
// import SearchForm from '@/components/SearchForm/index';
// import { ColumnProps, TableRowSelection, TableProps } from 'antd/es/table';
// import { TableListItem } from '../data.d';
// import { UserStateProps } from '@/models/user';
// import styles from './index.less';
// import { ConnectState } from '@/models/connect';
// import { number, string } from 'prop-types';
// import { UserProps } from '@/services/user';
// import router from 'umi/router';

// interface TableListProps {
//   dispatch: Dispatch<any>;
//   user: UserStateProps;
//   loading: {
//     models: {
//       [key: string]: boolean;
//     };
//   };
// }
// interface SearchFormProps {
//   searchValue?: string | number;
//   searchType?: string;
//   pageNum?: number;
// }

// const UserList = (props: TableListProps) => {
//   const [selectedRows, setRows] = useState([]);
//   const [searchValue, setSearchValue] = useState<SearchFormProps>({});

//   const {
//     dispatch,
//     user: { userList, pagination },
//     loading,
//   } = props;

//   useEffect(() => {
//     fetchList();
//   }, [searchValue]);

//   const fetchList = useCallback(() => {
//     const { pagination } = props.user;
//     dispatch({
//       type: 'user/getUserList',
//       payload: {
//         ...searchValue,
//         pageNum: pagination.pageNum,
//         pageSize: pagination.pageSize,
//       },
//     });
//   }, [props.user.pagination, searchValue]);
//   const handleSelectRows = (rows: any) => {
//     setRows(rows);
//   };
//   const handleStandardTableChange = async (pagination: any) => {
//     // TODO: 表格筛选项发生改变，重新请求接口
//     console.log('表格筛选项发生改变，重新请求接口', pagination);
//     const { pageNum, pageSize, total } = pagination;
//     await dispatch({
//       type: 'user/updateState',
//       payload: {
//         pagination: {
//           pageNum,
//           pageSize,
//           total,
//         },
//       },
//     });
//     fetchList();
//   };
//   const submit = (values: any) => {
//     console.log('搜索val', values);
//     const data = {
//       ...values,
//       pageNum: 1,
//     };
//     setSearchValue(data);
//   };
//   const columns: ColumnProps<any>[] = [
//     {
//       title: 'ID',
//       dataIndex: 'id',
//       key: 'id',
//     },
//     {
//       title: '名称',
//       dataIndex: 'name',
//       key: 'name',
//     },
//     {
//       title: '备注',
//       dataIndex: 'subtitle',
//       key: 'subtitle',
//     },
//     {
//       title: '价格',
//       dataIndex: 'price',
//       key: 'price',
//     },
//     // {
//     //   title: '状态',
//     //   dataIndex: '',
//     //   key: 'status',
//     //   width: 120,
//     //   render: (item: any) => {
//     //     interface statusObj {

//     //     }
//     //   }
//     // }
//     {
//       title: '操作',
//       dataIndex: '',
//       key: 'x',
//       width: 220,
//       render: (item: any) => {
//         return (
//           <>
//             <Button type="primary" icon="eye" onClick={() => handleProduct(item.id, false)}>
//               查看
//             </Button>
//             <Divider type="vertical" />
//             <Button type="ghost" icon="edit" onClick={() => handleProduct(item.id)}>
//               编辑
//             </Button>
//           </>
//         );
//       },
//     },
//   ];

//   const handleProduct = (id?: number, editable?: boolean) => {
//     // TODO: 依据editable来区分是详情还是编辑
//     // router.push({
//     //   pathname: '',
//     //   query: {
//     //     id,
//     //     editable
//     //   }
//     // })
//   };

//   return (
//     <Fragment>
//       <Row style={{ marginBottom: 15 }} type="flex" justify="space-between">
//         <Col>
//           <SearchForm handleSubmit={submit} />
//         </Col>
//         <Col>
//           <Button icon="plus" type="primary" onClick={() => handleProduct()}>
//             新建
//           </Button>
//         </Col>
//       </Row>

//       <StandardTable
//         data={userList}
//         paginations={pagination}
//         rowKey="id"
//         selectedRows={selectedRows}
//         onSelectRow={handleSelectRows}
//         columns={columns}
//         loading={!!loading}
//         onChange={handleStandardTableChange}
//       />
//     </Fragment>
//   );
// };

// // export default User;
// export default connect(
//   ({
//     user,
//     loading,
//   }: {
//     user: UserProps[];
//     loading: {
//       models: {
//         [key: string]: boolean;
//       };
//     };
//   }) => ({
//     user,
//     loading: loading.models.user,
//   }),
// )(UserList);
