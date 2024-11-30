import mongoose from "mongoose";
const { Schema } = mongoose;
import AutoIncrementFactory from 'mongoose-sequence';
const AutoIncrement = AutoIncrementFactory(mongoose);

const ProductStockSchema = new Schema({
    sequenceIdProductStock: {
        type: Number,
        unique: true
    },
    sequenceIdUser: {
        type: Number,
        require: true,
    },
    sequenceIdProduct: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    },
    removed: {
        type: Number,
        required: true,
    }
}, {
    collection: 'product-stock',
});

ProductStockSchema.plugin(AutoIncrement, { inc_field: 'sequenceIdProductStock' });
const ProductStock = mongoose.model('ProductStock', ProductStockSchema);

export default ProductStock