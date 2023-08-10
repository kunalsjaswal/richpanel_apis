import express from 'express'
import { addNewUser, cancelSubscription, setActive, userLogin, userPayment,getData } from '../controllers/users.js'

const router = express.Router()

router.post('/user-registration',addNewUser)
router.post('/user-login',userLogin)
router.post('/payment-gateway',userPayment)
router.put('/activate-subscription/:id',setActive)
router.put('/cancel-subscription/:id',cancelSubscription)
router.get('/getuserData/:id', getData)

export default router