import express from 'express';
const app=express();
import { Order } from '../models/orderModel.js';
const router = express.Router();




app.post('/order', async (request, response) => {
    try {
        // Validate request body
        const { orderItems, shippingAddress, paymentMethod, paymentResult, itemsPrice, shippingPrice, taxPrice, totalPrice, user } = request.body;
        if (!orderItems || !shippingAddress || !paymentMethod || !itemsPrice || !shippingPrice || !taxPrice || !totalPrice || !user) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        // Create a new Order document
        const newOrder = new Order({
            orderItems:request.body.orderItems,
            shippingAddress:request.body.shippingAddress,
            paymentMethod:request.body.paymentMethod,
            paymentResult:request.body.paymentResult,
            itemsPrice:request.body.itemsPrice,
            shippingPrice:request.body.shippingPrice,
            taxPrice:request.body.taxPrice,
            totalPrice:request.body.totalPrice,
            user:request.body.user,
            createdAt: new Date() // Assuming createdAt should be the current date
        });

        // Save the new Order document to the database
        const savedOrder = await newOrder.save();

        // Return success response with the created Order document
        return response.status(201).json(savedOrder);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
});

app.get('/order',async(request,response)=>{
    try{
        const order =await Order.find({});

        return response.status(200).json({
            count:order.length,
            data:order
        });
    }catch(error){
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
});



app.get('/order/:id',async(request,response)=>{
    try{

        const {id}=request.params;
        const order =await Order.findById(id);

        return response.status(200).json(order);
    }catch(error){
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
});


export default router;