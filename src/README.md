## 在react中使用typescript

### 类组件的使用

以下是官网的一个例子，创建Props和State接口，Props接口接受name和enthusiasmLevel参数，State接口接受currentEnthusiasm参数

```
import * as React from "react";

export interface Props {
  name: string;
  enthusiasmLevel?: number;
}

interface State {
  currentEnthusiasm: number;
}

class Hello extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { currentEnthusiasm: props.enthusiasmLevel || 1 };
  }

  onIncrement = () => this.updateEnthusiasm(this.state.currentEnthusiasm + 1);
  onDecrement = () => this.updateEnthusiasm(this.state.currentEnthusiasm - 1);

  render() {
    const { name } = this.props;

    if (this.state.currentEnthusiasm <= 0) {
      throw new Error('You could be a little more enthusiastic. :D');
    }

    return (
      <div className="hello">
        <div className="greeting">
          Hello {name + getExclamationMarks(this.state.currentEnthusiasm)}
        </div>
        <button onClick={this.onDecrement}>-</button>
        <button onClick={this.onIncrement}>+</button>
      </div>
    );
  }

  updateEnthusiasm(currentEnthusiasm: number) {
    this.setState({ currentEnthusiasm });
  }
}

export default Hello;

function getExclamationMarks(numChars: number) {
  return Array(numChars + 1).join('!');
}

```

### 无状态组件的使用

无状态组件也称为傻瓜组件，如果一个组件内部没有自身的state，那么组件就可以称为无状态组件。在@types/react已经定义了一个类型`type SFC<P = {}> = StatelessComponent`

```
import React from 'react'

const Button = ({ onClick: handleClick, children }) => (
  <button onClick={handleClick}>{children}</button>
)

```

如果采用ts来编写出来的无状态组件是这样的：

```
import React, { MouseEvent, SFC } from 'react';

type Props = { onClick(e: MouseEvent<HTMLElement>): void };

const Button: SFC<Props> = ({ onClick: handleClick, children }) => (
  <button onClick={handleClick}>{children}</button>
);

```

### readonly

react规定不能通过this.props.xxx和this.state.xxx直接进行修改,所以可以将State和Props标记为不可变数据：

```
interface Props {
  readonly number: number;
}

interface State {
  readonly color: string;
}

export class Hello extends React.Component<Props, State> {
  someMethod() {
    this.props.number = 123; // Error: props 是不可变的
    this.state.color = 'red'; // Error: 你应该使用 this.setState()
  }
}

```

### 处理Event对象

在工作中，可能经常会使用Event对象，change事件可以使用React.ChangeEvent, click事件可以使用React.ChangeEvent。

```
onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      // do something
  }
  
  onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      // do something
  }

```



常用 `Event` 事件对象类型：

* `ClipboardEvent<T = Element>` 剪贴板事件对象
* `DragEvent<T = Element>` 拖拽事件对象
* `ChangeEvent<T = Element>` Change 事件对象
* `KeyboardEvent<T = Element>` 键盘事件对象
* `MouseEvent<T = Element>` 鼠标事件对象
* `TouchEvent<T = Element>` 触摸事件对象
* `WheelEvent<T = Element>` 滚轮事件对象
* `AnimationEvent<T = Element>` 动画事件对象
* `TransitionEvent<T = Element>` 过渡事件对象


