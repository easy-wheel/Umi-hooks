import { UserStateType } from './user';
import { StepFormStateType } from './stepForm';
import { ChartStateType } from './chart';

export interface ConnectState {
  user: UserStateType;
  stepForm: StepFormStateType;
  chart: ChartStateType;
}
