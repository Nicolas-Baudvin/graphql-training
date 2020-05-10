import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

mongoose.Promise = global.Promise;

const connection = mongoose.connect(process.env.MONGO_CONNECT, {
    autoIndex: true,
    poolSize: 50,
    bufferMaxEntries: 0,
    keepAlive: 120,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.set('useCreateIndex', true);

connection
    .then(db => {
        console.log("Connexion Mongo Ok")
        return db
    })
    .catch(err => {
        console.log(err);
    });

export default connection;