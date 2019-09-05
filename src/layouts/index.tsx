import React, { useState } from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import Link from 'umi/link';
import logo from './../assets/logo.svg';
import styles from './index.less';

const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

const BasicLayout: React.FC = props => {
  const [collapsed, toggleCollapsed] = useState(false);

  const toggle = () => {
    toggleCollapsed(!collapsed);
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
          <Menu.Item key="users">
            <Link to="/user">
              <Icon type="user" />
              <span>Users</span>
            </Link>
          </Menu.Item>

          <SubMenu
            key="sub2"
            title={
              <span>
                <Icon type="team" />
                <span>Team</span>
              </span>
            }
          >
            <Menu.Item key="6">Team 1</Menu.Item>
            <Menu.Item key="8">Team 2</Menu.Item>
          </SubMenu>
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
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    </Layout>
    // <div className={styles.normal}>
    //   <h1 className={styles.title}>Yay! Welcome to umi!</h1>
    //   {props.children}
    // </div>
  );
};

export default BasicLayout;
