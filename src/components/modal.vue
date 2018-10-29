<template>
  <div>
    <button class="add button" v-on:click="addTodo()" v-show="!isEdit">+</button>
    <div class="modal-backdrop" v-show="isEdit">
      <div class="modal">
        <header class="modal-header">
          <slot name="header">
            <h2>New todo</h2>
            <button class="button" v-on:click="closeAdd">x</button>
          </slot>
        </header>
        <section class="modal-body">
          <slot name="body">
            <p class='title'>Title: </p>
            <input @input="handleInput($event.target.value)" placeholder="">
            <p class='title'>Notes: </p>
            <input @input="handleNotes($event.target.value)" placeholder="">
            <p class='title'>Completed: </p>
            <select v-model="selected">
              <option disabled value=""></option>
              <option>pending</option>
              <option>completed</option>
              <option>todo</option>
            </select>
          </slot>
        </section>
        <footer class="modal-footer">
          <slot name="footer">
            <button class="modify" v-on:click="save()">ADD</button>
          </slot>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import { CREATE_TODO } from "../schema/schemas";
import swal from 'sweetalert';

export default {
  name: "Modal",
  data() {
    return {
      title: "",
      notes: "",
      selected: "",
      isEdit: false
    };
  },
  methods: {
    closeAdd() {
      this.isEdit = false;
    },
    handleInput(value) {
      this.title = value;
    },
    handleNotes(value) {
      this.notes = value;
    },
    save() {
      this.$apollo.mutate({
        mutation: CREATE_TODO,
        variables: {
          input: {
            title: this.title,
            notes: this.notes,
            state: this.selected
          }
        }
      }).then(response => {
        this.$apollo.provider.defaultClient.resetStore()
        swal({title: 'Successfully added', icon: "success"})
      })
      .catch(err => swal({ title: "Something happened.:(", icon: "error" }))
      this.isEdit = false
      this.title = ""
      this.select = ""
      this.notes = ""
    },
    addTodo() {
      this.isEdit = true;
    }
  }
};
</script>

<style>
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: #ffffff;
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  width: 30em;
}

.modal-header,
.modal-footer {
  padding: 15px;
  display: flex;
}

.modal-header {
  color: rgb(0, 162, 255);
  justify-content: space-between;
}

.modal-footer {
  justify-content: flex-end;
}

.modal-body {
  position: relative;
  padding: 20px 10px;
  display: flex;
  flex-wrap: wrap;
}

.button {
  border: none;
  background: rgba(255, 255, 255, 0);
}

.title {
  width: 40%;
}

input,
select {
  margin-top: 0.8em;
  height: 1.5em;
}

.button {
  font-size: 1.5em;
  outline: none;
}

.add {
  font-size: 3em;
  margin: 0.3em;
}

.button:hover {
  color: rgb(0, 162, 255);
  cursor: pointer;
  transform: scale(0.9);
}
</style>