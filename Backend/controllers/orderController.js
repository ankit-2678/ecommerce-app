import OrderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

//placing orders  using COD method

const placeOrder = async (req,res) => {
    try {
        const{userId,items,amount,address} = req.body;

        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod:'cod',
            payment:false,
            date:Date.now()
        }

        const newOrder = new OrderModel(orderData)
        await newOrder.save()

        await userModel.findByIdAndUpdate(userId,{cartData:{}})

        res.json({success:true,message:"Order Successfully Placed"})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

// placing orders using stripe method

const placeorderStripe = async (req,res) => {
    
}

// placing order using Razorpay method

const placeorderRazorpay = async (req,res) => {
    
}

// All orders data for Admin panel

const allOrders = async(req,res)=>{
    try {
        const orders = await OrderModel.find({})
        res.json({success:true,orders})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
        
    }
}

// User Order Data for Frontend
const userOrders = async (req,res) => {
    try {
        const{userId}=req.body

        const orders = await OrderModel.find({userId})
        res.json({success:true,orders})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
        
    }
}
// update order status from Admin  panel
const updateStatus = async (req,res) => {
    try {
        const {orderId,status} = req.body
        await OrderModel.findByIdAndUpdate(orderId,{status})
        res.json({success:true,message:"Status Updated"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

export {
    placeOrder,
    placeorderRazorpay,
    placeorderStripe,
    allOrders,
    userOrders,
    updateStatus,
}