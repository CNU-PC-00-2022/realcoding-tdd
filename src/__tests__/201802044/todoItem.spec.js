<<<<<<< HEAD
import TodoItem from "../../vo/201802044/TodoItem";
=======
import TodoItem from "../../vo/TodoItem";
>>>>>>> 72431bffd5a0d19e233a7a869a58574e333b6303

describe("할 일을 만들 수 있다.", () => {
  test("todo item 생성하기", () => {
    const todoItem = new TodoItem(1, "오늘은 술 먹는 날");
<<<<<<< HEAD

=======
    
>>>>>>> 72431bffd5a0d19e233a7a869a58574e333b6303
    expect(todoItem.task).toEqual("오늘은 술 먹는 날");
  });
});

describe("할 일을 업데이트 할 수 있다.", () => {
  test("todo item 업데이트 하기", () => {
    const todoItem = new TodoItem(1, "오늘은 술 먹는 날");
    todoItem.updateTask("오늘은 그냥 안마실래");
<<<<<<< HEAD

=======
    
>>>>>>> 72431bffd5a0d19e233a7a869a58574e333b6303
    expect(todoItem.task).toEqual("오늘은 그냥 안마실래");
  });
});

describe("할 일을 완료로 생성할 수 있다.", () => {
  test("todo item 완료로 만들기", () => {
    const todoItem = new TodoItem(1, "오늘은 술 먹는 날", new Date(), true);
<<<<<<< HEAD

=======
    
>>>>>>> 72431bffd5a0d19e233a7a869a58574e333b6303
    expect(todoItem.completed).toBeTruthy();
  });
  test("todo item 미완료로 바꾸기", () => {
    const todoItem = new TodoItem(1, "오늘은 술 먹는 날");
    todoItem.unsetComplete();
<<<<<<< HEAD

=======
    
>>>>>>> 72431bffd5a0d19e233a7a869a58574e333b6303
    expect(todoItem.completed).toBeFalsy();
  });
});

describe("할 일에 날짜가 들어간다.", () => {
  test("todo item이 오늘 만들었으면, isToday가 true이다.", () => {
    const sorceDate = new Date();
    const targetDate = new Date();
    const todoItem = new TodoItem(1, "오늘은 술 먹는 날", sorceDate);
<<<<<<< HEAD

    expect(todoItem.equalsDayOfCreatedAt(targetDate)).toBeTruthy();
  });
  test("todo item이 어제 만들었으면, isToday가 false이다.", () => {
    const sorceDate = new Date("2022-05-08T10:00:00");
    const targetDate = new Date("2022-05-09T10:00:00");
    const todoItem = new TodoItem(1, "오늘은 술 먹는 날", sorceDate);
    expect(todoItem.equalsDayOfCreatedAt(targetDate)).toBeFalsy();
  });
});
=======
        
    expect(todoItem.equalsDayOfCreatedAt(targetDate)).toBeTruthy();
  });
  test("todo item이 어제 만들었으면, isToday가 false이다.", () => {
    const sorceDate = new Date('2022-05-08T10:00:00');
    const targetDate = new Date('2022-05-09T10:00:00');
    const todoItem = new TodoItem(1, "오늘은 술 먹는 날", sorceDate);
    expect(todoItem.equalsDayOfCreatedAt(targetDate)).toBeFalsy();
  });
});
>>>>>>> 72431bffd5a0d19e233a7a869a58574e333b6303
