import { Store } from 'vuex';

const createStore = () => {
  return new Store({
    state: {
      posts: [],
    },
    getters: {
      posts(state) {
        return state.posts;
      },
    },
    mutations: {
      setPosts(state, posts) {
        state.posts = posts;
      },
      addPost(state, post) {
        state.posts.push(post);
      },
      editPost(state, editedPost) {
        const index = state.posts.findIndex(
          (post) => post.id === editedPost.id
        );
        if (index !== -1) {
          this.state.posts[index] = editedPost;
        }
      },
    },

    actions: {
      nuxtServerInit(vuexContext, context) {
        return this.$axios
          .$get(
            'https://nuxt-blog-66f91-default-rtdb.europe-west1.firebasedatabase.app/posts.json'
          )
          .then((res) => {
            vuexContext.commit(
              'setPosts',
              Object.entries(res).map(([key, value]) => ({
                ...value,
                id: key,
              }))
            );
          })
          .catch((e) => context.error(e));
      },
      setPosts(context, posts) {
        context.commit('setPosts', posts);
      },
      addPost(context, post) {
        const createdPost = { ...post, updatedAt: new Date() };
        return this.$axios
          .$post(
            'https://nuxt-blog-66f91-default-rtdb.europe-west1.firebasedatabase.app/posts.json',
            createdPost
          )
          .then(({ name: id }) => {
            context.commit('addPost', { ...createdPost, id });
          })
          .catch((e) => console.error(e));
      },
      async editPost(context, { post, id }) {
        return await this.$axios
          .$put(
            `https://nuxt-blog-66f91-default-rtdb.europe-west1.firebasedatabase.app/posts/${id}.json`,
            post
          )
          .then(() => {
            context.commit('editPost', { ...post, id });
          })
          .catch((e) => console.error(e));
      },
    },
  });
};

export default createStore;
