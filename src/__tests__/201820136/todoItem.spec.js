import TodoItem from "../../vo/TodoItem";

describe("할 일을 만들 수 있다.", () => {
  test("to do item 생성하기", () => {
    const todoItem = new TodoItem(1, '오늘은 술 먹는 날');
    expect(todoItem.task).toEqual('오늘은 술 먹는 날');
  });
});

describe("할 일을 업데이트할 수 있다.", () => {
  test("to do item 업데이트 하기", () => {
    const todoItem = new TodoItem(1, '오늘은 술 먹는 날');
    todoItem.updateTask('오늘은 안마실래');
    expect(todoItem.task).toEqual('오늘은 안마실래');
  });
});

describe("할 일을 완료 미완료로 바꿀 수 있다.", () => {
  test("todo item 완료로 바꾸기", () => {
      const todoItem = new TodoItem(1, "오늘은 술 먹는 날", new Date());
      todoItem.setComplete();
      expect(todoItem.completed).toBeTruthy();
    });
  test("to do item 미완료로 바꾸기", () => {
    const todoItem = new TodoItem(1, '오늘은 술 먹는 날');
    todoItem.unsetComplete();
    expect(todoItem.completed).toBeFalsy();
  });
});

describe("할 일을 완료로 생성할 수 있다.", () => {
  test("todo item 완료로 만들기", () => {
    const todoItem = new TodoItem(1, "오늘은 술 먹는 날", new Date(), true);
    expect(todoItem.completed).toBeTruthy();
  });
});

describe("할 일에 날짜가 들어간다.", () => {
  test("to do item이 오늘 만들었으면, isToday가 true다.", () => {
    const sourceDate = new Date();
    const targetDate = new Date();
    const todoItem = new TodoItem(1, '오늘은 술 먹는 날', sourceDate);
    expect(todoItem.equalsDayOfCreatedAt(targetDate)).toBeTruthy();
  });

  test("to do item이 어제 만들었으면, isToday가 false다.", () => {
    const sourceDate = new Date('2022-05-08T10:10:10');
    const targetDate = new Date('2022-05-09T10:10:10');
    const todoItem = new TodoItem(1, '오늘은 술 먹는 날', sourceDate);
    expect(todoItem.equalsDayOfCreatedAt(targetDate)).toBeFalsy();
  });
});



 
/*
jest.spyOn(Date, 'now').mockImplementation(() => {
  return new Date('2022-05-08T10:10:10').getTime();   
});
*/




