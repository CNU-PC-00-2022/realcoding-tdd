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


  removeTodoItem = (todoTd) => {
    const targetTodoItemIndex = this._items.findIndex(
        (todo) => todo.id === todoTd
    );
    if(targetTodoItemIndex === -1) return;
    this._items.splice(targetTodoItemIndex,1);
  }

  pushTodoItem = (todoItem) => {
    this._items.push(todoItem);
  }


  _equalsDayFilter = (todoItem) => todoItem.equalsDayOfCreatedAt(this._date)
  _notEqualsDayFilter = (todoItem) => !todoItem.equalsDayOfCreatedAt(this._date)

  _equalsCompletedFilter = (todoItem) => todoItem.completed;
  _notEqualsCompletedFilter = (todoItem) => !todoItem.completed;

  get equalsDayItems(){
    return this._items.filter(this._equalsDayFilter);
  }
  get notEqualsDayItems(){
    return this._items.filter(this._notEqualsDayFilter);
  }

  get equalsDayAndCompletedItems() {
    return this.equalsDayItems.filter(this._equalsCompletedFilter);
  }
  get notEqualsDayAndCompletedItems() {
    return this.notEqualsDayItems.filter(this._equalsCompletedFilter);
  }

  get equalsDayAndNotCompletedItems() {
    return this.equalsDayItems.filter(this._notEqualsCompletedFilter);
  }
  get notEqualsDayAndNotCompletedItems() {
    return this.notEqualsDayItems.filter(this._notEqualsCompletedFilter);
  }
  get items(){
    return this._items
  }
}

export default TodoList;
