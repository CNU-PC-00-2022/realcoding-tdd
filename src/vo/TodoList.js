import { computed, makeObservable, observable } from "mobx";
import TodoItem from "./TodoItem";

class TodoList {
  /*
    items: TodoItem[] (할 일 리스트)
    date: Date (오늘 날짜)
  */
  _items = [];
  _date = "";
  completed = false;

  constructor(items, date, completed) {
    makeObservable(this, {
      _items: observable,
    });
    this._items = items;
    this._date = date;
    this._completed = completed;

  }

  get items() {
    return this._items;
  }

  equalsDayOfCreatedAt

  
  _equalsDayFilter = (TodoItem) => TodoItem.equalsDayOfCreatedAt(this._date); 
  _notequalsDayFilter = (TodoItem) => !TodoItem.equalsDayOfCreatedAt(this._date); 
  _completedFilter = (TodoItem) => TodoItem.completed; 
  _notcompletedFilter = (TodoItem) => !TodoItem.completed;
  
  

  get equalsDayItems() {
    return this._items.filter(this._equalsDayFilter);
  }
  get notequalsDayItems() {
    return this._items.filter(this._notequalsDayFilter);
  }

  get equalsDayAndCompletedItems() {
    return this.equalsDayItems.filter(this._completedFilter);
  }
  get equalsDayAndNotCompletedItems() {
    return this.equalsDayItems.filter(this._notcompletedFilter);
  }


  //notequalsDayAndCompletedItems
  //구현
  get notequalsDayAndCompletedItems() {
    return this.notequalsDayItems.filter(this._completedFilter);
  };
  get notequalsDayAndNotCompletedItems(){
    return this.notequalsDayItems.filter(this._notcompletedFilter);
  };


  removeTodoItem = (todoId) => {

    const targetTodoItemIndex = this._items.findIndex(
      (todo) => todo.id === todoId
    );
    if(targetTodoItemIndex === -1 ) return;
    this._items.splice(targetTodoItemIndex, 1);
  };
  
  pushTodoItem = (_todoItem) => {
    this._items.push(_todoItem);
  };

  equalsDayOfCreatedAt = (_date) => {
    return this.date === _date;
  };


}



export default TodoList;
