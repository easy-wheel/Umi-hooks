import React from 'react';
import { PaginationConfig, SorterResult, TableCurrentDataSource } from 'antd/lib/table';
import { any } from 'C:/Users/Administrator/AppData/Local/Microsoft/TypeScript/3.6/node_modules/@types/prop-types';
import { string } from 'postcss-selector-parser';

export interface StandardTableProps {
  columns: any;
  onSelectRow?: (row: any) => void;
  data: any;
  rowKey: string;
  pagination?: any;
  selectedRows: any[];
  onChange?: (
    pagination: PaginationConfig,
    filters: Record<keyof any, string[]>,
    sorter: SorterResult<any>,
    extra?: TableCurrentDataSource<any>,
  ) => void;
  loading?: boolean;
  bordered?: boolean;
}

export default class StandardTable extends React.Component<StandardTableProps, any> {}
