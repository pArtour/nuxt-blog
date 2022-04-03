<template>
  <div class="admin-post-page">
    <section class="update-form">
      <AdminPostForm :post="post" @submit="onSubmitted" />
    </section>
  </div>
</template>

<script>
import AdminPostForm from '@/components/admin/AdminPostForm.vue';
export default {
  components: {
    AdminPostForm,
  },
  layout: 'AdminLayout',
  middleware: ['check-auth', 'auth'],
  async asyncData(context) {
    const postId = context.params.postId;
    try {
      const post = await context.$axios.$get(
        `${process.env.BASE_URL}/posts/${postId}.json`
      );
      return { post };
    } catch (error) {
      context.error(error);
    }
  },
  methods: {
    async onSubmitted(data) {
      const id = this.$route.params.postId;
      await this.$store.dispatch('editPost', { post: data, id });
      this.$router.push('/admin');
    },
  },
};
</script>

<style scoped>
.update-form {
  width: 90%;
  margin: 20px auto;
}
@media (min-width: 768px) {
  .update-form {
    width: 500px;
  }
}
</style>