fs 			= require 'fs'
express 	= require 'express'
app 		= express()

# Directory config
public_dir = __dirname + '/public'

PORT = 3333

# Public directory config after asset serving	
app.use express.static(public_dir)

# Start listening to port
app.listen PORT

# Testing area  * beware of dog *
console.log 'hi'
