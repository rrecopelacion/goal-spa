const bodyParser = require('body-parser')
const app = require('express')()
const axios = require('axios')
import {GET_POSTS_QUERY} from '../graphql/queries';

app.use(bodyParser.json())

app.get('/posts', async (req, res) => {
  await axios({
    method: "POST",
    url: 'http://localhost:4000/graphql',
    data: {
      query: GET_POSTS_QUERY,
      variables: {
        offset: 0,
        limit: 6,
      }
    },
    headers: {
      'Content-Type': 'application/json',
    }
  })
  .then(({data}) => {
    res.json(data.data.posts);
  });
})

module.exports = app
