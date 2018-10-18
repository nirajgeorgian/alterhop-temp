import express from 'express'
const router = express.Router()
import { signup, login, passwordToken, resetPassword, confirmToken, updateProfile } from '../controller/auth.controller'

router.route('/signup')
	.post(signup)

router.route('/login')
	.post(login)

router.route('/password_token')
  .post(passwordToken)

router.route('/confirm_token')
	.post(confirmToken)

router.route('/profile')
	.post(updateProfile)


export default router
