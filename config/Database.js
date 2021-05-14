import mongoose from 'mongoose';

export default async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/miru_story', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
        });
        console.log('Sever connect to mongodb is successful!');
    } catch (error) {
        console.log('Sever connect to mongodb is error!');
    }
}