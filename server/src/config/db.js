import mongoose from "mongoose";

const dbConnect = (host, db) => {
    return mongoose.connect(`mongodb://${host}/${db}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    })
}

export {
    dbConnect,
}