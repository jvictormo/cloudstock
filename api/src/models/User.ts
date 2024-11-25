import mongoose from "mongoose";
const { Schema } = mongoose;
import AutoIncrementFactory from 'mongoose-sequence';
const AutoIncrement = AutoIncrementFactory(mongoose);

const UserSchema = new Schema({
    sequenceIdUser: {
        type: Number,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    companyName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
}, {
    collection: 'customers',
});

UserSchema.plugin(AutoIncrement, { inc_field: 'sequenceIdUser' });
const User = mongoose.model('User', UserSchema);

export default User