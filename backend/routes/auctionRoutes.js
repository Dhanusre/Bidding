import express from 'express';
const app=express();
import { Auction } from '../models/auctionModel.js';
const router = express.Router();
//route for save a new 
app.post('/', async (request,response)=>{
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
//route for get all 
app.get('/',async(request,response)=>{
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


//route for det one by id
app.get('/:id',async(request,response)=>{
    try{

        const {id}=request.params;
        const auction =await Auction.findById(id);

        return response.status(200).json(auction);
    }catch(error){
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
});


export default router;