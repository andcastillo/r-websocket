x <- seq(0, 2 * pi, by = 0.02)
y <- sin(x)
z <- cos(x)

data <- data.frame(x, y, z)
colnames(data) <- c('x', 'y','z')
data

# eval(parse(text = 'pp <- 10'))
