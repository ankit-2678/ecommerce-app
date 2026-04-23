import OrderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from 'stripe'
import razorpay from 'razorpay'
import { response } from "express";


// global variables 

const currency = 'inr'
const deliveryCharge = 10
// gateway initialize

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const razorpayInstance = new razorpay({
    key_id:process.env.RAZORPAY_KEY_ID,
    key_secret:process.env.RAZORPAY_KEY_SECRET
})


//placing orders  using COD method

const placeOrder = async (req, res) => {
    try {
        const userId = req.user._id
        const {  items, amount, address } = req.body;

        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: 'cod',
            payment: false,
            date: Date.now()
        }

        const newOrder = new OrderModel(orderData)
        await newOrder.save()

        await userModel.findByIdAndUpdate(userId, { cartData: {} })

        res.json({ success: true, message: "Order Successfully Placed" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// placing orders using stripe method

const placeorderStripe = async (req, res) => {
    try {
        const userId = req.user._id
        const {  items, amount, address } = req.body;
        const { origin } = req.headers;

        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: 'Stripe',
            payment: false,
            date: Date.now()
        }

        const newOrder = new OrderModel(orderData)
        await newOrder.save()

        const line_items = items.map((item) => ({
            price_data : {
                currency: currency,
                product_data: {
                    name: item.name,
                },
                unit_amount: item.price * 100
            },
            quantity: item.quantity
        }))

        line_items.push({
            price_data : {
                currency: currency,
                product_data: {
                    name: 'Delivery Charges',
                },
                unit_amount: deliveryCharge * 100
            },
            quantity: 1
        })

        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode: 'payment'
        })

        res.json({ success: true, session_url: session.url })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

//verify stripe

const verifyStripe = async(req,res)=>{
    const userId = req.user._id
    const{orderId,success}=req.body

    try {
        if(success === 'true'){
            await OrderModel.findByIdAndUpdate(orderId,{payment:true})
            await userModel.findByIdAndUpdate(userId,{cartData:{}})
            res.json({success:true})
        }else{
            await OrderModel.findByIdAndDelete(orderId)
            res.json({success:false})
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// placing order using Razorpay method

const placeorderRazorpay = async (req, res) => {
    try {
        const userId = req.user._id
        const {  items, amount, address } = req.body;

        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: 'Razorpay',
            payment: false,
            date: Date.now()
        }
        const newOrder = new OrderModel(orderData)
        await newOrder.save()

        const options = {
            amount:amount*100,
            currency:currency.toUpperCase(),
            receipt:newOrder._id.toString()
        }

        await razorpayInstance.orders.create(options,(error,order)=>{
            if(error){
                console.log(error);
                return res.json({success:false,message:error.message})
                
            }
            res.json({success:true,order})
        })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// verify razorpay

const verifyRazorpay = async (req,res) => {
    try {
        const userId = req.user._id
        const {razorpay_order_id} = req.body

        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)
        if(orderInfo.status ==='paid'){
            await OrderModel.findByIdAndUpdate(orderInfo.receipt,{payment:true})
            await userModel.findByIdAndUpdate(userId,{cartData:{}})

            res.json({success:true,message:"payment Successful"})
        }else{
            res.json({success:false,message:"payment failed"})
        }
        
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
        
    }
}

// All orders data for Admin panel

const allOrders = async (req, res) => {
    try {
        const orders = await OrderModel.find({})
        res.json({ success: true, orders })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })

    }
}

// User Order Data for Frontend
const userOrders = async (req, res) => {
    try {
        const userId = req.user._id

        const orders = await OrderModel.find({ userId })
        res.json({ success: true, orders })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })

    }
}
// update order status from Admin  panel
const updateStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body
        await OrderModel.findByIdAndUpdate(orderId, { status })
        res.json({ success: true, message: "Status Updated" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

export {
    placeOrder,
    placeorderRazorpay,
    placeorderStripe,
    allOrders,
    userOrders,
    updateStatus,
    verifyStripe,
    verifyRazorpay,
}