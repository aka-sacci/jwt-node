const server = require('./server')
const port = 1011;

server.listen(port, () => {
    console.log("Servidor rodando na porta " + port)
})