import express from 'express'
import { get, post } from '../controller/test.controller'

const router  = express.Router()

router.route("/")
	.get(get)
	.post(post)

export default router
