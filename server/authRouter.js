import { Router } from 'express'
import authController from './authController.js'

const router = new Router()

router.post('/register', authController.create)
router.get('/login', authController.login)

export default router
