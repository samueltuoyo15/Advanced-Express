class APIError extends Error{
  constructor(message, statusCode){
    super(message)
    this.statusCode = statusCode
    this.name =  "APIError" 
  }
}

const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req,res,next)).catch(next)
}

const globalErrorHandler = (err, req, res, next) => {
  k
}