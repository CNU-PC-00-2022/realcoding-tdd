import TodoItem from "../../vo/201802145/TodoItem";

describe("할 일 등록 가능", () => {
  test("todo item create", () => {
    const todoItem = new TodoItem(1, "1");
    expect(todoItem.task).toEqual("1");
  });
});
describe("할 일을 업데이트 할 수 있다.", () => {
  test("todo item update", () => {
    const todoItem = new TodoItem(1, "1");
    todoItem.updateTask("asdf");
    expect(todoItem.task).toEqual("asdf");
  });
});
describe("할 일을 완료 생성 가능.", () => {
  test("todo item completed create", () => {
    const todoItem = new TodoItem(1, "1", new Date(), true);
    expect(todoItem.completed).toBeTruthy();
  });
});
describe("할 일을 완료/미완료로 바꿀 수 있다.", () => {
  test("todo item change", () => {
    const todoItem = new TodoItem(1, "1");
    todoItem.setComplete();
    expect(todoItem.completed).toBeTruthy();
  });
  test("todo item change un", () => {
    const todoItem = new TodoItem(1, "1");
    todoItem.unSetComplete();
    expect(todoItem.completed).toBeFalsy();
  });
});

describe("할 일 날짜가 들어간다..", () => {
  test("todo item isToday ture", () => {
    const targetDate = new Date();
    const sourceDate = new Date();
    const todoItem = new TodoItem(1, "1", sourceDate);
    expect(todoItem.equalsDayOfCreatedAt(targetDate)).toBeTruthy();
  });
  test("todo item isYesterday false", () => {
    const targetDate = new Date();
    const sourceDate = new Date("2022-05-08T10:10:10");
    const todoItem = new TodoItem(1, "1", sourceDate);
    expect(todoItem.equalsDayOfCreatedAt(targetDate)).toBeFalsy();
  });
});
