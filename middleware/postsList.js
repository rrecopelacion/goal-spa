import axios from 'axios';
import { GET_POSTS_QUERY } from '../graphql/queries';

export default async function ({store}) {
  await axios({
    method: "POST",
    url: 'http://localhost:4000/graphql',
    data: {
      query: GET_POSTS_QUERY,
      variables: {
        offset: 0,
        limit: 6
      }
    },
    headers: {
      'Content-Type': 'application/json',
    }
  })
  .then(({data}) => {
    store.commit('posts/setSliderPosts', data.data.posts);
    store.commit('posts/setPosts', data.data.posts);
  })
  .catch(error => {
    console.log(error);
  });
}
