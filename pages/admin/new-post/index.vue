<template>
  <div class="admin-new-post-page">
    <section class="new-post-form">
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
  data() {
    return {
      post: {
        author: '',
        title: '',
        content: '',
        thumbnail: '',
        previewText: '',
      },
    };
  },
  methods: {
    async onSubmitted(post) {
      await this.$store.dispatch('addPost', post);
      this.$router.push('/admin');
    },
  },
};
</script>

<style scoped>
.new-post-form {
  width: 90%;
  margin: 20px auto;
}

@media (min-width: 768px) {
  .new-post-form {
    width: 500px;
  }
}
</style>