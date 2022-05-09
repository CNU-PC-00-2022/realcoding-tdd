import { makeObservable, observable } from "mobx";
import { ThemeConsumer } from "styled-components";

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
  
  removeTodoItem = (todoId) => {
    const targetTodoItemIndex = this._items.findIndex(
      (todo) => todo.id === todoId
    );
    if(targetTodoItemIndex === -1) return;
    this._items.splice(targetTodoItemIndex, 1);
  };

  pushTodoItem = (todoItem) => {
    this._items.push(todoItem);
  }
  _equalsDayFilter = (todoItem) => todoItem.equalsDayofCreadtedAt(this._date);

  get equalsDayItems () {
    return this._items.filter(this._equalsDayFilter);
  }
  _notEqualsDayFilter = (todoItem) => !todoItem.equalsDayofCreadtedAt(this._date);

  get notEqualsDayItems () {
    return this._items.filter(this._notEqualsDayFilter);
  }

  _completedFilter = (todoItem) => todoItem.completed;
  _NotcompletedFilter = (todoItem) => !todoItem.completed;

  get equalsDayAndCompletedItems() {
    return this.equalsDayItems.filter(this._completedFilter);
  }
  get equalsDayAndNotCompletedItems() {
    return this.equalsDayItems.filter(this._NotcompletedFilter);
  }

  get notEqualsDayAndCompletedItems() {
    return this.notEqualsDayItems.filter(this._completedFilter);
  }
  get notEqualsDayAndNotCompletedItems() {
    return this.notEqualsDayItems.filter(this._NotcompletedFilter);
  }
}


export default TodoList;
