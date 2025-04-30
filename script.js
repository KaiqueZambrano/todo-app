function todoApp() {
  return {
    taskList: JSON.parse(localStorage.getItem('taskList')) || [],
    newTask: {
      content: '',
      startTime: '',
      endTime: '',
      days: []
    },
    taskToEdit: { 
        id: null, 
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
    showAddModal: false,
    showEditModal: false,

    saveTasks() {
      localStorage.setItem('taskList', JSON.stringify(this.taskList));
    },

    toggleSelection(id) {
      const index = this.selectedTasks.indexOf(id);

      if (index >= 0) {
        this.selectedTasks.splice(index, 1);
      } else {
        this.selectedTasks.push(id);
      }
    },

    get sortedTaskList() {
      return this.taskList
        .slice()
        .sort((a, b) => (a.startTime || '').localeCompare(b.startTime || ''));
    },

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
        id: Date.now()
      });

      this.saveTasks();

      this.newTask = {
        content: '',
        startTime: '',
        endTime: '',
        days: []
      };

      this.showAddModal = false;
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
      this.saveTasks();
    },

    openEditModal(task) {
      this.taskToEdit = JSON.parse(JSON.stringify(task));
      this.showEditModal = true;
    },

    editTask() {
      if (this.taskToEdit.content.trim() === '') {
        alert('O conteúdo da tarefa não pode estar vazio.');
        return;
      }

      if (this.taskToEdit.days.length === 0) {
        alert('Você deve selecionar pelo menos um dia.');
        return;
      }

      if (this.taskToEdit.startTime > this.taskToEdit.endTime) {
        alert('O horário de início não pode ser maior que o horário de término.');
        return;
      }
      
      const index = this.taskList.findIndex(t => t.id === this.taskToEdit.id);
      if (index !== -1) {
        this.taskList[index] = JSON.parse(JSON.stringify(this.taskToEdit));
        this.saveTasks();
        this.showEditModal = false;
      }
    }
  };
}
