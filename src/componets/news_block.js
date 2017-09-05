/*中间页签 文本新闻列表组件*/
import React, {Component, PropTypes} from 'react'
import axios from 'axios'
import {Card} from "antd"
import {Link} from "react-router"

export default class NewsBlock extends Component {
  static propTypes={
    type:PropTypes.string.isRequired,
    count:PropTypes.number.isRequired
  }
  state={
    newsArr:[]
  }
  componentDidMount(){
/*发送ajax请求*/
    const {count,type}=this.props
    const url=`http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=${type}&count=${count}`
    axios.get(url)
      .then(res => {
        /*const newArr=response.data.map(news=>{
          return{
            uniqueKey:news.uniqueKey,
            title:news.title
          }*/
        const newsArr=res.data.map(({uniquekey,title})=>({uniquekey, title}))/*形参解构赋值*/
        /*取出response的结果*/
        this.setState({newsArr})/*更新结果*/
      })
  }
  render () {
    const {newsArr}=this.state
    const {type}=this.props

    const contentUI=!newsArr
      ?<h2>没有任何新闻</h2>
      :(
        <ul>
          {
            newsArr.map((news,index)=>(
              <li key={index}>
                <Link to={`/detail/${news.uniquekey}/${type}`}>{news.title}</Link>
              </li>
            ))
          }
        </ul>
       )
    /*处理新闻列表*/
    return (
      <div>
        <Card className="topNewsList">
          {
            contentUI
          }
        </Card>
      </div>
    )
  }
}