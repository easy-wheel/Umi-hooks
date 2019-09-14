import { UserStateType } from './user';
import { StepFormStateType } from './stepForm';
export interface ConnectState {
  user: UserStateType;
  stepForm: StepFormStateType;
}
