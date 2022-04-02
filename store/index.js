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
    },

    actions: {
      nuxtServerInit(vuexContext, context) {
        return new Promise((resolve) => {
          setTimeout(() => {
            vuexContext.commit('setPosts', [
              {
                id: '1',
                title: 'Title 1',
                content: 'Content 1',
                author: 'Author 1',
                thumbnail:
                  'https://cdn.zmescience.com/wp-content/uploads/2015/11/lines-of-code.jpg',
              },
              {
                id: '2',
                title: 'Title 2',
                content: 'Content 2',
                author: 'Author 2',
                thumbnail:
                  'https://cdn.zmescience.com/wp-content/uploads/2015/11/lines-of-code.jpg',
              },
            ]);
            resolve();
          }, 1500);
        });
      },
      setPosts(context, posts) {
        context.commit('setPosts', posts);
      },
    },
  });
};

export default createStore;
