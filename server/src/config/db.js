import mongoose from "mongoose";

const dbConnect = (host, port, collection) => {
    return mongoose.connect(`mongodb://${host}:${port}/${collection}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    })
}

export {
    dbConnect,
}