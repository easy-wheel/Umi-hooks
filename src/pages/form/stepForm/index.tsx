import { Card, Steps } from 'antd';
import React, { Component } from 'react';

import { connect } from 'dva';
import { StepFormStateType } from '@/models/stepForm';
import Step1 from './components/Step1';
import Step2 from './components/Step2';
import Step3 from './components/Step3';

import styles from './index.less';
const { Step } = Steps;

interface StepFormProps {
  current: StepFormStateType['current'];
}

@connect(({ stepForm }: { stepForm: StepFormStateType }) => ({
  current: stepForm.current,
}))
class StepForm extends Component<StepFormProps> {
  getCurrentStep() {
    const { current } = this.props;
    switch (current) {
      case 'info':
        return 0;
      case 'confirm':
        return 1;
      case 'result':
        return 2;
      default:
        return 0;
    }
  }

  render() {
    const currentStep = this.getCurrentStep();
    let stepComponent;
    if (currentStep === 1) {
      stepComponent = <Step2 />;
    } else if (currentStep === 2) {
      stepComponent = <Step3 />;
    } else {
      stepComponent = <Step1 />;
    }
    return (
      <Card bordered={false}>
        <>
          <Steps current={currentStep} className={styles.steps}>
            <Step title="填写转账信息" />
            <Step title="确认转账信息" />
            <Step title="完成" />
          </Steps>
          {stepComponent}
        </>
      </Card>
    );
  }
}

export default StepForm;
