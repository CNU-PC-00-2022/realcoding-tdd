import { makeObservable, observable } from "mobx";

class TodoItem {
<<<<<<< HEAD
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

    constructor(id, task, createdAt, completed = false) {
        makeObservable(this, {
            _task: observable,
            _completed: observable,
        });
        this._id = id;
        this._task = task;
        this._createdAt = createdAt;
        this._completed = completed;
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

    // isToday => equalsDayOfCreatedAt(_targetDate)
    equalsDayOfCreatedAt = (_targetDate) => {
        const sDate = new Date(this._createdAt).setHours(0, 0, 0, 0);
        const dDate = new Date(_targetDate).setHours(0, 0, 0, 0)
        return sDate === dDate
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
=======
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

  constructor(id, task, createdAt, completed = false) {
    makeObservable(this, {
      _task: observable,
      _completed: observable,
    });
    this._id = id;
    this._task = task;
    this._createdAt = createdAt;
    this._completed = completed;
  }

  setComplete = () => {
    this._completed = true;
  }

  unsetComplete = () => {
    this._completed = false;
  }

  updateTask = (task) => {
    this._task = task;
  }

  equalsDayOfCreatedAt = (_targetDate) => {
    const sourceDate = new Date(this._createdAt).setHours(0, 0, 0, 0);
    const targetDate = new Date(_targetDate).setHours(0, 0, 0, 0);
    return sourceDate === targetDate;
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
>>>>>>> 64579208b0b189458d33687eba121fdab94d1932
}

export default TodoItem;
