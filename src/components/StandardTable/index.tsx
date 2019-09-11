import React, { Component, Fragment } from 'react';
import { Table, Alert } from 'antd';
import { ColumnProps, TableRowSelection, TableProps } from 'antd/es/table';
import { TableListItem } from '@/types/user.d';
import styles from './index.less';

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export interface StandardTableProps<T> extends Omit<TableProps<T>, 'columns'> {
  columns: StandardTableColumnsProps[];
  data: {
    list: TableListItem[];
    pagination: StandardTableProps<TableListItem>['pagination'];
  };
  selectedRows: TableListItem[];
  onSelectRow: (rows: any) => void;
}

export interface StandardTableColumnsProps extends ColumnProps<TableListItem> {
  needTotal?: boolean;
  total?: number;
}

function initTotalList(columns: StandardTableColumnsProps[]) {
  if (!columns) {
    return [];
  }
  const totalList: StandardTableColumnsProps[] = [];
  columns.forEach(column => {
    if (column.needTotal) {
      totalList.push({ ...column, total: 0 });
    }
  });
  return totalList;
}

interface StandardTableState {
  selectedRowKeys: string[];
  needTotalList: StandardTableColumnsProps[];
}

class StandardTable extends Component<StandardTableProps<TableListItem>, StandardTableState> {
  static getDerivedStateFromProps(nextProps: StandardTableProps<TableListItem>) {
    // clean state
    if (nextProps.selectedRows.length === 0) {
      const needTotalList = initTotalList(nextProps.columns);
      return {
        selectedRowKeys: [],
        needTotalList,
      };
    }
    return null;
  }

  constructor(props: StandardTableProps<TableListItem>) {
    super(props);
    const { columns } = props;
    const needTotalList = initTotalList(columns);

    this.state = {
      selectedRowKeys: [],
      needTotalList,
    };
  }

  handleRowSelectChange: TableRowSelection<TableListItem>['onChange'] = (
    selectedRowKeys,
    selectedRows: TableListItem[],
  ) => {
    const currySelectedRowKeys = selectedRowKeys as string[];
    let { needTotalList } = this.state;
    needTotalList = needTotalList.map(item => ({
      ...item,
      total: selectedRows.reduce((sum, val) => sum + parseFloat(val[item.dataIndex || 0]), 0),
    }));
    const { onSelectRow } = this.props;
    if (onSelectRow) {
      onSelectRow(selectedRows);
    }

    this.setState({ selectedRowKeys: currySelectedRowKeys, needTotalList });
  };

  handleTableChange: TableProps<TableListItem>['onChange'] = (
    pagination,
    filters,
    sorter,
    ...rest
  ) => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(pagination, filters, sorter, ...rest);
    }
  };

  cleanSelectedKeys = () => {
    if (this.handleRowSelectChange) {
      this.handleRowSelectChange([], []);
    }
  };

  render() {
    const { selectedRowKeys, needTotalList } = this.state;
    const { data, rowKey, ...rest } = this.props;
    const { list = [], pagination = false } = data || {};

    const paginationProps = pagination
      ? {
          showSizeChanger: true,
          showQuickJumper: true,
          ...pagination,
        }
      : false;

    const rowSelection: TableRowSelection<TableListItem> = {
      selectedRowKeys,
      onChange: this.handleRowSelectChange,
      getCheckboxProps: (record: TableListItem) => ({
        disabled: record.disabled,
      }),
    };

    return (
      <div className={styles.standardTable}>
        <div className={styles.tableAlert}>
          <Alert
            message={
              <Fragment>
                已选择 <a style={{ fontWeight: 600 }}>{selectedRowKeys.length}</a> 项&nbsp;&nbsp;
                {needTotalList.map((item, index) => (
                  <span style={{ marginLeft: 8 }} key={item.dataIndex}>
                    {item.title}
                    总计&nbsp;
                    <span style={{ fontWeight: 600 }}>
                      {item.render
                        ? item.render(item.total, item as TableListItem, index)
                        : item.total}
                    </span>
                  </span>
                ))}
                <a onClick={this.cleanSelectedKeys} style={{ marginLeft: 24 }}>
                  清空
                </a>
              </Fragment>
            }
            type="info"
            showIcon
          />
        </div>
        <Table
          rowKey={rowKey || 'key'}
          rowSelection={rowSelection}
          dataSource={list}
          pagination={paginationProps}
          onChange={this.handleTableChange}
          {...rest}
        />
      </div>
    );
  }
}

export default StandardTable;

// class StandardTable extends PureComponent {
//   constructor(props) {
//     super(props);
//     this.state = {
//       selectedRowKeys: [],
//     };
//   }

//   static getDerivedStateFromProps(nextProps: any, prevState: any) {
//     // clean state
//     if (nextProps.selectedRows.length === 0) {
//       return {
//         selectedRowKeys: [],
//       };
//     }
//     return null;
//   }

//   handleRowSelectChange = (selectedRowKeys: string[] | number[], selectedRows: Array<any>) => {
//     const { onSelectRow } = this.props;
//     if (onSelectRow) {
//       onSelectRow(selectedRows);
//     }

//     this.setState({
//       selectedRowKeys,
//     });
//   };

//   cleanSelectedKeys = () => {
//     this.handleRowSelectChange([], []);
//   };

//   handleTableChange = (pagination, filters, sorter) => {
//     const { onChange } = this.props;
//     if (onChange) {
//       onChange(pagination, filters, sorter);
//     }
//   };

//   render() {
//     const { selectedRowKeys } = this.state;
//     const { data = {}, paginations, rowKey, ...rest } = this.props;
//     // const { list = [], pagination } = data;

//     const paginationProps = {
//       showQuickJumper: true,
//       showSizeChanger: true,
//       ...paginations,
//     };

//     const rowSelection = {
//       selectedRowKeys,
//       onChange: this.handleRowSelectChange,
//       getCheckboxProps: record => ({
//         disabled: record.disabled,
//       }),
//     };

//     return (
//       <div className={styles.standardTable}>
//         <div className={styles.tableAlert}>
//           <Alert
//             message={
//               <Fragment>
//                 已选择 <a style={{ fontWeight: 600 }}>{selectedRowKeys.length}</a> 项&nbsp;&nbsp;
//                 <a onClick={this.cleanSelectedKeys} style={{ marginLeft: 24 }}>
//                   清空
//                 </a>
//               </Fragment>
//             }
//             type="info"
//             showIcon
//           />
//         </div>
//         <Table
//           rowKey={rowKey || 'key'}
//           rowSelection={rowSelection}
//           dataSource={data}
//           pagination={paginationProps}
//           onChange={this.handleTableChange}
//           {...rest}
//         />
//       </div>
//     );
//   }
// }

// export default StandardTable;
