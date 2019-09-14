import React, { useState } from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import Link from 'umi/link';
import logo from './../assets/logo.svg';
import styles from './index.less';
import router from 'umi/router';

const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

const BasicLayout: React.FC = props => {
  const [collapsed, toggleCollapsed] = useState(false);

  const toggle = () => {
    toggleCollapsed(!collapsed);
  };
  const renderMenu = (data: Array<any>) => {
    console.log('路由', data)
    return data.map((item, index) => {
      if (item.routes) {
        return (
          <SubMenu key={item.path} title={item.name}>
            {renderMenu(item.routes)}
          </SubMenu>
        );
      }
      return (
        <Menu.Item key={item.path} title={item.name} onClick={handelMenuClick}>
          {/* <Link to={item.path}> */}
          <Icon type={item.icon} />
          <span>{item.name}</span>
          {/* </Link> */}
        </Menu.Item>
      );
    });
  };
  const handelMenuClick = e => {
    router.push(e.key);
  };
  return (
    <Layout>
      <Sider collapsible trigger={null} collapsed={collapsed} className={styles.sider}>
        <div className={styles.logo} key="logo">
          <Link to="/">
            <img src={logo} alt="logo" />
            <h1>Umi-Hooks</h1>
          </Link>
        </div>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          {renderMenu(props.route.routes)}
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: 0 }}>
          <Icon
            className={styles.trigger}
            type={collapsed ? 'menu-unfold' : 'menu-fold'}
            onClick={toggle}
          />
        </Header>
        <Content style={{ margin: '24px 24px 0', height: '100%' }}>
          {/*此处可加面包屑*/}
          {props.children}
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2019 Created by Ant UED</Footer>
      </Layout>
    </Layout>
    // <div className={styles.normal}>
    //   <h1 className={styles.title}>Yay! Welcome to umi!</h1>
    //   {props.children}
    // </div>
  );
};

export default BasicLayout;
