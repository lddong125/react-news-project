import React, {Component,PropTypes} from 'react'
import {
  Form,
  Input,
  Button,
  Card,
  notification
} from 'antd'
import axios from 'axios'

const FormItem = Form.Item


class NewsComments　extends Component {
  static propTypes = {
    uniquekey: PropTypes.string.isRequired
  }
  state = {
    comments: []
  }
/* todo 发送ajax请求*/
  componentDidMount(){
    const {uniquekey}=this.props
    this.showComments(uniquekey)
    /*const url=`http://newsapi.gugujiankong.com/Handler.ashx?action=getcomments&uniquekey=${uniquekey}`
    axios.get(url)
      .then(response=>{
        const {comments}=this.state
        console.log(response)
        this.setState({comments})
      })*/
  }
  showComments(uniquekey) {
    const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getcomments&uniquekey=${uniquekey}`
    axios.get(url)
      .then(response => {
        console.log(response)
        const comments = response.data/*data is Array of Object*/
        this.setState({comments})
      })
  }
   /*handleSubmit函数 含有判断是否登录*/
  handleSubmit(event) {
    /*阻止默认行为*/
    event.preventDefault()
    /*获取userID*/
    let userId = localStorage.getItem('userId')
    if(!userId) {
      alert('请先登陆')
      return
    }
    /*获取输入值，和唯一编码，url并发送请求*/
    const {comment} = this.props.form.getFieldsValue()
    const {uniquekey} = this.props
    const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=comment&userid=
                  ${userId}&uniquekey=${uniquekey}&commnet=${comment}`
    axios.get(url)
      .then(response => {
        this.componentDidMount()
        this.props.form.resetFields()
        notification.success({message: '提交成功!'})
      })
  }

  /*收藏文章*/
  addUserCollection() {
    /*同上*/
    let userId = localStorage.getItem('userId')
    if(!userId) {
      alert('请先登陆')
      return
    }
    /*获取url*/
    const url = "http://newsapi.gugujiankong.com/Handler.ashx?action=uc&userid="
      + userId + "&uniquekey=" + this.props.uniquekey
    /*发送ajax请求*/
    axios.get(url)
      .then(response => {
        //收藏成功以后进行一下全局的提醒
        notification.success({message: 'ReactNews提醒', description: '收藏此文章成功'})
      })
  }


  render () {
    /*获取值*/
    const {getFieldDecorator} = this.props.form
    const {comments} = this.state
    /*判断是否有评论*/
    const commentList = comments.length
      ? comments.map((comment, index) => (
        <Card key={index} title={comment.UserName} extra={`发布于${comment.datetime}`}>
          <p>{comment.Comments}</p>
        </Card>
      ))
      : '没有加载到任何评论'

    return (
      <div style={{padding: '10px'}}>
        {/*评论列表*/}
        {commentList}
        {/*Form表单*/}
        <Form onSubmit={this.handleSubmit.bind(this)}>
          <FormItem label="您的评论">
            {
              getFieldDecorator('comment')(<Input type="textarea" placeholder="随便写点什么"/>)
            }
          </FormItem>
          <Button type='primary' htmlType="submit">提交评论</Button>
          &nbsp;&nbsp;
          <Button type='primary' htmlType="button" onClick={this.addUserCollection.bind(this)}>收藏该文章</Button>
        </Form >

      </div>
    )
  }
}

export default Form.create()(NewsComments)