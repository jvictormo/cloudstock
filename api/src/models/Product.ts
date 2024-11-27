import mongoose from "mongoose";
const { Schema } = mongoose;
import AutoIncrementFactory from 'mongoose-sequence';
const AutoIncrement = AutoIncrementFactory(mongoose);

const ProductSchema = new Schema({
    sequenceIdProduct: {
        type: Number,
        unique: true
    },
    sequenceIdUser: {
        type: Number,
        require: true,
    },
    product: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    plant: {
        type: String,
        required: true,
    },
    value: {
        type: Number,
        required: true,
    },
    unit: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    }
}, {
    collection: 'products',
});

ProductSchema.plugin(AutoIncrement, { inc_field: 'sequenceIdProduct' });
const Product = mongoose.model('Product', ProductSchema);

export default Product