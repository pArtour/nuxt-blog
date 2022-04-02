<template>
  <div class="admin-post-page">
    <section class="update-form">
      <AdminPostForm :post="post" />
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

  data() {
    return {
      post: {
        author: 'asd',
        title: 'title',
        content: 'content',
        thumbnail:
          'https://cdn.zmescience.com/wp-content/uploads/2015/11/lines-of-code.jpg',
      },
    };
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