import mongoose from "mongoose";

const dbConnect = (host, port, collection) => {
    return mongoose.connect(`mongodb://${host}:${port}/${collection}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    })
        .then(_ => {
            return true;
        })
        .catch(err => {
            console.log('[Database] => Connect: FAILED!');
            console.log(`[Database] => Error: ${err}`);
            return false;
        })
}

export {
    dbConnect,
}