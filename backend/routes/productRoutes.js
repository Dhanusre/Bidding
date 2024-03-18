import express from 'express';
const app=express();
import { Product } from '../models/productModel.js';
const router = express.Router();









app.post('/', async (request, response) => {
    try {
        // Validate request body
        const { name, description, category, image, price, rating, brand, stock, reviews } = request.body;
        if (!name || !description || !category || !image || !price || !rating || !brand || !stock || !reviews) {
            return response.status(400).json({ message: 'All fields are required.' });
        }

        // Create a new Product document
        const newProduct = new Product({
            name:request.body.name,
            description:request.body.description,
            category:request.body.category,
            image:request.body.image,
            price:request.body.price,
            rating:request.body.rating,
            brand:request.body.brand,
            stock:request.body.stock,
            reviews:request.body.reviews,
            createdAt: new Date() // Assuming createdAt should be the current date
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

app.get('/',async(request,response)=>{
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


app.get('/:id',async(request,response)=>{
    try{

        const {id}=request.params;
        const product =await Product.findById(id);

        return response.status(200).json(order);
    }catch(error){
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
});
export default router;




 