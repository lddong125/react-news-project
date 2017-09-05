import React from 'react'
import {render} from 'react-dom'
import {Router,Route,IndexRoute,hashHistory} from 'react-router'
import MediaQuery from 'react-responsive'

import App from './componets/App'
import NewsContainer from "./componets/news_container"
import NewsDetail from './componets/news_detail'
import UserCenter from './componets/user_center'


render((
  <div>
    <MediaQuery query='(min-device-width: 1224px)'>
      <Router history={hashHistory}>
        <Route path='/' component={App}>
          <IndexRoute component={NewsContainer}/>
          <Route path='/detail/:uniquekey/:type' component={NewsDetail}></Route>
          <Route path='/user_center' component={UserCenter}></Route>
        </Route>
      </Router>
    </MediaQuery>
    <MediaQuery query='(max-device-width: 1224px)'>
      <Router history={hashHistory}>
        {/*<Route path='/' component={MobileApp}>
          <IndexRoute component={MobileNewsContainer}/>
          <Route path='/detail/:uniquekey' component={MobileNewsDetail}></Route>
          <Route path='/usercenter' component={MobileUserCenter}></Route>
        </Route>*/}
      </Router>
    </MediaQuery>
  </div>
  ), document.getElementById('root'))

