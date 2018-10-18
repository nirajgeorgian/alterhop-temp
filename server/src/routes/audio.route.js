import express from 'express'
const router = express.Router()
import {fileUpload} from '../controller/audio.controller'

router.route('/upload')
  .post(fileUpload)

export default router
