import { Store } from 'vuex';
import Cookie from 'js-cookie';

function getCookie(cookie, name) {
  return cookie
    .split(';')
    .find((c) => c.trim().startsWith(name))
    .split('=')[1];
}

const createStore = () => {
  return new Store({
    state: {
      posts: [],
      token: null,
    },
    getters: {
      posts(state) {
        return state.posts;
      },
      isLoggedIn(state) {
        return !!state.token;
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
      setToken(state, token) {
        state.token = token;
      },
      clearToken(state) {
        state.token = null;
      },
    },

    actions: {
      nuxtServerInit(vuexContext, context) {
        return this.$axios
          .$get(`${process.env.BASE_URL}/posts.json`)
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
            `${process.env.BASE_URL}/posts.json?auth=${context.state.token}`,
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
            `${process.env.BASE_URL}/posts/${id}.json?auth=${context.state.token}`,
            post
          )
          .then(() => {
            context.commit('editPost', { ...post, id });
          })
          .catch((e) => console.error(e));
      },

      authUser(context, payload) {
        return this.$axios
          .$post(
            `${process.env.AUTH_BASE_URL}${
              payload.isLogin ? 'signInWithPassword' : 'signUp'
            }?key=${process.env.API_KEY}`,
            {
              email: payload.email,
              password: payload.password,
              returnSecureToken: true,
            }
          )
          .then((res) => {
            context.commit('setToken', res.idToken);
            localStorage.setItem('token', res.idToken);
            Cookie.set('jwt', res.idToken);
            const expirationDate =
              new Date().getTime() + Number.parseInt(res.expiresIn, 10) * 1000;
            localStorage.setItem('expirationDate', expirationDate);
            Cookie.set('expirationDate', expirationDate);
          })
          .catch((e) => console.error(e));
      },
      initAuth(context, req) {
        let token, expirationDate;

        if (req) {
          if (!req.headers.cookie) {
            return;
          }

          token = getCookie(req.headers.cookie, 'jwt=');
          if (!token) {
            return;
          }
          expirationDate = getCookie(req.headers.cookie, 'expirationDate=');
        } else {
          token = localStorage.getItem('token');
          expirationDate = localStorage.getItem('expirationDate');
        }
        if (new Date() > +expirationDate || !token) {
          context.dispatch('logout');
        }
        context.commit('setToken', token);
      },
      logout(context) {
        context.commit('clearToken');
        Cookie.remove('jwt');
        Cookie.remove('expirationDate');
        if (process.client) {
          localStorage.removeItem('token');
          localStorage.removeItem('expirationDate');
        }
      },
    },
  });
};

export default createStore;
