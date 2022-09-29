import axios from 'axios'

const baseURL =
  process.env.ENV === 'dev'
    ? 'http://localhost:3333'
    : 'https://my-json-server.typicode.com/EvanderInacio/Podcastr'

export const api = axios.create({
  baseURL
})