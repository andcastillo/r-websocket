library(plumber)
r <- plumb("rest_controller.R")
r$run(port=9999)
