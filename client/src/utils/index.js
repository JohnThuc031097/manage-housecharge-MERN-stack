
const getIdUnique = () => {
    return (Date.now() + Math.random()).toString();
}

export {
    getIdUnique,
}