<template>
  <div
    class="modal-backdrop"
    v-show="isShow">
    <div class="modal">
      <header class="modal-header">
        <slot name="header">
          <h2 v-show="!isEdit">{{item === undefined ? 'title' : item.title}}</h2>
          <input v-show="isEdit" @input="handleInput($event.target.value)" :value="item === undefined ? 'title' : item.title">
          <button class="button" v-on:click="back()">x</button>
        </slot>
      </header>
      <section class="modal-body">
        <slot name="body">
          <p class="title">notes: </p>
          <p class="title" v-show="!isEdit">{{ item === undefined ? 'notes' : item.notes}}</p>
          <input v-show="isEdit" @input="handleNotesInput($event.target.value)" :value=" item === undefined ? 'notes' : item.notes">
          <p class="title">state: </p>
          <p class="title" v-show="!isEdit">{{item === undefined ? 'state' : item.state}}</p>
          <select v-show="isEdit" v-on:change="handleSelect($event.target.value)">
            <option disabled value="">{{ item === undefined ? 'state' : item.state}}</option>
            <option value="todo">todo</option>
            <option value="pending">pending</option>
            <option value="completed">completed</option>
          </select>
        </slot>
      </section>
      <footer class="modal-footer">
        <slot name="footer">
          <button v-show="!isEdit" class="modify" v-on:click="change()">edit</button>
          <button v-show="isEdit" class="modify" v-on:click="saveChanges(item)">save</button>
        </slot>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Details',
  props: ['isShow', 'back', 'item', 'handleInput', 'handleNotesInput', 'saveChanges', 'change', 'selected', 'notes', 'title', 'isEdit', 'handleSelect'],
}
</script>

<style>
.modify {
  width: 100%;
  height: 2.5em;
  background: white;
  border: none;
  outline: none;
  border-top: 1px solid rgb(0, 162, 255);
}
.modify:hover {
  color: rgb(0, 162, 255);
  cursor: pointer;
  transform: scale(0.9);
}
</style>
