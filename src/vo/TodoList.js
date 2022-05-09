import { makeObservable, observable } from "mobx";
import todoItem from "./TodoItem";

class TodoList {
  /*
    items: TodoItem[] (할 일 리스트)
    date: Date (오늘 날짜)
  */
  _items = [];
  _date = "";

  constructor(array, date) {
    makeObservable(this, {
      _items: observable,
    });
    this._items = array;
    this._date = date;
  }
  removeTodoItem = (id) => {
    const targetTodoItemIndex = this._items.findIndex(
        (todo) => todo.id === id
    );
    if (targetTodoItemIndex === -1) return;
    this._items.splice(targetTodoItemIndex, 1);
  };

  pushTodoItem = (item) => {
    this.items.push(item);
  }
  _equalsDayFilter = (todoItem) => todoItem.equalsDayOfCreatedAt(this._date);
  get equalsDayItems() {
    return this._items.filter(this._equalsDayFilter);
  }
 _notequalsDayFilter = (todoItem) => !todoItem.equalsDayOfCreatedAt(this._date);
  get notequalsDayItems() {
    return this._items.filter(this._notequalsDayFilter)
  }
_completedFilter = (todoItem) => todoItem.completed;
  get equalsDayAndCompletedItems() {
    return this.equalsDayItems.filter(this._completedFilter);
  }
  _notCompletedFilter = (todoItem) => !todoItem.completed;
  get notEqualsDayAndCompletedItems() {
    return this.notequalsDayItems.filter(this._completedFilter);
  }

  get equalsDayAndNotCompletedItems() {
    return this.equalsDayItems.filter(this._notCompletedFilter);
  }
  get notEqualsDayAndNotCompletedItems() {
    return this.notequalsDayItems.filter(this._notCompletedFilter);
  }
  get items() {
    return this._items;
  }
}

export default TodoList;
