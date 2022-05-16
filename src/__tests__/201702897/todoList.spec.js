import TodoItem from '../../vo/TodoItem';
import TodoList from "../../vo/TodoList";
let todo_item1, todo_item2, todo_item3, todo_item4, todo_item5
let todo_list

beforeEach(() => {
  todo_item1 = new TodoItem(1, "할 일1", new Date());
  todo_item2 = new TodoItem(2, "할 일2", new Date());
  todo_item3 = new TodoItem(3, "할 일3", new Date());
  todo_item4 = new TodoItem(4, "할 일4", new Date());
  todo_item5 = new TodoItem(5, "할 일5", new Date());
  let lists = [todo_item1, todo_item2, todo_item3, todo_item4, todo_item5];
  todo_list = new TodoList(lists, new Date());
})

describe("할 일 목록을 가지고 있다.", () => {
  test("5개를 만들면, 5개가 있다.", () => {
    expect(todo_list.items).toHaveLength(5);
  });
});

describe("할 일 목록에서 삭제를 할 수 있다.", () => {
  test("5개의 할 일이 있는데, id가 3인 할 일을 삭제할 수 있다.", () => {
    todo_list.removeTodoItem(3);
    expect(todo_list.items).toHaveLength(4);
    expect(todo_list.items.some((todo_item) => 
      todo_item.id === 3
    )).toBeFalsy();
  });
});

describe("할 일 목록에서 할 일을 추가할 수 있다.", () => {
  test("5개의 할 일이 있는데, id가 3인 할 일을 삭제할 수 있다.", () => {
    const todo_item6= new TodoItem(6, "할 일1", new Date());
    todo_list.pushTodoItem(todo_item6);
    expect(todo_list.items).toHaveLength(6);
    expect(todo_list.items.some((todo_item) => 
      todo_item.id === 6
    )).toBeTruthy();
  });
});

describe("생성한 할 일들 중에서 오늘 할 일, 지난 할 일 구분하기", () => {
  test("5개의 할 일이 있는데, 2번 빼고 오늘 할 일이다.", () => {
    jest.spyOn(todo_item2, "equalsDayOfCreatedAt").mockImplementation(() => false);

    expect(todo_list.equalsDayItems).toHaveLength(4);
    expect(todo_list.equalsDayItems.some((todo_item) => todo_item.id === 2)).toBeFalsy();
  });
  test("5개의 할 일이 있는데, id 2만 지난 일이다.", () => {
    jest.spyOn(todo_item2, "equalsDayOfCreatedAt").mockImplementation(() => false);

    expect(todo_list.notEqualsDayItems).toHaveLength(1);
    expect(todo_list.notEqualsDayItems.some((todo_item) => todo_item.id === 2)).toBeTruthy();
  });
});

describe("오늘 할 일 중 완료/미완료 구분하기", () => {
  test("5개의 할 일이 있는데, 2번 3만 완료이다.", () => {
    jest.spyOn(todo_item2, "completed", "get").mockImplementation(() => true);
    jest.spyOn(todo_item3, "completed", "get").mockImplementation(() => true);
    expect(todo_list.equalsDayAndCompletedItems.some((todo_item) => todo_item.id === 2)).toBeTruthy();
    expect(todo_list.equalsDayAndCompletedItems.some((todo_item) => todo_item.id === 3)).toBeTruthy();
  });

  test("5개의 할 일이 있는데, 2번 4번만 미완료이다.", () => {
    jest.spyOn(todo_item1, "completed", "get").mockImplementation(() => true);
    jest.spyOn(todo_item3, "completed", "get").mockImplementation(() => true);
    jest.spyOn(todo_item5, "completed", "get").mockImplementation(() => true);
    expect(todo_list.equalsDayAndNotCompletedItems).toHaveLength(2);
    expect(todo_list.equalsDayAndNotCompletedItems.some((todo_item) => todo_item.id === 2)).toBeTruthy();
    expect(todo_list.equalsDayAndNotCompletedItems.some((todo_item) => todo_item.id === 4)).toBeTruthy();
  });
});

describe("지난 할 일 중 완료/미완료 구분하기", () => {
  test("5개의 할 일이 있는데, 2번, 3번만 완료다", () => {
    jest.spyOn(todo_item1,"equalsDayOfCreatedAt").mockImplementation(() => false);
    jest.spyOn(todo_item2,"equalsDayOfCreatedAt").mockImplementation(() => false);
    jest.spyOn(todo_item3,"equalsDayOfCreatedAt").mockImplementation(() => false);
    jest.spyOn(todo_item4,"equalsDayOfCreatedAt").mockImplementation(() => false);
    jest.spyOn(todo_item5,"equalsDayOfCreatedAt").mockImplementation(() => false);
    jest.spyOn(todo_item2,"completed","get").mockReturnValue(() => true);
    jest.spyOn(todo_item3,"completed","get").mockReturnValue(() => true);

    expect(todo_list.notEqualsDayAndCompletedItems).toHaveLength(2);
  });
  test("5개의 지난 할 일이 있는데, 2번, 4번만 미완료이다.", () => {
    jest.spyOn(todo_item1,"equalsDayOfCreatedAt").mockImplementation(() => false);
    jest.spyOn(todo_item2,"equalsDayOfCreatedAt").mockImplementation(() => false);
    jest.spyOn(todo_item3,"equalsDayOfCreatedAt").mockImplementation(() => false);
    jest.spyOn(todo_item4,"equalsDayOfCreatedAt").mockImplementation(() => false);
    jest.spyOn(todo_item5,"equalsDayOfCreatedAt").mockImplementation(() => false);
    jest.spyOn(todo_item1,"completed","get").mockReturnValue(() => true);
    jest.spyOn(todo_item3,"completed","get").mockReturnValue(() => true);
    jest.spyOn(todo_item5,"completed","get").mockReturnValue(() => true);

    expect(todo_list.notEqualsDayAndNotCompletedItems).toHaveLength(2);
  });
})