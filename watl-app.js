new Vue({
  template: `
    <article>
      <div v-show="isNewTask" class="notification">{{ message }}</div>
      <fieldset>
        <legend>Your tasks ( {{ tasksDone + '/' + tasks.length }} )</legend>
        <input
          v-model="textTask"
          type="text"
          placeholder="Task goes here..."
          @keyup.enter="registerTask(textTask)"
        />
        <ul>
          <li
            v-for="todo in tasks"
          >
            <div class="task">
              <div class="checkbox">
                <input
                  type="checkbox"
                  value="1"
                  :id="todo.id"
                  v-model="todo.done"
                  class="offscreen"
                /><label :for="todo.id" class="switch"></label>
              </div>
              <span :class="['taskname', {'done': todo.done}]">{{ todo.text }}</span>&nbsp;
              <span
                class="delete"
                @click="deleteTask(todo.id)"
              >
                [🗑️]
              </span>
            </div>
          </li>
        </ul>
      </fieldset>
    </article>
  `,
  el: "#app",
  data: {
    isNewTask: false,
    textTask: '',
    tasks: [
      { id: 1, text: 'Learn moar Vue!', done: false },
      { id: 2, text: 'Find a good JS framework', done: true },
      { id: 3, text: 'Adopt a kitten', done: false }
    ],
    messages: [
      'My life for Aiur!',
      'Power overwhelming!',
      'Supercharged!',
      'Moar kittens!',
      'Prepped and ready!'
    ]
  },
  computed: {
    message () {
      return this.isNewTask
        ? this.messages[Math.floor(Math.random() * this.messages.length)]
        : ''
    },
    tasksDone () {
      return this.tasks.filter( task => task.done ).length
    }
  },
  methods: {
    registerTask (task) {
      this.tasks.push({
        id: this.tasks.length + 1,
        text: task,
        done: false
      })
      this.textTask = ''
      this.isNewTask = true
      setTimeout(() => { this.isNewTask = false }, 2000)
    },
    deleteTask (id) {
      this.tasks = this.tasks.filter((task) => task.id !== id)
    }
  }
});
