import express from 'express'
const router = express.Router()
import { signup, login } from '../controller/auth.controller'
//
// router.route('/signup')
// 	.post(signup)
//
// router.route('/login')
// 	.post(login)

export default router
