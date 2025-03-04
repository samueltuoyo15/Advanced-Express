const requestLogger = (req, res, next) => {
  const timestamps = new Date().toISOString()
  const method = req.method
  const url = req.url
  const userAgent = req.get("User-Agent")
  
  console.log(`[${timestamps} ${method} ${url} - User-Agent: ${userAgent}`)
  next()
}

export default requestLogger