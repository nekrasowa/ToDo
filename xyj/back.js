const http = require("http")

const host = 'localhost'
const port = 8000

// прослушиватель
const testText = function (req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.writeHead(200)
  res.end("My first server!")
}

const server = http.createServer(testText)
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`)
})
