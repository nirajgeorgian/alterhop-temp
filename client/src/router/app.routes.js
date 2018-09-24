import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Loadable from 'react-loadable'
/*
  import component's here for rendering
 */
import App from '../App'
import Account from '../components/account/index'

/*
  import container's to render static page
 */
import PageNotFound from '../containers/404/404.container'
import PageLoader from '../containers/loader/pageloader.containers'

/*
  Make the component dynamic so it's get dynamically imported
 */
const AccountComponent = Loadable({
  loader: () => <Account />,
  loading: () => <PageLoader />
})

class AppRouter extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={App} />
        <Route exact path='/account' component={AccountComponent} />
        <Route component={PageNotFound} />
      </Switch>
    )
  }
}

export default AppRouter
