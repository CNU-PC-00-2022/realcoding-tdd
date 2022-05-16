import TodoItem from "../../vo/TodoItem";

describe("할 일을 만들 수 있다.", () => {
  test("todo item 생성하기", () => {
    const todoItem = new TodoItem(1, "ㅇㅇ");
    expect(todoItem.task).toEqual("ㅇㅇ");
  });
});

describe("할 일을 업데이트 할 수 있다..", () => {
  test("todo item 업데이트 하기", () => {
    const todoItem = new TodoItem(1, "ㅇㅇ");
    todoItem.updateTask("dd");
    expect(todoItem.task).toEqual("dd");
  });
});

describe("할 일을 완료/미완료로 바꿀 수 있다.", () => {
  test("todo item 완료로 바꾸기", () => {
    const todoItem = new TodoItem(1, "ㅇㅇ");
    todoItem.setComplete();
    expect(todoItem.completed).toBeTruthy();
  });
  test("todo item 미완료로 바꾸기", () => {
    const todoItem = new TodoItem(1, "ㅇㅇ");
    todoItem.unsetComplete();
    expect(todoItem.completed).toBeFalsy();
  });
});

describe("할 일을 완료로 생성할 수 있다.", () => {
  test("todo item 완료로 만들기", () => {
    const todoItem = new TodoItem(1, "ㅇㅇ", new Date(), true);
    todoItem.setComplete();
    expect(todoItem.completed).toBeTruthy();
  });
});

describe("할 일에 날짜가 들어간다.", () => {
  test("todo item이 오늘 만들었으면, isToday가 true 이다", () => {
    const sourceDate = new Date();
    const targetDate = new Date();

    const todoItem = new TodoItem(1, "ㅇㅇ", sourceDate);
    expect(todoItem.equalsDayOfCreatedAt(targetDate)).toBeTruthy();
  });
  test("todo item이 어제 만들었으면, isToday가 false 이다", () => {
    const sourceDate = new Date('2022-05-08T10:00:00');
    const targetDate = new Date('2022-05-09T10:00:00');
    const todoItem = new TodoItem(1, "ㅇㅇ");
    expect(todoItem.equalsDayOfCreatedAt(targetDate)).toBeFalsy();
  });
});