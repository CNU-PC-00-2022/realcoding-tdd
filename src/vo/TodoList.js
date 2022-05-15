import { makeObservable, observable } from "mobx";

class TodoList {
  /*
    items: TodoItem[] (할 일 리스트)
    date: Date (오늘 날짜)
  */
  _items = [];
  _date = "";

  constructor(items, date) {
    makeObservable(this, {
      _items: observable,
    });
    this._items = items;
    this._date = date;
  }

  get items() {
    return this._items;
  }

  removeTodoItem = (todo_id) => {
    const target = this._items.findIndex(
      (todo) => todo.id === todo_id
    )
    if (target === -1) return;
    this._items.splice(target, 1);
  }

  pushTodoItem = (item) => {
    this._items.push(item)
  }

  _equalsDayFilter = (todo_item) => todo_item.equalsDayOfCreatedAt(this._date);
  _notEqualsDayFilter = (todo_item) => !todo_item.equalsDayOfCreatedAt(this._date);
  _completedFilter = (todo_item) => todo_item.completed;
  _notCompletedFilter = (todo_item) => !todo_item.completed;

  get equalsDayItems() {
    return this._items.filter(this._equalsDayFilter);
  }
  
  get notEqualsDayItems() {
      return this._items.filter(this._notEqualsDayFilter);
  }

  get equalsDayAndCompletedItems() {
    return this.equalsDayItems.filter(this._completedFilter);
  }

  get equalsDayAndNotCompletedItems() {
      return this.equalsDayItems.filter(this._notCompletedFilter);
  }

  get notEqualsDayAndCompletedItems() {
      return this.notEqualsDayItems.filter(this._completedFilter);
  }

  get notEqualsDayAndNotCompletedItems() {
      return this.notEqualsDayItems.filter(this._notCompletedFilter);
  }
  }

export default TodoList;
