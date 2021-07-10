import mongoose from 'mongoose';
import helper from '../helper/handleApi.js';
const Schema = mongoose.Schema;

// const imageStory = new Schema({
//     fileName: { type: String, default: '' }, 
//     path: { type: String, default: '' }, 
//     size: { type: Number, default: 0 },
//     ext: { type: String, default: '' },
// });

const account = new Schema({
    accountName: {
        type: String, 
        require: [true, 'Missing name account!'],
        lowercase: true,
        minLength: [6, 'Account name must be at least 6'],
        maxLength: [18, 'Account name must be at less 18'],
        unique: true,
    },
    password: {
        type: String,
        require: [true, 'Missing password!'],
        minLength: [8, 'Password must be at least 8'],
        maxLength: [16, 'Password must be at less 16'],
    },
    hashPassword: {
        type: String,
        default: '',
    },
    refreshToken: {
        type: String,
        default: '',
    },
    dateCreate: {
        type: Date,
        default: Date.now,
    },
    info: {
        lastName: { type: String, default: '' },
        firstName: { type: String, default: '' },
        email: { type: String, default: '' },
        numberPhone: { type: String, default: '' },
        dateToBirthday: { type: Date, default: Date.now },
        address: { type: String, default: '' },
        gender: { type: String, enum: ['Nữ', 'Nam'], default: 'Nam' },
        lover: { type: String, enum: ['Có rồi', 'Đang ế!'], default: 'Đang ế!' },
        avatarPath: { type: String, default: '' },
    },
    yourStorys: [new Schema({
        nameStory: { type: String, default: '' },
        imageStory: {
            fileName: { type: String, default: '' }, 
            path: { type: String, default: '' }, 
            size: { type: Number, default: 0 },
            ext: { type: String, default: '' },
        },
    })],
});

account.pre('save', async function(next) {
    // do hash password in database
    try {
        const password = this.password;
        if(!password) return next();
        let hashString = await helper.getHashString(password);
        if(hashString) {
            this.hashPassword = hashString;
            this.password = null;
            return next();
        }
    } catch (error) {
        next(error);
    }
});

const Account = mongoose.model('account', account);

export { 
    Account,
}
