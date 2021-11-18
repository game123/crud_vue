<template>
  <div class="about">
    <h2>About</h2>
    <br>
    <p>This website was developed using the Vue framework.</p>
    <br>
    <p>For details on how this webpage was developed, please check out the Vue Course on <a href="https://amazon.com">amazon.io</a>!</p>
    <br>
    <p>The source code for this webpage is available on <a href="https://gitlab.com/game123">GitLab</a>.</p>
  </div>

</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.about {
  margin: 25px;
  padding: 10px 20px;
  color: white;
  background: rgba(0, 0, 0, 0.44);
  box-shadow: 0 0 88px 0 rgba(0, 0, 0, 0.52);
  overflow: hidden;
}

h2 {
  text-align: left;
  padding-bottom: 10px;
  border-bottom: 3px solid black;
}

p {
  padding-bottom: 10px;
  font-size: 1.2em;
}
</style>
