import {
  Button,
  Card,
  DatePicker,
  Form,
  Icon,
  Input,
  InputNumber,
  Upload,
  message,
  Row,
  Col,
  Slider,
  Rate,
  Switch,
  Radio,
  Select,
  Checkbox,
  Tooltip,
} from 'antd';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import React, { Component, Fragment } from 'react';
import { Dispatch } from 'redux';
import { FormComponentProps } from 'antd/es/form';
import { connect } from 'dva';
import styles from './index.less';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

interface BasicFormProps extends FormComponentProps {
  submitting: boolean;
  dispatch: Dispatch<any>;
}

class BasicForm extends Component<BasicFormProps> {
  state = {
    loading: false,
    imageUrl: '',
  };
  handleSubmit = (e: React.FormEvent) => {
    const { dispatch, form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const { rangeTime } = values;
        const startTime = rangeTime[0].format('YYYY-MM-DD HH:mm:ss');
        const endTime = rangeTime[1].format('YYYY-MM-DD HH:mm:ss');
        delete values['rangeTime'];
        const params = {
          ...values,
          startTime,
          endTime,
        };
        console.log('表单提交', params);
        dispatch({
          type: 'form/submitBasicForm',
          payload: params,
        });
      }
    });
  };

  getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  }

  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      this.getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false,
        }),
      );
    }
  };

  uploadButton = (
    <div>
      <Icon type={this.state.loading ? 'loading' : 'plus'} />
      <div className="ant-upload-text">Upload</div>
    </div>
  );

  normFile = e => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  render() {
    const { imageUrl } = this.state;
    const { submitting } = this.props;
    const {
      form: { getFieldDecorator, getFieldValue },
    } = this.props;

    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };

    const rangeConfig = {
      rules: [{ type: 'array', required: true, message: '请选择时间!' }],
    };

    return (
      <Card title="基础表单" bordered={false}>
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <FormItem label="普通文本">Jack-cool</FormItem>
          <FormItem label="选择器(Select)" hasFeedback>
            {getFieldDecorator('select', {
              rules: [{ required: true, message: '请选择城市!' }],
            })(
              <Select placeholder="请选择城市">
                <Option value="shanghai">上海</Option>
                <Option value="beijing">北京</Option>
              </Select>,
            )}
          </FormItem>
          <FormItem label="选择器(多选)Select[multiple]">
            {getFieldDecorator('selectMultiple', {
              rules: [{ required: true, message: '请选择你喜欢的颜色!', type: 'array' }],
            })(
              <Select mode="multiple" placeholder="请选择你喜欢的颜色">
                <Option value="red">Red</Option>
                <Option value="green">Green</Option>
                <Option value="blue">Blue</Option>
              </Select>,
            )}
          </FormItem>
          <FormItem label="RangePicker[showTime]">
            {getFieldDecorator('rangeTime', rangeConfig)(
              <RangePicker showTime format="YYYY-MM-DD HH:mm:ss" />,
            )}
          </FormItem>
          <FormItem label="数字输入框(InputNumber)">
            {getFieldDecorator('inputNumber', { initialValue: 3 })(
              <InputNumber min={1} max={10} />,
            )}
            <span className="ant-form-text"> machines</span>
          </FormItem>
          <Form.Item label="开关(Switch)">
            {getFieldDecorator('switch', { valuePropName: 'checked' })(<Switch />)}
          </Form.Item>

          <FormItem label="滑动输入条(Slider)">
            {getFieldDecorator('slider')(
              <Slider
                marks={{
                  0: 'A',
                  20: 'B',
                  40: 'C',
                  60: 'D',
                  80: 'E',
                  100: 'F',
                }}
              />,
            )}
          </FormItem>

          <FormItem label="单选框(Radio.Group)">
            {getFieldDecorator('radioGroup')(
              <Radio.Group>
                <Radio value="a">item 1</Radio>
                <Radio value="b">item 2</Radio>
                <Radio value="c">item 3</Radio>
              </Radio.Group>,
            )}
          </FormItem>

          <FormItem label="Radio.Button">
            {getFieldDecorator('radioButton', {
              initialValue: ['a'],
            })(
              <Radio.Group buttonStyle="solid">
                <Radio.Button value="a">item 1</Radio.Button>
                <Radio.Button value="b">item 2</Radio.Button>
                <Radio.Button value="c">item 3</Radio.Button>
              </Radio.Group>,
            )}
          </FormItem>

          <FormItem label="Checkbox.Group">
            {getFieldDecorator('checkboxGroup', {
              initialValue: ['A', 'B'],
            })(
              <Checkbox.Group style={{ width: '100%' }}>
                <Row>
                  <Col span={8}>
                    <Checkbox value="A">A</Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox disabled value="B">
                      B
                    </Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="C">C</Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="D">D</Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="E">E</Checkbox>
                  </Col>
                </Row>
              </Checkbox.Group>,
            )}
          </FormItem>

          <FormItem label="评分(Rate)">
            {getFieldDecorator('rate', {
              initialValue: 3.5,
            })(<Rate allowHalf />)}
          </FormItem>

          <FormItem label="Upload" extra="">
            {getFieldDecorator('upload', {
              valuePropName: 'fileList',
            })(
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                beforeUpload={this.beforeUpload}
                onChange={this.handleChange}
              >
                {imageUrl ? (
                  <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
                ) : (
                  this.uploadButton
                )}
              </Upload>,
            )}
          </FormItem>
          <FormItem wrapperCol={{ span: 12, offset: 6 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </FormItem>
        </Form>
      </Card>
    );
  }
}

export default Form.create<BasicFormProps>()(
  connect(({ loading }: { loading: { effects: { [key: string]: boolean } } }) => ({
    submiting: loading.effects['form/submitBasicForm'],
  }))(BasicForm),
);
