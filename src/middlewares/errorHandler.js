const {customErrorHandler} = require('../utils/custom_error')
const errorHandler = (err,req,res,next)=>{
    if(err instanceof customErrorHandler ){
        return res.status(404).send(err.message)
    }
    else{
        res.status(500).send("Something Went Wrong")
    }
} 

module.exports = errorHandler