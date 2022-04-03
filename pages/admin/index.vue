<template>
  <div class="admin-page">
    <section class="new-post">
      <app-button type="button" @click="$router.push('/admin/new-post')">
        Create new post
      </app-button>
      <app-button type="button" @click="onLogout"> Logout </app-button>
    </section>
    <section class="existing-posts">
      <h1>Existing posts</h1>
      <PostsList is-admin :posts="posts" />
    </section>
  </div>
</template>

<script>
import PostsList from '@/components/posts/PostList.vue';
import AppButton from '@/components/UI/AppButton.vue';
export default {
  components: {
    PostsList,
    AppButton,
  },
  layout: 'AdminLayout',
  middleware: ['check-auth', 'auth'],
  computed: {
    posts() {
      return this.$store.getters.posts;
    },
  },
  methods: {
    onLogout() {
      this.$store.dispatch('logout');
      this.$router.push('/admin/auth');
    },
  },
};
</script>

<style scoped>
.admin-page {
  padding: 20px;
}

.new-post {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  text-align: center;
  border-bottom: 2px solid #ccc;
  padding-bottom: 10px;
}

.existing-posts h1 {
  text-align: center;
}
</style>