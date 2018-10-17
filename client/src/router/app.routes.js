import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Loadable from 'react-loadable'
/*
  import component's here for rendering
 */
import App from '../App'

/*
  import container's to render static page
 */
import PageNotFound from '../containers/404/404.container'
import PageLoader from '../containers/loader/pageloader.containers'

/*
  Make the component dynamic so it's get dynamically imported
 */
const AccountComponent = Loadable({
  loader: () => import(/* webpackChunkName: "dynamicModule" */ '../components/account/index'),
  loading: () => <PageLoader />,
	modules: ['dynamicModule']
})

const SignupComponent = Loadable({
  loader: () => import(/* webpackChunkName: "account" */ '../components/account/signup/signup.component'),
  loading: () => <PageLoader />,
modules: ['account']
})

const LoginComponent = Loadable({
  loader: () => import(/* webpackChunkName: "account" */ '../components/account/login/login.component'),
  loading: () => <PageLoader />,
modules: ['account']
})

const PasswordTokenComponent = Loadable({
  loader: () => import(/* webpackChunkName: "password" */ '../components/account/passwordReset/passwordResetForm.component'),
  loading: () => <PageLoader />,
modules: ['password']
})

const PasswordResetComponent = Loadable({
  loader: () => import(/* webpackChunkName: "password" */ '../components/account/passwordReset/passwordResetToken.component'),
  loading: () => <PageLoader />,
modules: ['password']
})

const Editprofile = Loadable({
  loader : () => import('../components/user/profileEdit/Editprofile.component'),
  loading: () => <PageLoader />,
modules: ['user']
})
const User = Loadable({
  loader : () => import('../components/user/index'),
  loading: () => <PageLoader />,
modules: ['user']
})

class AppRouter extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={App} />
        <Route exact path='/account' component={AccountComponent} />
        <Route exact path='/account/login' component={LoginComponent} />
        <Route exact path='/account/signup' component={SignupComponent} />
        <Route exact path='/account/forgot_password' component={PasswordTokenComponent} />
        <Route exact path='/account/confirm_password/:token' component={PasswordResetComponent} />
        <Route exact path='/user' component={User} />
        <Route exact path='/user/edit-profile' component={Editprofile} />
        <Route component={PageNotFound} />
      </Switch>
    )
  }
}

export default AppRouter
