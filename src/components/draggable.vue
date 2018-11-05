<template>
  <div>
    <h4 v-if="loading">Loading...</h4>

    <div class="box">
      <p class="todo" >Todo: </p>

      <draggable class="getTodos" element="ul" v-model="getTodos" :options="dragOptions" :move="onMove" @start="isDragging=true" @end="isDragging=false">
        <transition-group>
          <li
            class="todos"
            id="todo"
            v-for="item in getTodos"
            :key="item.id"
          >
            <p v-on:click="getDetails(item)">{{item.title}}</p>
            <i class="far fa-trash-alt" v-on:click="deleteOne(item.id)"></i>
          </li>
        </transition-group>
      </draggable>

    </div>

    <div class="box">
      <p class="pending">Pending: </p>

      <draggable class="pendings" element="span" v-model="getPendings" :options="dragOptions" :move="onMove">
        <transition-group name="no" class="getTodos" tag="ul">
          <li
            class="todos"
            id="pending"
            v-for="item in getPendings"
            :key="item.id"
          >
            <p v-on:click="getDetails(item)">{{item.title}}</p>
            <i class="far fa-trash-alt" v-on:click="deleteOne(item.id)"></i>
          </li>
        </transition-group>
      </draggable>

    </div>

    <div class="box">
      <p class="completed">Completed: </p>

      <draggable element="span" v-model="getCompleteds" :options="dragOptions" :move="onMove">
        <transition-group name="no" class="getTodos" tag="ul">
          <li
            class="todos"
            id="completed"
            v-for="item in getCompleteds"
            :key="item.id"
          >
            <p v-on:click="getDetails(item)">{{item.title}}</p>
            <div class="far fa-trash-alt" v-on:click="deleteOne(item.id)"></div>
          </li>
        </transition-group>
      </draggable>

    </div>

    <div>
      <draggable element="div" class="delete" :options="dragOptions">
        <transition-group name="delete" class="delete" tag="ul">
          <li
            class="deleteItem"
            :key="'delete'"
          >
          </li>
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
      getItems: [],
      isShow: false,
      item: {},
      title: "",
      notes: "",
      selected: "",
      isEdit: false,
      editable: true,
      isDragging: false,
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
    onMove({ relatedContext, draggedContext }, event) {
      const relatedElement = relatedContext.element;
      const draggedElement = draggedContext.element;
      const state = event.target.id
      const id = draggedContext.element.id

      if (state === '') {
        this.deleteOne(id)
      }

      this.$apollo.mutate({
        mutation: UPDATE_ONE,
        variables: { id: id, input: { state: state }}
      })
      .then(response => response)
      .catch(err => err)
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
      console.log(Object.getOwnPropertyDescriptor(item, 'title'))
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
  computed: {
    dragOptions() {
      return {
        group: "description",
        disabled: !this.editable
      };
    },
  },
  components: {
    draggable,
    Detail
  }
}
</script>

<style>
.deleteItem {
  list-style-type: none;
  border: none
}

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

.delete {
  height: 100%;
  list-style-type: none;
}

</style>