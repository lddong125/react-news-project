import React, {Component} from 'react'
import {Row, Col, BackTop} from 'antd'
import axios from 'axios'
import NewsImageBlock from './news_img_block'
import NewsComments from './news_comments'

/*export default class NewsDetail extends Component {
  state={
    news:{}
  }

  componentDidMount(){/!*发送ajax获取数据*!/
    this.getNews(this.props)
      }
  /!*重新发送ajax请求*!/
  componentWillReceiveProps(newProps) {
    /!*console.log('componentWillReceiveProps() ', newProps)*!/
    this.getNews(newProps)
  }

  /!*定义新闻获取函数--函数没取到值？？？*!/
  getNews = (props) => {
    const {uniquekey} = props.params/!*uniquekey:undefined*!/
    const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=${uniquekey}`/!*没问题*!/
    axios.get(url)
      .then(response => {
        const news = response.data/!*data是空值*!/
        this.setState({news})
        /!*title上更新内容名称*!/
        document.title = news.title + " - React News | React 驱动的新闻平台";
      })
  }

  render() {
    /!*获取页面内容*!/
    const {news} = this.state
    return (/!*显示界面*!/
      <div>
        <Row>
          <Col span={1}></Col>
          <Col span={16} className="container">
            <div dangerouslySetInnerHTML={{__html: news.pagecontent}}/>
            <hr/>
            <NewsComments uniquekey={this.props.params.uniquekey}/>
          </Col>
          <Col span={6}>
            <NewsImageBlock count={40} type="top"
                            cardWidth="100%" cardTitle="相关新闻" imageWidth="150px"/>
          </Col>
          <Col span={1}></Col>
        </Row>
        <BackTop />
      </div>
    )
  }
}*/
export default class NewsDetail extends Component {

  state = {
    news: {}
  }

  componentDidMount () {
    // 发送ajax请求获取新闻详情数据
    const {uniquekey} = this.props.params
    this.showNewsDetail(uniquekey)
  }

  componentWillReceiveProps (newProps) {
    /*console.log('componentWillReceiveProps() ', newProps)*/
    this.showNewsDetail(newProps.params.uniquekey)
  }

  showNewsDetail(uniquekey) {
    const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=${uniquekey}`
    axios.get(url)
      .then(response => {
        const news = response.data/*data:null,应该是object*/
        this.setState({news})

        // 更新文档的标题
        document.title = news.title
      })
  }

  render () {
    const {news} = this.state
   /* console.log(this.state)*/

    const {type, uniquekey} = this.props.params

    return (
      <div>
        <Row>
          <Col span={1}></Col>
          <Col span={16} className='container'>
            <div dangerouslySetInnerHTML={{__html:news.pagecontent}}></div>
            <NewsComments uniquekey={uniquekey}></NewsComments>
          </Col>
          <Col span={6}>
            <NewsImageBlock type={type} count={40} cardWidth='100%' imageWidth='150px' cardTitle="相关新闻"></NewsImageBlock>

          </Col>
          <Col span={1}></Col>
        </Row>
        <BackTop />
      </div>
    )
  }
}
