import TodoItem from "../../vo/TodoItem";

describe("할 일을 만들 수 있다.", () => {
  test("todo item 생성하기", () => {
    const todoitem = new TodoItem(1, '오늘은 술 먹는 날');
    expect(todoitem.task).toEqual('오늘은 술 먹는 날');
  });
});

describe("할 일을 업데이트할 수 있다.", () => {
  test("todo item 업데이트 하기", () => {
    const todoitem = new TodoItem(1, '오늘은 술 먹는 날');
    todoitem.updateTask('오늘은 그냥 안 마실래')
    expect(todoitem.task).toEqual('오늘은 그냥 안 마실래');
  });
});

describe("할 일을 완료/미완료로 바꿀 수 있다.", () => {
  test("todo item 완료로 바꾸기", () => {
    const todoitem = new TodoItem(1, '오늘은 술 먹는 날');
    todoitem.setComplete();
    expect(todoitem.completed).toBeTruthy();
  });
});

describe("할 일을 완료로 생성할 수 있다.", () => {
  test("todo item 완료로 만들기", () => {
    const todoitem = new TodoItem(1, '오늘은 술 먹는 날', new Date(), true);
    expect(todoitem.completed).toBeTruthy();
  });
});


describe("할 일을 완료/미완료로 바꿀 수 있다.", () => {
  test("todo item 미완료로 바꾸기", () => {
    const todoitem = new TodoItem(1, '오늘은 술 먹는날');
    todoitem.unsetComplete();
    expect(todoitem.completed).toBeFalsy();
  });
});

describe("할 일에 날짜가 들어간다.", () => {
  test("todo item이 오늘 만들었으면, isToday가 true이다.", () => {
    const sourceDate = new Date();
    const targetDate = new Date();

    const todoitem = new TodoItem(1, '오늘은 술 먹는 날', sourceDate);
    expect(todoitem.equalsDayOfCreatedAt(targetDate)).toBeTruthy();
  });
});

describe("할 일에 날짜가 들어간다.", () => {
  test("todo item이 어제 만들었으면, isToday가 false이다.", () => {
    const sourceDate = new Date('2022-05-08T10:00:00');
    const targetDate = new Date('2022-05-09T10:00:00');
    const todoitem = new TodoItem(1, '오늘은 술 먹는 날', sourceDate);
    expect(todoitem.equalsDayOfCreatedAt(targetDate)).toBeFalsy();
  });
});