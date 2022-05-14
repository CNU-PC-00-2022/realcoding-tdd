import TodoItem from "../../vo/TodoItem";

describe("테스트 그룹", () => {
  test("테스트", () => {
    expect(0).toEqual(0);
  });
});

describe("할 일을 완료로 생성 할 수 있 다.", () => {
  test("todoItem 완료로 만들기.", () => {

    const todoItem = new TodoItem(1, "오늘은 술먹는 날",new Date(),true);
    expect(todoItem.completed).toBeTruthy();
  });
  test("todoItem 미완료로 만들기", () => {

    const todoItem = new TodoItem(1,"오늘은 등하는 날",new Date(),false);
    expect(todoItem.completed).toBeFalsy();
  });
});


describe("할 일에 날짜가 들어간다.", () => {
  test("todo item이 오늘 만들었으면, isToday가 true이다.", () => {
    const srcDate = new Date();
    const tgDate = new Date();

    const todoItem = new TodoItem(1, "오늘은 술먹는 날",srcDate);
    expect(todoItem.equalsDayOfCreatedAt(tgDate)).toBeTruthy();
  });
  test("todo item이 어제 만들었으면, istoday는 false이다.", () => {
    const srcDate = new Date("2022-05-08T10:00:00");
    const tgDate = new Date("2022-05-0T10:00:00");

    const todoItem = new TodoItem(1,"오늘은 등하는 날",srcDate);
    expect(todoItem.equalsDayOfCreatedAt(tgDate)).toBeFalsy();
  });
});
