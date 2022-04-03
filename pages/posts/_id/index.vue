<template>
  <div class="single-post-page">
    <section class="post">
      <h1>{{ post.title }}</h1>
      <div class="post-details">
        <div>{{ post.author }}</div>
        <div>Last updated at {{ post.updatedAt }}</div>
      </div>
      <p>{{ post.content }}</p>
    </section>
    <section class="post-feedback">
      <a href="mailto:feedback@gom.com"
        >Let me know what you think about the post feedback@gom.com</a
      >
    </section>
  </div>
</template>

<script>
export default {
  async asyncData(context) {
    const postId = context.params.id;
    try {
      const post = await context.$axios.$get(
        `${process.env.BASE_URL}/posts/${postId}.json`
      );
      return { post };
    } catch (error) {
      context.error(error);
    }
  },
};
</script>

<style scoped>
.single-post-page {
  padding: 30px;
  text-align: center;
  box-sizing: border-box;
}

.post {
  width: 100%;
}

@media (min-width: 768px) {
  .post {
    width: 600px;
    margin: auto;
  }
}

.post-title {
  margin: 0;
}

.post-details {
  padding: 10px;
  box-sizing: border-box;
  border-bottom: 3px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

@media (min-width: 768px) {
  .post-details {
    flex-direction: row;
  }
}

.post-detail {
  color: rgb(88, 88, 88);
  margin: 0 10px;
}

.post-feedback a {
  color: red;
  text-decoration: none;
}

.post-feedback a:hover,
.post-feedback a:active {
  color: salmon;
}
</style>