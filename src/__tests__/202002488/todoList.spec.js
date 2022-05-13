import TodoItem from "../../vo/TodoItem";
import TodoList from "../../vo/TodoList";

let todoItem1, todoItem2, todoItem3, todoItem4, todoItem5;
let todoList;

beforeEach(() => {
  todoItem1 = new TodoItem(1, "할일1", new Date());
  todoItem2 = new TodoItem(2, "할일2", new Date());
  todoItem3 = new TodoItem(3, "할일3", new Date());
  todoItem4 = new TodoItem(4, "할일4", new Date());
  todoItem5 = new TodoItem(5, "할일5", new Date());
  todoList = new TodoList([todoItem1, todoItem2, todoItem3, todoItem4, todoItem5], new Date());
});


describe("할일 목록을 가지고 있다.", () => {
  test("다섯개를 만들면 다섯 개가 있다.", () => {
    expect(todoList.items).toHaveLength(5);
  });
});
describe("할 일 목록에서 삭제를 할 수 있다.", () => {
  test("다섯개의 할 일이 있는데 id가 3인 할 일을 삭제할 수 있다.", () => {
    todoList.removeToDoItem(3);
    //console.log(todoList._items);
    expect(todoList.items).toHaveLength(4);
    expect( todoList.items.some((todoItem) => todoItem.id === 3)).toBeFalsy();
  });
});

describe("할 일 목록에서 할일을 추가할 수 있다.", () => {
  test("다섯개의 할 일이 있는데 id가 6인 할 일을 추가할 수 있다.", () => {
    const todoItem6 = new TodoItem(6, "할일6", new Date());
    todoList.pushToDoItem(todoItem6);
    expect(todoList.items).toHaveLength(6);
    //console.log(todoList._items);
    expect(todoList.items.some((todoItem) => todoItem.id === 6)).toBeTruthy();
  });
});


describe("생성한 할 일들 중에서 오늘 할 일, 지난 할 일 구분하기", () => {
  test("5개의 할 일이 있는데, 2번 빼고 오늘 만든 일이다.", () => {
    jest.spyOn(todoItem2, "equalsDayofCreatedAt").mockImplementation(() => false);

    expect(todoList.equalsDayItems).toHaveLength(4);
    expect(todoList.equalsDayItems.some((todoItem) => todoItem.id === 2)).toBeFalsy();
    expect(todoList.notEqualsDayItems.some((todoItem) => todoItem.id === 2)).toBeTruthy();
  });

  test("5개의 할 일이 있는데, id 2번만 지난 할 일이다.", () => {
    jest.spyOn(todoItem2, "equalsDayofCreatedAt").mockImplementation(() => false);

    expect(todoList.notEqualsDayItems).toHaveLength(1);
    expect(todoList.equalsDayItems.some((todoItem) => todoItem.id === 2)).toBeFalsy();
    expect(todoList.notEqualsDayItems.some((todoItem) => todoItem.id === 2)).toBeTruthy();
  });
});

describe("지난 할 일 중 완료/미완료 구분하기.", () => {
  test("5개의 지난 할 일이 있는데, 2번, 3번만 완료다.", () => {
    //5 개의 지난일
    jest.spyOn(todoItem1, "equalsDayofCreatedAt").mockImplementation(() => false);
    jest.spyOn(todoItem2, "equalsDayofCreatedAt").mockImplementation(() => false);
    jest.spyOn(todoItem3, "equalsDayofCreatedAt").mockImplementation(() => false);
    jest.spyOn(todoItem4, "equalsDayofCreatedAt").mockImplementation(() => false);
    jest.spyOn(todoItem5, "equalsDayofCreatedAt").mockImplementation(() => false);
    //2,3 번 완료
    jest.spyOn(todoItem2, "completed", "get").mockImplementation(() => true);
    jest.spyOn(todoItem3, "completed", "get").mockImplementation(() => true);

    expect(todoList.notEqualsDayAndCompletedItems).toHaveLength(2);
    expect(todoList.equalsDayAndCompletedItems.some((todoItem) => todoItem.id === 2)).toBeFalsy();
    expect(todoList.equalsDayAndCompletedItems.some((todoItem) => todoItem.id === 3)).toBeFalsy();
    expect(todoList.notEqualsDayAndCompletedItems.some((todoItem) => todoItem.id === 2)).toBeTruthy();
    expect(todoList.notEqualsDayAndCompletedItems.some((todoItem) => todoItem.id === 3)).toBeTruthy();
  });

  test("5개의 지난 할 일이 있는데, 2번, 4번만 미완료다.", () => {
    //5 개의 지난일
    jest.spyOn(todoItem1, "equalsDayofCreatedAt").mockImplementation(() => false);
    jest.spyOn(todoItem2, "equalsDayofCreatedAt").mockImplementation(() => false);
    jest.spyOn(todoItem3, "equalsDayofCreatedAt").mockImplementation(() => false);
    jest.spyOn(todoItem4, "equalsDayofCreatedAt").mockImplementation(() => false);
    jest.spyOn(todoItem5, "equalsDayofCreatedAt").mockImplementation(() => false);
    //미완료가 디폴트니까 1, 3, 5번을 완료로 바꿨다.
    jest.spyOn(todoItem1, "completed", "get").mockImplementation(() => true);
    jest.spyOn(todoItem3, "completed", "get").mockImplementation(() => true);
    jest.spyOn(todoItem5, "completed", "get").mockImplementation(() => true);

    expect(todoList.notEqualsDayAndNotCompletedItems).toHaveLength(2);
    expect(todoList.equalsDayAndNotCompletedItems.some((todoItem) => todoItem.id === 2)).toBeFalsy();
    expect(todoList.equalsDayAndNotCompletedItems.some((todoItem) => todoItem.id === 4)).toBeFalsy();
    expect(todoList.notEqualsDayAndNotCompletedItems.some((todoItem) => todoItem.id === 2)).toBeTruthy();
    expect(todoList.notEqualsDayAndNotCompletedItems.some((todoItem) => todoItem.id === 4)).toBeTruthy();
  });
});