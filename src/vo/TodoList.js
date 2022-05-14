import { makeObservable, observable } from "mobx";

class TodoList {
<<<<<<< HEAD
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
        const targetTodoItemIndex = this._items.findIndex(
            (todo) => todo.id === todoId
        );
        if (targetTodoItemIndex === -1) return;
        this._items.splice(targetTodoItemIndex, 1);
    }

    pushTodoItem = (todoList) => {
        this.items.push(todoList);
    }

    get items() {
        return this._items;
    }

    // todoList 가 생성된 날짜와 item 들의 날짜가 같은 것들을 리턴해줌([])
    // 기존에 TodoItem.js 에서 구현해둔 equlasDayOfCreatedAt 함수를 활용
    _equalsDayFilter = (todoItem) => todoItem.equalsDayOfCreatedAt(this._date);

    get equalsDayItems() {
        return this._items.filter(this._equalsDayFilter);
    }

    _notEqualsDayFilter = (todoItem) => !todoItem.equalsDayOfCreatedAt(this._date);

    get notEqualsDayItems() {
        return this._items.filter(this._notEqualsDayFilter);
    }

    _completedFilter = (todoItem) => todoItem.completed;
    _notCompletedFilter = (todoItem) => !todoItem.completed;

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


=======
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
    if (targetTodoItemIndex === -1) return;
    this._items.splice(targetTodoItemIndex, 1);
  }

  pushTodoItem = (todoItem) => {
    this._items.push(todoItem);
  }

  _equalsDayFilter = (todoItem) => todoItem.equalsDayOfCreatedAt(this._date);
  _notEqualsDayFilter = (todoItem) => !todoItem.equalsDayOfCreatedAt(this._date);
  _completedFilter = (todoItem) => todoItem.completed;
  _notCompletedFilter = (todoItem) => !todoItem.completed;

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
>>>>>>> 64579208b0b189458d33687eba121fdab94d1932
}

export default TodoList;
