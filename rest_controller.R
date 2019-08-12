# The enviroment for these routes
e <- new.env()

#* @filter cors
cors <- function(req, res) {
  res$setHeader("Access-Control-Allow-Origin", "*")
  
  if (req$REQUEST_METHOD == "OPTIONS") {
    res$setHeader("Access-Control-Allow-Methods","*")
    res$setHeader("Access-Control-Allow-Headers", req$HTTP_ACCESS_CONTROL_REQUEST_HEADERS)
    res$status <- 200 
    return(list())
  } else {
    plumber::forward()
  }
}

#* @get /plotx
plotx <- function(param){
   plot(iris$Sepal.Length)
}

#* @get /irisx
irisx <- function(param) {
  iris
}

#* @post /runcode
runcode <- function(req, script, data = 0 ){
  #print(script)
  #print(req)
  eval(parse(text = script), e)
}
