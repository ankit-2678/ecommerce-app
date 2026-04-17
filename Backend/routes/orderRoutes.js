import express from 'express'
import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js'
import { updateStatus,allOrders, placeOrder, placeorderStripe, placeorderRazorpay, userOrders, } from '../controllers/orderController.js'

const OrderRouter = express.Router()

// Admin features

OrderRouter.post('/list',adminAuth,allOrders)
OrderRouter.post('/status',adminAuth,updateStatus)

// Payment features

OrderRouter.post('/place',authUser,placeOrder)
OrderRouter.post('/stripe',authUser,placeorderStripe)
OrderRouter.post('/razorpay/',authUser,placeorderRazorpay)

// user features 
OrderRouter.post('/userOrders',authUser,userOrders)

export default OrderRouter;