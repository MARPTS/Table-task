import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux'
import reducer from './reducers/reducer.js'
import DataTableContainer from './components/DataTableContainer.js';
import ColumnSelectorContainer from './components/ColumnSelectorContainer.js';
import JSONToExcelConvertor from './utils/Json2Excel';
import './App.css';
import { Layout, Button, message } from 'antd';
const {
  Header, Content,
} = Layout;


const store = createStore(reducer);

class App extends Component {

  downLoadData = () => {
    if(!this.selects) {
      message.error('you haven\'t select any data');
    }
    JSONToExcelConvertor(this.selects, 'Data');
  }

  getSelect = (selects) => {
    this.selects = selects;
  }

  render() {
    return (
      <div className="App">
       <Provider store={store}>
        <Layout>
          {/* <Sider
            breakpoint="lg"
            collapsedWidth="0"
            onBreakpoint={(broken) => { console.log(broken); }}
            onCollapse={(collapsed, type) => { console.log(collapsed, type); }}
          >
            <div className="logo" />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
              <Menu.Item key="1">
                <Icon type="user" />
                <span className="nav-text">nav 1</span>
              </Menu.Item>
              <Menu.Item key="2">
                <Icon type="video-camera" />
                <span className="nav-text">nav 2</span>
              </Menu.Item>
              <Menu.Item key="3">
                <Icon type="upload" />
                <span className="nav-text">nav 3</span>
              </Menu.Item>
              <Menu.Item key="4">
                <Icon type="user" />
                <span className="nav-text">nav 4</span>
              </Menu.Item>
            </Menu>
          </Sider> */}
            <Layout>
            <Header style={{ background: '#fff', padding: 0 }} >
              <ColumnSelectorContainer>
                <Button style={{marginLeft: 20}} type="primary" onClick={this.downLoadData}>Download</Button>              
              </ColumnSelectorContainer>
            </Header>
            <Content style={{ margin: '24px 16px 0' }}>
              <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                <div className="Content">
                  <DataTableContainer getSelect={this.getSelect}/>
                </div>
              </div>
            </Content>
            </Layout>
          </Layout>
        </Provider>
      </div>
    );
  }
}

export default App;
