<template>
  <div
    class="modal-backdrop"
    v-show="isShow">
    <div class="modal">
      <header class="modal-header">
        <slot name="header">
          <h2>{{item === undefined ? 'title' : item.title}}</h2>
          <button class="button" v-on:click="back()">x</button>
        </slot>
      </header>
      <section class="modal-body">
        <slot name="body">
          <p class="title">notes: </p>
          <p class="title">{{ item === undefined ? 'notes' : item.notes}}</p>
          <p class="title">state: </p>
          <p class="title">{{item === undefined ? 'state' : item.state}}</p>
        </slot>
      </section>
      <footer class="modal-footer">
        <slot name="footer">
          <button class="modify" v-on:click="change(item.id)">edit</button>
        </slot>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Details',
  props: ['isShow', 'back', 'item'],
  methods: {
    change(id) {
      console.log(id)
    }
  }
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
