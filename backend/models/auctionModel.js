import mongoose from 'mongoose';

const auctionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    startingPrice: {
        type: Number,
        required: true
    },
    currentPrice: {
        type: Number,
        default: function() {
            return this.startingPrice;
        }
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    seller: {
        type: String,
        required: true
    },
    bids: [{
        amount: {
            type: Number,
            required: true
        },
        bidder: {
            type: String,
            required: true
        },
        timestamp: {
            type: Date,
            default: Date.now
        }
    }],
    status: {
        type: String,
        enum: ['Active', 'Expired', 'Cancelled'],
        default: 'Active'
    }
});

export const Auction = mongoose.model('Auction', auctionSchema);
