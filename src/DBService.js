const fs = require('fs');

class Database {
  constructor(storage, storagePath) {
    this.storage = storage;
    this.storagePath = storagePath;
  }

  get allTasks() {
    return this.storage;
  }

  set allTasks(value) {
    this._storage = value;
  }

  getConcreteTask(id) {
    return this.storage.find((item) => item.id === id);
  }

  addTask(task) {
    task.id = Date.now();

    this.allTasks.push(task);

    fs.writeFile(this.storagePath, JSON.stringify(this.allTasks), (err) => {
      if (err) {
        console.error(err);
      }
    });

    return task;
  }

  deleteTask(id) {
    this.storage = this.storage.filter((item) => item.id !== id);

    fs.writeFile(this.storagePath, JSON.stringify(this.storage), (err) => {
      if (err) {
        console.error(err);
      }
    });
  }

  editTask(id, data) {
    this.allTasks = this.allTasks.map((item) => {
      if (item.id === id) {
        item.header = data.header;
        item.text = data.text;
      }
    });

    fs.writeFile(this.storagePath, JSON.stringify(this.allTasks), (err) => {
      if (err) {
        console.error(err);
      }
    });

    return this.getConcreteTask(id);
  }
}

module.exports = Database;
