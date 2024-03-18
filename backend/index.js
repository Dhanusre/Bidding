import express from "express";

import { PORT , mongoDBURL } from "./config.js";
import mongoose from 'mongoose';
import { Auction } from './models/auctionModel.js';
import auctionRoutes from'./routes/auctionRoutes.js';
import {Order} from './models/orderModel.js';
import orderRoutes from './routes/orderRoutes.js';
import{Product} from './models/productModel.js';
import productRoutes from './routes/productRoutes.js';
import{User} from './models/userModel.js';
import userRoutes from './routes/userRoutes.js';
import cors from 'cors';


const app = express();

app.use(express.json());


//app.use(cors());

app.use(
    cors({
        origin:'http://localhost:3000',
        methods:['GET','POST','PUT','DELETE'],
        allowedHeaders:['Content-Type'],
    })
);


app.get('/',(request,response)=>{
    console.log(request);
    return response.status(234).send('Welcome To MERN STACK TUTORIAL');
});

app.use('/auction',auctionRoutes);



mongoose
        .connect(mongoDBURL)
        .then(()=>{
    console.log('App connected to database');
    app.listen(PORT, () => {
        console.log(`App is listening to port: ${PORT}`);
      });
  })
  .catch((error)=>{
    console.log(error);
  });


//auction
app.post('/auction', async (request,response)=>{
    try{
        if (!request.body.title || !request.body.description || !request.body.startingPrice || !request.body.startDate || !request.body.endDate || !request.body.seller) {
            return response.status(400).json({ message: 'All fields are required.' });
        }
        
    


        const newAuction = new Auction({
            title: request.body.title,
            description: request.body.description,
            startingPrice: request.body.startingPrice,
            currentPrice: request.body.startingPrice,
            startDate: request.body.startDate,
            endDate: request.body.endDate,
            seller: request.body.seller,
            bids: request.body.bids || [], // Default to an empty array if bids are not provided
            status: request.body.status || 'Active' // Default to 'Active' if status is not provided
        });
        const auction =await Auction.create(newAuction)

        // Save the new Auction document to the database
        const savedAuction = await newAuction.save();

        // Return success response with the created Auction document
        return response.status(201).json(savedAuction);
    } catch (error) {
        console.error(error);
        return response.status(500).json({ message: 'Internal server error.' });
    }
});

app.get('/auction',async(request,response)=>{
    try{
        const auction =await Auction.find({});

        return response.status(200).json({
            count:auction.length,
            data:auction
        });
    }catch(error){
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
});



app.get('/auction/:id',async(request,response)=>{
    try{

        const {id}=request.params;
        const auction =await Auction.findById(id);

        return response.status(200).json(auction);
    }catch(error){
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
});



//order
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



//product
// Assuming you have defined the Product model and imported it into this file

// Route handler for creating a new product
app.post('/product', async (request, response) => {
    try {
        // Validate request body
        const { name, description, category, price, rating, brand, stock, reviews } = request.body;
        if (!name || !description || !category  || !price || !rating || !brand || !stock || !reviews) {
            return response.status(400).json({ message: 'All fields are required.' });
        }

        // Create a new Product document
        const newProduct = new Product({
            name:request.body.name,
            description:request.body.description,
            category:request.body.category,
            price:request.body.price,
            rating:request.body.rating,
            brand:request.body.brand,
            stock:request.body.stock,
            reviews:request.body.reviews, // Assuming createdAt should be the current date
        });

        // Save the new Product document to the database
        const savedProduct = await newProduct.save();

        // Return success response with the created Product document
        return response.status(201).json(savedProduct);
    } catch (error) {
        console.error(error);
        return response.status(500).json({ message: 'Internal server error.' });
    }
});

app.get('/product',async(request,response)=>{
    try{
        const product =await Product.find({});

        return response.status(200).json({
            count:product.length,
            data:product
        });
    }catch(error){
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
});


app.get('/product/:id',async(request,response)=>{
    try{

        const {id}=request.params;
        const product =await Product.findById(id);

        return response.status(200).json(order);
    }catch(error){
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
});



//user
app.post('/user', async (request, response) => {
    try {
        // Validate request body
        const { name, email, password, isAdmin, isSeller, seller} = request.body;
        if (!name || !email || !password) {
            return response.status(400).json({ message: 'All fields are required.' });
        }

        // Create a new User document
        const newUser = new User({
            name: request.body.name,
            email: request.body.email,
            password: request.body.password,
            isAdmin: request.body.isAdmin || false,
            isSeller: request.body.isSeller || false,
            seller: request.body.seller || {}
        });

        // Save the new Product document to the database
        const savedUser = await newUser.save();

        // Return success response with the created Product document
        return response.status(201).json(savedUser);
    } catch (error) {
        console.error(error);
        return response.status(500).json({ message: 'Internal server error.' });
    }
});

app.get('/user',async(request,response)=>{
    try{
        const user =await User.find({});

        return response.status(200).json({
            count:user.length,
            data:user
        });
    }catch(error){
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
});


app.get('/user/:id',async(request,response)=>{
    try{

        const {id}=request.params;
        const user =await User.findById(id);

        return response.status(200).json(order);
    }catch(error){
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
});







 