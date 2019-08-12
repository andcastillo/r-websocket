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

#* Export the given variable
#* @get /get_
#* @param script The variable to retrieve
get_ <- function(script){
   get(script, envir = e)
}

#* List all the variables in the current environment
#* @get /ls_
ls_ <- function(){
  ls(e)
}

#* Remove the given variable
#* @get /rm_
#* @param script The variable to remove
rm <- function(script){
  rm(script, envir = e)
}

#* Evaluate the given script
#* @post /eval_
eval_ <- function(req, script, data = 0 ){
  #print(script)
  #print(req)
  eval(parse(text = script), e)
}
