import * as Validator from "./Validator";

const getIdUnique = () => {
    return (Date.now() + Math.random()).toString();
}

export {
    getIdUnique,
    Validator
}