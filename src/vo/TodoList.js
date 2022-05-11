import { makeObservable, observable } from "mobx";

class TodoList {
  /*
    items: TodoItem[] (할 일 리스트)
    date: Date (오늘 날짜)
  */
  _items = [];
  _date = "";

  constructor(items) {
    makeObservable(this, {
      _items: observable,
    });
    this._items = items;
  }
  itemSize = () => {
    return this._items.length;
  };
  removeTodoItem = (id) => {
    const target = this._items.findIndex((item) => item._id === id);
    if (target === -1) {
      return;
    }
    this._items.splice(target, 1);
  };

  pushTodoItem = (item) => {
    this._items.push(item);
  };

  _equalDayFilter = (item) => item.equalsDayOfCreatedAt(new Date());
  equalsDayItems = () => {
    return this._items.filter(this._equalDayFilter);
  };

  _nonEqualDayFilter = (item) => !item.equalsDayOfCreatedAt(new Date());

  notEqualsDayItems = () => {
    return this._items.filter(this._nonEqualDayFilter);
  };

  _completeFilter = (item) => item.completed;
  equalsDayAndCompletedItems = () => {
    return this.equalsDayItems().filter(this._completeFilter);
  };

  _unCompleteFilter = (item) => !item.completed;
  equalsDayAndunCompletedItems = () => {
    return this.equalsDayItems().filter(this._unCompleteFilter);
  };

  unEqualsDayAndCompletedItems = () => {
    return this.notEqualsDayItems().filter(this._completeFilter);
  };

  unEqualsDayAndunCompletedItems = () => {
    return this.notEqualsDayItems().filter(this._unCompleteFilter);
  };
}

export default TodoList;
