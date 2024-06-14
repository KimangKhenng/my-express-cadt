const logger = (req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next(); // Call the next middleware function
};

const errorHandle = (err, req, res, next) => {
    //console.error("Error server: ", err.stack)
    return res.status(500).send(err.message)
}

const idValidator = (req, res, next) => {
    const id = req.params.id
    if (!isNaN(id)) {
        next()
    }
    throw Error(`Id: ${id} contains string`)
}

module.exports = { logger, idValidator, errorHandle }