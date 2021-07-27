import mongoose from 'mongoose';
import helper from '../helper/handleApi.js';
const Schema = mongoose.Schema;

const chapter = new Schema({
    name: { type: String, default: '' },
    number: { type: Number, default: 0 },
    storyOwner: { type: Schema.Types.ObjectId },
    nameDir: { type: String, default: '' },
    listImage: [new Schema({
        fileName: { type: String, default: '' }, 
        path: { type: String, default: '' }, 
        size: { type: Number, default: 0 },
        ext: { type: String, default: '' },
    })],
    dateCreate: { type: Date, default: Date.now },
    dateUpdate: { type: Date, default: Date.now }
});

const storys = new Schema({
    name: { type: String, default: '' },
    type: { type: String, default: '' },
    avatar: {
        path: { type: String, default: ''},
        position: { type: Number, default: 0 }
    },
    cover: {
        path: { type: String, default: ''},
        position: { type: Number, default: 0 }
    },
    owner: { type: Schema.Types.ObjectId },
    nameDir: { type: String, default: '' },
    chapterPresent: { type: Number, default: 0 },
    listChapter: [{
        type: Schema.Types.ObjectId,
        ref: 'Chapter'
    }],
    state: { type: String, default: 'normal', enum: ['normal', 'removed'] },
    dateCreate: { type: Date, default: Date.now },
    dateUpdate: { type: Date, default: Date.now }
});

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
    storys: [{
        type: Schema.Types.ObjectId,
        ref: 'Storys'
    }],
    dateCreate: { type: Date, default: Date.now },
    dateUpdate: { type: Date, default: Date.now }
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

storys.pre('save', function(next) {
    this.chapterPresent = this.listChapter.length;
    next();
});

const Account = mongoose.model('Account', account);
const Storys = mongoose.model('Storys', storys);
const Chapter = mongoose.model('Chapter', chapter);

export { 
    Account,
    Storys,
    Chapter,
}
