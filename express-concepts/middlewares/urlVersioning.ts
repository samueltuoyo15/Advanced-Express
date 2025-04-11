
export const urlVersioning = (version) => (req, res, next) => {
  if(req.url.startsWith(`/api/${version}`)){
    next()
  } else{
    res.status(404).json({
      success: false,
      error: "API url version not supported"
    })
  }
}

export const headersVersioning = (version) => (req, res, next) => {
  if(req.get("Accept-Version") === version){
    next()
  } else{
    res.status(404).json({
      success: false,
      error: "API Header version not supported"
    })
}

export const contentTypeVersion = (version) => (req, res, next) => {
  const contentType = req.get("Content-Type")
  
  if(contentType && contentType.includes(`application/vnd.api.${version}+json`)){
    next()
  } else{
    res.status(404).json({
      success: false,
      error: "API Content Type version not supported"
    })
}