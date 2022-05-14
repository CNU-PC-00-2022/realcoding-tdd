import { makeObservable, observable } from "mobx";
import todoItem from "./TodoItem";

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

  removeTodoItem = (todoId) => {
    const targetTodoItemindex = this._items.findIndex(
        (todo) => todo.id === todoId
    );
    if (targetTodoItemindex === -1) return;
    this._items.splice(targetTodoItemindex, 1);
  }

  pushTodoItem = (todoItem) => {
    this._items.push(todoItem)
  }

  _equalsDayFilter = (todoItem) => todoItem.equalsDayOfCreatedAt(this._date);
  _notEqualsDayFilter = (todoItem) => !todoItem.equalsDayOfCreatedAt(this._date);
  _completedFilter = (todoItem) => todoItem.completed;
  _notCompletedFilter = (todoItem) => !todoItem.completed;

  get equalsDayItems() {
    return this._items.filter(this._equalsDayFilter);
  }

  get equalsDayAndCompletedItems() {
    return this.equalsDayItems.filter(this._completedFilter);
  }

  get equalsDayAndNotCompletedItems() {
    return this.equalsDayItems.filter(this._notCompletedFilter);
  }

  get notEqualsDayItems() {
    return this._items.filter(this._notEqualsDayFilter);
  }

  get notEqualsDayAndCompletedItems() {
    return this.notEqualsDayItems.filter(this._completedFilter);
  }

  get notEqualsDayAndNotCompletedItems() {
    return this.notEqualsDayItems.filter(this._notCompletedFilter);
  }

  get items() {
    return this._items;
  }
}

export default TodoList;