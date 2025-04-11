export class APIError extends Error{
  constructor(message, statusCode){
    super(message)
    this.statusCode = statusCode
    this.name =  "APIError" 
  }
}
export const asyncHandler = (fn) => (req, res, next) => {

  Promise.resolve(fn(req, res, next)).catch(next)
}

export const globalErrorHandler = (err, req, res, next) => {
  // to log error stack 
  console.error(err.stack) 
  
  if(err instanceof APIError){
    return res.status(err.statusCode).json({
      status: "Error",
      message: err.message
    })
  } // handle mongoose validation 
  else if(err === "validationError"){
    return res.status(400).json({
      status: "Error",
      message: "Validation Error"
    })
  }else {
    return res.status(500).json({
      status: "Error",
      message: "An unexpected error occurred"
    })
  }
}