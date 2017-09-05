/*图片新闻列表 在轮播图下面和下面两个图片标题的组件*/
import React, {Component, PropTypes} from 'react'
import {Card} from "antd"
import axios from "axios"
import {Link} from "react-router"

export default class NewsImgBlock　extends Component {
  static propTypes={
    cardTitle:PropTypes.string.isRequired,
    type:PropTypes.string.isRequired,
    count:PropTypes.number.isRequired,
    cardWidth:PropTypes.string.isRequired,
    imageWidth:PropTypes.string.isRequired,
  }
  state={
    newArr:[]
  }
  componentDidMount(){
    /*发送ajax请求*/
    const {count,type}=this.props

    const url=`http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=${type}&count=${count}`
    axios.get(url)
      .then(response => {
        const newArr=response.data.map(
          ({uniqueKey,title,author_name,thumbnail_pic_s})=>(
            {uniqueKey, title,author_name,thumbnail_pic_s})
        )/*形参解构赋值*/
        /*取出response的结果*/
        this.setState({newArr})/*更新结果*/
      })
  }
  render () {
    const {cardTitle,cardWidth,imageWidth,type}=this.props

    const {newArr}=this.state
    const imageStyle={
      width:imageWidth,
      height:"90px",
      display:"block"
    }
    const titleStyle={
      "width": imageWidth,
      "whiteSpace": "nowrap",
      "overflow": "hidden",
      "textOverflow": "ellipsis"
    }
    const newsList=!newArr
      ? <h2>no news!</h2>
      : (
        newArr.map(
          (news,index)=>(
           <div key={index} className="imageblock">
             <Link to={`/news_detail/${news.uniquekey}/${type}`}>
                <div>
                  <img src={news.thumbnail_pic_s} style={imageStyle}/>
                </div>
               <div className="custom-card">
                 <h3 style={titleStyle}>{news.title}</h3>
                 <p>{news.author_name}</p>
               </div>
             </Link>
           </div>
          )
        )
       )
    return (
      <Card title={cardTitle} style={{width:cardWidth}} className="topNewsList">
        {
          newsList
        }
      </Card>
    )
  }
}