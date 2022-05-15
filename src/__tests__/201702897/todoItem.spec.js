import TodoItem from "../../vo/TodoItem";

describe("할 일을 만들 수 있다.", () => {
  test("todo item 생성하기", () => {
    const todo_item = new TodoItem(1, "오늘은 술 먹는날");
    expect(todo_item.task).toEqual("오늘은 술 먹는날");
  });
});

describe("할 일을 업데이트 할 수 있다.", () => {
  test("todo item 업데이트하기", () => {
    const todo_item = new TodoItem(1, "오늘은 술 먹는날");
    todo_item.updateTask("오늘은 그냥 안마실래");
    expect(todo_item.task).toEqual("오늘은 그냥 안마실래");
  });
});

describe("할 일을 완료/미완료로 바꿀 수 있다.", () => {
  test("todo item 완료로 바꾸기", () => {
    const todo_item = new TodoItem(1, "오늘은 술 먹는날");
    todo_item.setComplete();
    expect(todo_item.completed).toBeTruthy();
  });

  test("todo item 미완료로 바꾸기", () => {
    const todo_item = new TodoItem(1, "오늘은 술 먹는날");
    todo_item.unsetcomplete();
    expect(todo_item.completed).toBeFalsy();
  });
});

describe("할 일에 날짜가 들어간다.", () => {
  test("todo item 오늘 만들었으면, isToday가 true이다.", () => {
    const source_date = new Date();
    const target_date = new Date();
    const todo_item = new TodoItem(1, "오늘은 술 먹는날", source_date);
    expect(todo_item.equalsDayOfCreatedAt(target_date)).toBeTruthy();
  });
  test("todo item 어제 만들었으면, isToday가 false이다.", () => {
    const source_date = new Date('2022-05-09T10:00:00');
    const target_date = new Date('2022-05-08T10:00:00');
    const todo_item = new TodoItem(1, "오늘은 술 먹는날", source_date);
    expect(todo_item.equalsDayOfCreatedAt(target_date)).toBeFalsy();
  });
});

describe("할 일을 완료로 생성할 수 있다.", () => {
  test("todo item 완료로 바꾸기", () => {
    const todo_item = new TodoItem(1, "오늘은 술 먹는날", new Date(), true);
    todo_item.setComplete();
    expect(todo_item.completed).toBeTruthy();
  });
});