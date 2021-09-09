import axios from 'axios';
import { GET_POST_QUERY } from '../graphql/queries';

export default async function ({route, store}) {
  await axios({
    method: "POST",
    url: 'http://localhost:4000/graphql',
    data: {
      query: GET_POST_QUERY,
      variables: {id: parseInt(route.params.id)}
    },
    headers: {
      'Content-Type': 'application/json',
    }
  })
  .then(({data}) => {
    store.commit('posts/setPost', data.data.post);
  })
  .catch(error => {
    console.log(error);
  });
}
