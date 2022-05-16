import { makeObservable, observable } from "mobx";

class TodoItem {
  /*
    id: number (고유값)
    task: string (할 일)
    createdAt: Date (생성 된 날짜)
    completed: boolean (완료 여부)
  */
  _id = "";
  _task = "";
  _createdAt = "";
  _completed = false;

  constructor(id, task, createdAt, completed) {
    makeObservable(this, {
      _task: observable,
      _completed: observable,
    });
    this._id = id;
    this._task = task;
    this._createdAt = new Date(Date.now());
    this._completed = completed;
  }

  equalsDayOfCreatedAt = (_target_date) => {
    const source_date = new Date(this._createdAt).setHours(0,0,0,0);
    const target_date = new Date(_target_date).setHours(0,0,0,0);
    return source_date === target_date
  }

  updateTask = (task) => {
    this._task = task;
  }

  setComplete = () => {
    this._completed = true;
  }

  unsetComplete = () => {
    this._completed = false;
  }

  get id() {
    return this._id;
  }

  get task() {
    return this._task;
  }

  get completed() {
    return this._completed;
  }

  get createdAtGMTString() {
    const date = new Date(this._createdAt);
    date.setHours(date.getHours() + 9);
    return date.toISOString().replace("T", " ").substring(0, 19);
  }
}

export default TodoItem;
