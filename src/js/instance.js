import { createApp } from 'vue';

const Todolist = {
  template: '<h1 v-text="title"></h1><todo-item v-for="item in groceryList" :todo="item" :key="item.id" @removeItem="removeTodoItem(item.id)"></todo-item>',
  data() {
    return {
      title: 'Todolist',
      groceryList: [
        { id: 0, text: 'Vegetables' },
        { id: 1, text: 'Cheese' },
        { id: 2, text: 'Whatever else humans are supposed to eat' }
      ]
    };
  },
  methods: {
    removeTodoItem(id) {
      const removingTodoItemIndex = this.groceryList.findIndex(item => item.id === id);

      this.groceryList.splice(removingTodoItemIndex, 1);
    }
  },
  updated() {
    console.log('Updated Todolist:', Object.assign([], this.groceryList).map(item => Object.assign({}, item)));
  }
};

const app = createApp(Todolist);

const TodoItem = {
  props: ['todo'],
  template: '<li>{{ todo.text }}<button @click="removeSelf">Remove me</button></li>',
  methods: {
    removeSelf() {
      this.$emit('removeItem');
    }
  },
  unmounted() {
    console.log('Unmounted TodoItem with id', this.todo.id);
  }
};

app.component('todo-item', TodoItem);

app.mount('#app');