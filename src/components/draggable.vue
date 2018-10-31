<template>
  <div>
    <h4 v-if="loading">Loading...</h4>
    <div class="box">
      <p class="todo" >Todo: </p>
      <draggable v-model="getTodos" class="dragArea">
        <transition-group>
          <div
            class="todos"
            v-for="item in getTodos"
            :key="item.id"
          >
            <p v-on:click="getDetails(item)">{{item.title}}</p>
            <i class="far fa-trash-alt" v-on:click="deleteOne(item.id)"></i>
          </div>
        </transition-group>
      </draggable>
    </div>
    <div class="box">
      <p class="pending">Pending: </p>
      <draggable v-model="getPendings" class="dragArea" :move="onMove">
        <transition-group type="transition">
          <div
            class="todos"
            v-for="item in getPendings"
            :key="item.id"
          >
            <p v-on:click="getDetails(item)">{{item.title}}</p>
            <i class="far fa-trash-alt" v-on:click="deleteOne(item.id)"></i>
          </div>
        </transition-group>
      </draggable>
    </div>
    <div class="box">
      <p class="completed">Completed: </p>
      <draggable v-model="getCompleteds" class="dragArea">
        <transition-group>
          <div
            class="todos"
            v-for="item in getCompleteds"
            :key="item.id"
          >
            <p v-on:click="getDetails(item)">{{item.title}}</p>
            <div class="far fa-trash-alt" v-on:click="deleteOne(item.id)"></div>
          </div>
        </transition-group>
      </draggable>
    </div>
    <detail
      v-bind:item="item"
      :back="back"
      :isShow="isShow"
      :handleInput="handleInput"
      :handleNotesInput="handleNotesInput"
      :saveChanges="saveChanges"
      :title="title"
      :notes="notes"
      :selected="selected"
      :isEdit="isEdit"
      :change="change"
      :handleSelect="handleSelect"
    ></detail>
  </div>
</template>

<script>
import { GET_ITEMS, DELETE_ONE, UPDATE_ONE, GET_TODOS, GET_PENDINGS, GET_COMPLETEDS } from "../schema/schemas"
import draggable from 'vuedraggable'
import Detail from './details'

export default {
  name: 'Todo',
  data() {
    return {
      loading: 0,
      getTodos: [],
      getPendings: [],
      getCompleteds: [],
      isShow: false,
      item: {},
      title: "",
      notes: "",
      selected: "",
      isEdit: false
    }
  },
  apollo: {
    getTodos: {
      query: GET_TODOS
    },
    getPendings: {
      query: GET_PENDINGS
    },
    getCompleteds: {
      query: GET_COMPLETEDS
    }
  },
  methods: {
    onMove({ relatedContext, draggedContext }) {
      const relatedElement = relatedContext.element;
      const draggedElement = draggedContext.element;
      return (
        (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
      );
    },
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
    handleSelect(value) {
      this.selected = value
    },
    back() {
      this.isShow = false
    },
    change() {
      this.isEdit = true
    },
    handleInput(value) {
      this.title = value
    },
    handleNotesInput(value) {
      this.notes = value
    },
    saveChanges(item) {
      this.$apollo.mutate({
        mutation: UPDATE_ONE,
        variables: { id: item.id, input: {
          title: this.title === "" ? item.title : this.title,
          notes: this.notes === "" ? item.notes : this.notes,
          state: this.selected === "" ? item.selected : this.selected
        }}
      }).then(response => {
        this.$apollo.provider.defaultClient.resetStore()
        swal({title: 'Successfully updated', icon: "success"})
      }).catch(err => swal({ title: "Something happened.:(", icon: "error" }))
      this.isShow = false
      this.isEdit = false
      this.title = ""
      this.notes = ""
      this.selected = ""
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