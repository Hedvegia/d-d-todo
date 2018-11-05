<template>
  <div class="fluid container">


      <draggable class="list-group" element="ul" v-model="list" :options="dragOptions" :move="onMove" @start="isDragging=true" @end="isDragging=false">
        <transition-group>
          <li class="list-group-item" v-for="element in list" :key="element.order">
            {{element.name}}
          </li>
        </transition-group>
      </draggable>

      <draggable element="span" v-model="list2" :options="dragOptions" :move="onMove">
        <transition-group name="no" class="list-group" tag="ul">
          <li class="list-group-item" v-for="element in list2" :key="element.order">
            {{element.name}}
          </li>
        </transition-group>
      </draggable>

  </div>
</template>

<script>
import draggable from "vuedraggable";
const message = [
  "vue.draggable",
  "draggable",
  "component",
  "for",
  "vue.js 2.0",
  "based",
  "on",
  "Sortablejs"
];
export default {
  name: "hello",
  components: {
    draggable
  },
  data() {
    return {
      list: message.map((name, index) => {
        return { name, order: index + 1, fixed: false };
      }),
      list2: [],
      editable: true,
      isDragging: false,
      delayedDragging: false
    };
  },
  methods: {
    onMove({ relatedContext, draggedContext }) {
      console.log('onMove')
      const relatedElement = relatedContext.element;
      const draggedElement = draggedContext.element;
    }
  },
  computed: {
    dragOptions() {
      return {
        group: "description",
        disabled: !this.editable,
      };
    },
  },
  watch: {
    isDragging(newValue) {
      console.log('isDragging')
      if (newValue) {
        this.delayedDragging = true;
        return;
      }
      this.$nextTick(() => {
        this.delayedDragging = false;
      });
    }
  }
};
</script>

<style>
.list-group {
  min-height: 20px;
}
.list-group-item {
  cursor: move;
}
</style>
