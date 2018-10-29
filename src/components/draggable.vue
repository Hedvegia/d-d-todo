<template>
  <div>
    <h4 v-if="loading">Loading...</h4>
    <div class="box">
      <p class="todo" >Todo: </p>
      <draggable v-model="todos">
        <div
          class="todos"
          v-for="(item, index) in getItems"
          v-if="item.state === 'todo'"
          v-bind:key="index"
        >
          <p v-on:click="getDetails(item)">{{item.title}}</p>
          <i class="far fa-trash-alt" v-on:click="deleteOne(item.id)"></i>
        </div>
      </draggable>
    </div>
    <div class="box">
      <p class="pending">Pending: </p>
      <draggable v-model="pending">
        <div
          class="todos"
          v-for="(item) in getItems"
          v-if="item.state === 'completed'"
          v-bind:key="item.id"
        >
          <p v-on:click="getDetails(item)">{{item.title}}</p>
          <i class="far fa-trash-alt" v-on:click="deleteOne(item.id)"></i>
        </div>
      </draggable>
    </div>
    <div class="box">
      <p class="completed">Completed: </p>
      <draggable v-model="completed">
        <div
          class="todos"
          v-for="(item, index) in getItems"
          v-if="item.state === 'pending'"
          v-bind:key="index + item.id"
        >
          <p v-on:click="getDetails(item)">{{item.title}}</p>
          <div class="far fa-trash-alt" v-on:click="deleteOne(item.id)"></div>
        </div>
      </draggable>
    </div>
    <detail
      v-bind:item="item"
      :back="back"
      :isShow="isShow"
    ></detail>
  </div>
</template>

<script>
import { GET_ITEMS, DELETE_ONE } from "../schema/schemas"
import draggable from 'vuedraggable'
import Detail from './details'

export default {
  name: 'Todo',
  data() {
    return {
      getItems: [],
      loading: 0,
      todos: [],
      pending: [],
      completed: [],
      isShow: false,
      item: {
        title: "",
      },
    }
  },
  apollo: {
    getItems: {
      query: GET_ITEMS
    }
  },
  methods: {
    deleteOne(id) {
      this.$apollo.mutate({
        mutation: DELETE_ONE,
        variables: { id }
      }).then(repsonse => {
        this.$apollo.provider.defaultClient.resetStore()
        swal({title: 'Successfully deleted', icon: "success"})
      })
      .catch(err => swal({ title: "Something happened.:(", icon: "error" }))
    },
    getDetails(item) {
      this.item = item,
      this.isShow = true
    },
    back() {
      this.isShow = false
    },
  },
  components: {
    draggable,
    Detail
  }
}
</script>

<style>
p {
  margin-left: 0.5em;
  width: 70%;
  word-break: break-all
}

.todos>p:hover {
  cursor: pointer;
  color: rgb(0, 162, 255);
}

.far {
  margin: 1em;
  align-self: flex-end;
}

.far:hover {
  color: rgb(0, 162, 255);
  cursor: pointer;
  transform: scale(0.9);
}

</style>