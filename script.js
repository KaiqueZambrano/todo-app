function todoApp() {
  return {
    taskList: [],
    newTask: {
      content: '',
      startTime: '',
      endTime: '',
      days: []
    },
    selectedTasks: [],
    filter: [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday'
    ][new Date().getDay()],
    showModal: false,

    addTask() {
      if (this.newTask.content.trim() === '') {
        alert('O conteúdo da tarefa não pode estar vazio.');
        return;
      }

      if (this.newTask.days.length === 0) {
        alert('Você deve selecionar pelo menos um dia.');
        return;
      }

      if (this.newTask.startTime > this.newTask.endTime) {
        alert('O horário de início não pode ser maior que o horário de término.');
        return;
      }

      this.taskList.push({
        ...this.newTask,
        id: Date.now(),
        done: false
      });

      this.newTask = {
        content: '',
        startTime: '',
        endTime: '',
        days: []
      };

      this.showModal = false;
    },

    removeTasks() {
      if (this.selectedTasks.length === 0) {
        alert('Clique em uma ou mais tarefas para selecioná-las.');
        return;
      }

      this.taskList = this.taskList.filter(
        task => !this.selectedTasks.includes(task.id)
      );

      this.selectedTasks = [];
    },

    toggleSelection(id) {
      const index = this.selectedTasks.indexOf(id);

      if (index >= 0) {
        this.selectedTasks.splice(index, 1);
      } else {
        this.selectedTasks.push(id);
      }
    }
  };
}
