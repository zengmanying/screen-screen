import http from '@/api/http'

// GET 请求
http
  .get('/users')
  .then((response) => {
    console.log(response)
  })
  .catch((error) => {
    console.log(error)
  })

// POST 请求
http
  .post('/users', { name: 'John Doe' })
  .then((response) => {
    console.log(response)
  })
  .catch((error) => {
    console.log(error)
  })
