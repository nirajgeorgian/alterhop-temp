import express from 'express'
const router = express.Router()
import { signup, login, passwordToken, resetPassword, confirmToken } from '../controller/auth.controller'

router.route('/signup')
	.post(signup)

router.route('/login')
	.post(login)

router.route('/password_token')
  .post(passwordToken)

// router.route('/confirm_token')
// 	.post(confirmToken)
//
// router.route('/confirm_password')
// 	.post(resetPassword)


export default router
