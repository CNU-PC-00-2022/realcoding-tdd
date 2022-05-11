import TodoItem from "../vo/TodoItem";
import TodoList from "../vo/TodoList";
let item1, item2, item3, item4, item5;
let list;

beforeEach(() => {
  item1 = new TodoItem(1, "1", new Date());
  item2 = new TodoItem(2, "2", new Date());
  item3 = new TodoItem(3, "3", new Date());
  item4 = new TodoItem(4, "4", new Date());
  item5 = new TodoItem(5, "5", new Date());

  list = new TodoList([item1, item2, item3, item4, item5]);
});

describe("할 일 목록을 가지고 있따.", () => {
  test("make 5, has 5", () => {
    expect(list.itemSize()).toEqual(5);
  });
});

describe("할 일 삭제할 수 잉ㅆ다..", () => {
  test("5 todo, can delete id 3", () => {
    list.removeTodoItem(3);
    expect(list.itemSize()).toEqual(4);
    expect(list._items.some((todoItem) => todoItem.id === 3)).toBeFalsy();
  });
});

describe("할 일 추가할 수 잉ㅆ다..", () => {
  test("5 todo, can add id 6", () => {
    const item6 = new TodoItem(6, "6");

    list.pushTodoItem(item6);

    expect(list.itemSize()).toEqual(6);
    expect(list._items.some((todoItem) => todoItem.id === 6)).toBeTruthy();
  });
});

describe("생성된 할 일 중 오늘 할 일,지난 할 일 구분하기", () => {
  test("5 todo, all made today", () => {
    expect(list.equalsDayItems()).toHaveLength(5);
    expect(
      list.equalsDayItems().some((todoItem) => todoItem.id === 2)
    ).toBeTruthy();
  });
  test("5 todo, 2 is not today", () => {
    jest.spyOn(item2, "equalsDayOfCreatedAt").mockImplementation(() => false);

    expect(list.notEqualsDayItems()).toHaveLength(1);
    expect(
      list.notEqualsDayItems().some((todoItem) => todoItem.id === 2)
    ).toBeTruthy();
  });
});

describe("오늘 할 일 중 완료/미완료 구분하기", () => {
  test("5 todo, 2 and 3 is completed", () => {
    jest.spyOn(item2, "completed", "get").mockReturnValue(true);
    jest.spyOn(item4, "completed", "get").mockReturnValue(true);
    expect(list.equalsDayAndCompletedItems()).toHaveLength(2);
  });
  test("5 todo, 2 and 4 is not completed", () => {
    jest.spyOn(item1, "completed", "get").mockReturnValue(true);
    jest.spyOn(item3, "completed", "get").mockReturnValue(true);
    jest.spyOn(item5, "completed", "get").mockReturnValue(true);
    expect(list.equalsDayAndunCompletedItems()).toHaveLength(2);
  });
});

describe("지난 할 일 중 완료/미완료 구분하기", () => {
  test("5 gone todo, 2 and 3 is completed", () => {
    jest.spyOn(item2, "completed", "get").mockReturnValue(true);
    jest.spyOn(item4, "completed", "get").mockReturnValue(true);
    expect(list.equalsDayAndCompletedItems()).toHaveLength(2);
  });
  test("5 gone todo, 2 and 4 is not completed", () => {
    jest.spyOn(item1, "completed", "get").mockReturnValue(true);
    jest.spyOn(item3, "completed", "get").mockReturnValue(true);
    jest.spyOn(item5, "completed", "get").mockReturnValue(true);
    expect(list.equalsDayAndunCompletedItems()).toHaveLength(2);
  });
});
