<template>
  <nav>
    <ul>
      <li><router-link to="/" class="home-nav-link">Home</router-link></li>
      <li><router-link to="/about" class="about-nav-link">About</router-link></li>
      <li><router-link to="/blog" class="blog-nav-link">Blog</router-link></li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'Navigation'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
nav {
  margin: auto;
}

nav ul {
  list-style: none;
}

nav li {
  display: inline-block;
  padding-left: 1em;
  font-size: 1.5em;
}

li a {
  text-decoration: none;
  color: white;
}

nav a.router-link-exact-active {
  color: purple;
  position: relative;
}

nav a.router-link-exact-active:after {
  position: absolute;
  content: '';
  height: 3px;
  left: 0;
  bottom: -10px;
  background: purple;
  width: 100%;
}
</style>
