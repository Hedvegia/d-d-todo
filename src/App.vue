<template>
  <div id="app">
    <div class="main-title">
      <h1>Todos:</h1>
      <modal></modal>
    </div>
    <detail></detail>
    <todo class="container"></todo>
  </div>
</template>

<script>
import Todo from './components/draggable'
import Modal from './components/modal'
import Detail from './components/details'

export default {
  name: 'app',
  data() {
    return {
      title: "",
      notes: "",
      selected: ""
    }
  },
  components: {
    Todo,
    Modal,
    Detail,
  },
}

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.main-title {
  display: inline-flex;
  flex-wrap: wrap;
  width: 100%;
}

h1 {
  font-weight: normal;
  width: 80%;
  margin-left: 10%
}

.container {
  display: flex;
  width: 100%;
  justify-content: center;
}

.todo, .pending, .completed {
  margin: 0;
  height: 1.5em;
  font-size: 1.5em;
  width: 100%;
  border: 0px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.247);
  padding-top: 0.5em;
}

.getTodos {
  padding: 0;
}

span {
  height: 4em;
}

.box {
  margin: 0.5em;
  width: 30%;
  border: 1px solid rgba(0, 0, 0, 0.247);
  border-radius: 10px;
}

.todo {
  background: rgba(0, 162, 255, 0.185);
}

.pending {
  background: rgba(255, 255, 0, 0.185);
}

.completed {
  background: rgba(53, 238, 29, 0.185);
}

.todos {
  margin: auto;
  margin-top: 0.5em;
  margin-bottom: 0.5em;
  width: 90%;
  border: 1px solid rgba(128, 128, 128, 0.411);
  display: flex;
  flex-wrap: wrap;
  cursor: move;
}

.flex {
  display: flex;
  flex-wrap: wrap;
  width: 20em;
  border-radius: 5px;
  margin: 1em;
  border: 1px solid rgba(46, 46, 46, 0.2);
  background: white;
}

</style>
