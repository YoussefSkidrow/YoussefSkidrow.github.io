const jsonServer = require('json-server')
const cors = require('cors')

const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

// Настройка CORS
server.use(cors({
  origin: 'https://ck14375.tw1.ru', // Разрешить доступ только с http://example.com
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Разрешить только эти HTTP-методы
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'X-HTTP-Method-Override'] // Разрешить только эти заголовки
}))

server.use(middlewares)
server.use('/api', router)
server.listen(process.env.PORT || 5000, () => {
  console.log('JSON Server is running')
})
