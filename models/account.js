import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;

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
    }
});

account.pre('save', async function(next) {
    // do hash password in database
    try {
        const password = this.password;
        let hashString = await bcrypt.hash(password, parseInt(process.env.SALT_ROUND));
        if(hashString) {
            this.hashPassword = hashString;
            this.password = null;
            next();
        }
    } catch (error) {
        next(error);
    }
});

const Account = mongoose.model('account', account);

export { 
    Account,
}
