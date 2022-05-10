import { makeObservable, observable } from "mobx";
import TodoItem from "./TodoItem";

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
        if (targetTodoItemIndex === -1) return;
        this._items.splice(targetTodoItemIndex, 1);
    }

    pushTodoItem = (todoList) => {
        this.items.push(todoList);
    }

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


}

export default TodoList;