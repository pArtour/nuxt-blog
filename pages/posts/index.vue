<template>
  <div class="posts-page">
    <PostsList :posts="posts" />
  </div>
</template>

<script>
import PostsList from '@/components/posts/PostList.vue';
export default {
  components: {
    PostsList,
  },
  computed: {
    posts() {
      return this.$store.getters.posts;
    },
  },
};
</script>

<style scoped>
.posts-page {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>