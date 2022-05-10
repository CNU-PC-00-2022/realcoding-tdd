import { makeObservable, observable } from "mobx";

class TodoList {
  /*
    items: TodoItem[] (할 일 리스트)
    date: Date (오늘 날짜)
  */
  _items = [];
  _date = "";

  constructor(items,date) {
    makeObservable(this, {
      _items: observable,
    });
    this._items = items
    this._date = date;
  }

  get items() {
    return this._items;
  }

  get equalsDayItems() {
    return this._items.filter((todoItem)=>todoItem.equalsDayOfCreatedAt(this._date))
  }

  get notEqualsDayItems() {
    return this._items.filter((todoItem)=>!todoItem.equalsDayOfCreatedAt(this._date))
  }

  get equalsDayAndCompletedItems() {
    return this.equalsDayItems.filter((item)=>item.completed);
  }
  get equalsDayAndNotCompletedItems() {
    return this.equalsDayItems.filter((item)=>!item.completed);
  }
  get notEqualsDayAndCompletedItems() {
    return this.notEqualsDayItems.filter((item)=>item.completed);
  }
  get notEqualsDayAndNotCompletedItems() {
    return this.notEqualsDayItems.filter((item)=>!item.completed);
  }


  removeTodoItem =(id)=>{
    const filteredArray = this._items.filter((value)=>value.id!==id);
    this._items = filteredArray;
  }

  pushTodoItem = (item) => {
    this._items.push(item);
  }
}

export default TodoList;
