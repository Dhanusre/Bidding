import express from 'express';
const app=express();
import { User } from '../models/userModel.js';
const router = express.Router();








app.post('/', async (request, response) => {
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

app.get('/',async(request,response)=>{
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


app.get('/:id',async(request,response)=>{
    try{

        const {id}=request.params;
        const user =await User.findById(id);

        return response.status(200).json(order);
    }catch(error){
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
});



export default router;







 