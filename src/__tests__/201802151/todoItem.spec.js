import TodoItem from "../../vo/TodoItem";

describe("할 일을 만들 수 있다.", () => {
  test("todo item 생성", () => {
    const todoItem = new TodoItem(1, "오늘은 술 먹는 날");
    expect(todoItem.task).toEqual("오늘은 술 먹는 날");
  });
});

describe("할 일을 업데이트 할 수 있다.", () => {
  test("todo item 업데이트", () => {
    const todoItem = new TodoItem(1, "오늘은 술 먹는 날");
    todoItem.updateTask("오늘은 안 먹을래");
    expect(todoItem.task).toEqual("오늘은 안 먹을래");
  });
});

describe("할 일을 완료/미완료로 변경 할 수 있다.", () => {
  test("todo item 완료로 변경", () => {
    const todoItem = new TodoItem(1, "오늘은 술 먹는 날");
    todoItem.setComplete();
    expect(todoItem.completed).toBeTruthy();
  });

  test("todo item 미완료로 변경", () => {
    const todoItem = new TodoItem(1, "오늘은 술 먹는 날");
    todoItem.unsetComplete();
    expect(todoItem.completed).toBeFalsy();
  });
});

describe("할 일의 등록 날짜를 저장한다.", () => {
  test("todo item을 오늘 만들었으면 isToday가 true.", () => {
    const source = new Date();
    const target = new Date();
    const todoItem = new TodoItem(1, "오늘은 술 먹는 날", source);
    expect(todoItem.equalsDayOfCreatedAt(target)).toBeTruthy();
  });

  test("todo item을 어제 만들었으면 isToday가 false.", () => {
    const source = new Date("2022-05-08T00:00:00");
    const target = new Date("2022-05-09T00:00:00");
    const todoItem = new TodoItem(1, "오늘은 술 먹는 날", source);

    // jest.spyOn(Date, "now").mockImplementation(() => {
    //   return new Date("2022-05-09T00:00:00").getTime();
    // });

    expect(todoItem.equalsDayOfCreatedAt(target)).toBeFalsy();
  });
});

describe("할 일을 완료로 생성 할 수 있다.", () => {
  test("todo item 완료로 생성", () => {
    const todoItem = new TodoItem(1, "오늘은 술 먹는 날", new Date(), true);
    expect(todoItem.completed).toBeTruthy();
  });
});
