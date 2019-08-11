library(plumber)
r <- plumb("rest_controller.R")
r$run(port=8888, host="0.0.0.0")

