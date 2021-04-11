import { createServer } from 'http'

import { count } from '@/counter'

const port = 7879

const server = createServer((req, res) => {
  res.write(`I answered ${count()} times`)
  res.end()
})

server.listen(port)
console.log(`Server is listening ${port} port`)
