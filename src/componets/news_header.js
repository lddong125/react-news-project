import React, {Component, PropTypes} from 'react'
import axios from 'axios'
import {
  Row,
  Col,
  Menu,
  Modal,
  Icon,
  Button,
  Tabs,
  Form,
  Input,
  message
} from 'antd'
import {Link} from "react-router"
import logo from "../images/logo.png"

const MenuItem=Menu.Item
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;

 class NewsHeader extends Component {
  state={
    selectedKey:"top",
    username:null,
    modalShow:false
  }

  showModal = (isShow) => {
    this.setState({modalShow:isShow})
}

  componentDidMount(){
    /*读取保存到本地的username*/
    const username=localStorage.getItem('username')
    if(username){
      this.setState({username})
    }

  }
  clickMenu=({key})=>{/*是个 key,也可以是个event*/
    //点击登录注册时才能出发判断key
    if(key==="logout"){
      this.setState({modalShow:'true'})
    }

    /*更新key的值*/
     this.setState({selectedKey:key})
  }

  handleSubmit = (isLogin) => {
    /*true--登录，faluse--注册*/
    const {username,password,r_username,r_password,re_password}= this.props.form.getFieldsValue()
    /*发请求先会获取一个url,在接口数据中获得*/
    let url='http://newsapi.gugujiankong.com/Handler.ashx?'

     if(isLogin){
       //收集表单输入的数据--登录界面-根据url判断界面
       url += `action=login&username=${username}&password=${password}`

     }else{
     //收集表单输入的数据--注册界面
       url += `action=register&r_userName=${r_username}&r_password=${r_password}&r_confirmPassword=${re_password}`
     }
    axios.get(url)
      .then((response)=>{
        const result=response.data
        if(isLogin){/*登录的返回*/
          if(result){
            message.success('登陆成功')
            const username=result.NickUserName
            const userId = result.UserId
            /*更新状态*/
            this.setState({username})
            // 保存username/userId
            localStorage.setItem('username', username)
            localStorage.setItem('userId', userId)
          }else{
            message.error('登陆失败, 重新登陆')
          }
        }else{/*注册状态*/
          message.success('注册成功')
        }

        this.setState({username})
        /*隐藏模态框并清除数据*/
        this.props.form.resetFields()
        this.showModal(false)
      })
  }
  logout=()=>{
    //更新状态,username:null
    this.setState({username: null})
    // 清除保存的用户数据
    localStorage.removeItem('username')
    localStorage.removeItem('userId')
  }

  render () {
    const {username,selectedKey,modalShow}=this.state


    const userShow=username
      ?(
        <MenuItem key="login" className="register">
          <Button type="primary">{username}</Button>&nbsp;&nbsp;
          <Link to="/user_center"><Button type="dashed">个人中心</Button></Link>&nbsp;&nbsp;
          <Button onClick={this.logout}>退出</Button>
        </MenuItem>
      )
      :(
        <MenuItem key="logout" className="register">
        <Icon type="appstore"/>登录/注册
        </MenuItem>
       )

    const {getFieldDecorator} = this.props.form;
    return (
      <header>
        <Row >
          <Col span={1}></Col>
          <Col span={3}>
            <a href="#/" className="logo">
              <img src={logo} alt="logo"/>
              <span>ReactNews</span>
            </a>{/*#/表示回到根路由*/}
          </Col>
          <Col span={19}>
            <Menu mode="horizontal" selectedKeys={[selectedKey]} onClick={this.clickMenu}>
              <MenuItem key="top">
                <Icon type="appstore"/>头条
              </MenuItem>
            <MenuItem key="shehui">
              <Icon type="appstore"/>社会
            </MenuItem>
            <MenuItem key="guonei">
              <Icon type="appstore"/>国内
            </MenuItem>
            <MenuItem key="guoji">
              <Icon type="appstore"/>国际
            </MenuItem>
            <MenuItem key="yule">
              <Icon type="appstore"/>娱乐
            </MenuItem>
            <MenuItem key="tiyu">
              <Icon type="appstore"/>体育
            </MenuItem>
            <MenuItem key="keji">
              <Icon type="appstore"/>科技
            </MenuItem>
            <MenuItem key="shishang">
              <Icon type="appstore"/>时尚
            </MenuItem>
            {userShow}


          </Menu>
{/*模态框-登录注册界面*/}
            <Modal title="用户中心"
                   visible={modalShow}
                   onOk={this.showModal.bind(this,false)}
                   onCancel={()=>this.showModal(false)}
                   okText="关闭">
              <Tabs type="card" onChange={() => this.props.form.resetFields()}>
                {/*onchange中，相当于onchange={this.handlechange}
                              handlechange=()=>(this.props.form.resetFields())
                */}
                <TabPane tab="登录" key="1">
                  <Form onSubmit={this.handleSubmit.bind(this,true)}>{/*强制传一个参数*/}
                    <FormItem label="用户名" >
                      {
                        getFieldDecorator("username")(<Input type="text" placeholder="请输入用户名"/>)
                      }
                    </FormItem>
                    <FormItem label="密码">
                      {
                        getFieldDecorator("password")(<Input type="password" placeholder="请输入密码"/>)
                      }
                    </FormItem>
                    <Button type="primary" htmlType="submit">登录</Button>
                  </Form>
                </TabPane>
                <TabPane tab="注册" key="2">
                  <Form onSubmit={this.handleSubmit.bind(this,false)}>{/*强制传一个参数*/}
                    <FormItem label="用户名" >
                      {
                        getFieldDecorator("r_username")(<Input type="text" placeholder="请输入用户名"/>)
                      }
                    </FormItem>
                    <FormItem label="密码">
                      {
                        getFieldDecorator("r_password")(<Input type="password" placeholder="请输入密码"/>)
                      }
                    </FormItem>
                    <FormItem label="密码确认">
                      {
                        getFieldDecorator("re_password")(<Input type="password" placeholder="请输入确认密码"/>)
                      }
                    </FormItem>
                    <Button type="primary" htmlType="submit">注册</Button>
                  </Form>
                </TabPane>

              </Tabs>
            </Modal>
          </Col>
          <Col span={1}></Col>
        </Row>
      </header>
    )
  }
}
export default Form.create()(NewsHeader)