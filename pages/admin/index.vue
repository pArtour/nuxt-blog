<template>
  <div class="admin-page">
    <section class="new-post">
      <app-button type="button" @click="$router.push('/admin/new-post')">
        Create new post
      </app-button>
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
  data() {
    return {
      posts: [
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
      ],
    };
  },
};
</script>

<style scoped>
.admin-page {
  padding: 20px;
}

.new-post {
  text-align: center;
  border-bottom: 2px solid #ccc;
  padding-bottom: 10px;
}

.existing-posts h1 {
  text-align: center;
}
</style>