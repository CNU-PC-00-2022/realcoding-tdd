import TodoItem from "../vo/TodoItem";
import TodoList from "../vo/TodoList";

let todoItem1, todoItem2, todoItem3, todoItem4, todoItem5;
let todoList;

// 테스트 용 리스트 생성
beforeEach(() => {
    todoItem1 = new TodoItem(1, '할 일 1', new Date());
    todoItem2 = new TodoItem(2, '할 일 2', new Date());
    todoItem3 = new TodoItem(3, '할 일 3', new Date());
    todoItem4 = new TodoItem(4, '할 일 4', new Date());
    todoItem5 = new TodoItem(5, '할 일 5', new Date());
    const todoItemList = [todoItem1, todoItem2, todoItem3, todoItem4, todoItem5]
    todoList = new TodoList(todoItemList, new Date());
});

describe("할 일 목록을 가지고 있다.", () => {
    test("5개를 만들면, 5개가 있다.", () => {
        expect(todoList.items).toHaveLength(5);
    });
});

describe("할 일 목록에서 삭제를 할 수 있다.", () => {
    test("5개의 할 일이 있는데, id가 3인 할 일을 삭제할 수 있다.", () => {
        todoList.removeTodoItem(3);
        expect(todoList.items).toHaveLength(4);
        expect(todoList.items.some((todoItem) => todoItem.id === 3)).toBeFalsy;
    });

    test("존재하지 않는 id를 입력하면 삭제하지 않는다.", () => {
        todoList.removeTodoItem(10); // 존재하지 않는 id
        expect(todoList.items).toHaveLength(5);
    });
});

describe("할 일 목록에서 할 일을 추가할 수 있다.", () => {
    test("5개의 할 일이 있을 때, id가 6인 할 일을 추가할 수 있다.", () => {
        const todoItem6 = new TodoItem(6, '할 일 6', new Date());

        todoList.pushTodoItem(todoItem6);

        expect(todoList.items).toHaveLength(6);
        expect(todoList.items.some((todoItem) => todoItem.id === 6)).toBeTruthy;
    });
});

describe("생성한 할 일들 중에서 오늘 할 일, 지난 할 일 구분하기", () => {
    test("5개의 할 일이 있는데, 2번 빼고 오늘 만들 일이다.", () => {
        // todoItem2 : equalsDayOfCreatedAt 메서드가 false 를 return 하게됨
        // equalsDayItems의 filter에서 equalsDayOfCreatedAt 메서드를 사용하는 것을 알고 있다면
        // 아래와 같이 코드를 작성해 수정해줄 수 있다.
        jest.spyOn(todoItem2, "equalsDayOfCreatedAt").mockImplementation(() => false);

        expect(todoList.equalsDayItems).toHaveLength(4);
        expect(todoList.equalsDayItems.some((todoItem) => todoItem.id === 2)).toBeFalsy;
    });
    test("5개의 할 일이 있는데, id 2번만 지난 할 일이다.", () => {
        jest.spyOn(todoItem2, "equalsDayOfCreatedAt").mockImplementation(() => false);

        expect(todoList.notEqualsDayItems).toHaveLength(1);
        expect(todoList.notEqualsDayItems.some((todoItem) => todoItem.id === 2)).toBeTruthy;
    });
});

describe("오늘 할 일 중 완료/미완료 구분하기", () => {
    test("5개의 할 일이 있는데, 2번, 3번만 완료다.", () => {
        jest.spyOn(todoItem2, "completed", "get").mockReturnValue(true);
        jest.spyOn(todoItem3, "completed", "get").mockReturnValue(true);
        expect(todoList.equalsDayAndCompletedItems).toHaveLength(2);
        expect(todoList.equalsDayAndCompletedItems.some((todoItem) => todoItem.id === 2)).toBeTruthy;
        expect(todoList.equalsDayAndCompletedItems.some((todoItem) => todoItem.id === 3)).toBeTruthy;
    });
    test("5개의 할 일이 있는데, 4번만 미완료다", () => {
        jest.spyOn(todoItem1, "completed", "get").mockReturnValue(true);
        jest.spyOn(todoItem2, "completed", "get").mockReturnValue(true);
        jest.spyOn(todoItem3, "completed", "get").mockReturnValue(true);
        jest.spyOn(todoItem5, "completed", "get").mockReturnValue(true);
        expect(todoList.equalsDayAndNotCompletedItems).toHaveLength(1);
        expect(todoList.equalsDayAndNotCompletedItems.some((todoItem) => todoItem.id === 4)).toBeTruthy;
    });
});

// todo

describe("지난 할 일 중 완료/미완료 구분하기", () => {
    test("5개의 지난 할 일이 있는데, 2번, 3번만 완료다.", () => {
        // 지난 할 일
        jest.spyOn(todoItem1, "equalsDayOfCreatedAt").mockImplementation(() => false);
        jest.spyOn(todoItem2, "equalsDayOfCreatedAt").mockImplementation(() => false);
        jest.spyOn(todoItem3, "equalsDayOfCreatedAt").mockImplementation(() => false);
        jest.spyOn(todoItem4, "equalsDayOfCreatedAt").mockImplementation(() => false);
        jest.spyOn(todoItem5, "equalsDayOfCreatedAt").mockImplementation(() => false);

        // 완료
        // 2, 3 번만 완료로.
        jest.spyOn(todoItem2, "completed", "get").mockReturnValue(true);
        jest.spyOn(todoItem3, "completed", "get").mockReturnValue(true);

        expect(todoList.notEqualsDayAndCompletedItems).toHaveLength(2);
        expect(todoList.notEqualsDayAndCompletedItems.some((todoItem) => todoItem.id === 2)).toBeTruthy;
        expect(todoList.notEqualsDayAndCompletedItems.some((todoItem) => todoItem.id === 3)).toBeTruthy;
    });
    test("5개의 지난 할 일이 있는데, 2번, 4번만 미완료다", () => {
        // 지난 할 일
        jest.spyOn(todoItem1, "equalsDayOfCreatedAt").mockImplementation(() => false);
        jest.spyOn(todoItem2, "equalsDayOfCreatedAt").mockImplementation(() => false);
        jest.spyOn(todoItem3, "equalsDayOfCreatedAt").mockImplementation(() => false);
        jest.spyOn(todoItem4, "equalsDayOfCreatedAt").mockImplementation(() => false);
        jest.spyOn(todoItem5, "equalsDayOfCreatedAt").mockImplementation(() => false);

        // 완료
        // 2, 4 번 빼고 나머지를 완료로.
        jest.spyOn(todoItem1, "completed", "get").mockReturnValue(true);
        jest.spyOn(todoItem3, "completed", "get").mockReturnValue(true);
        jest.spyOn(todoItem5, "completed", "get").mockReturnValue(true);
        expect(todoList.notEqualsDayAndNotCompletedItems).toHaveLength(2);
        expect(todoList.notEqualsDayAndNotCompletedItems.some((todoItem) => todoItem.id === 2)).toBeTruthy;
        expect(todoList.notEqualsDayAndNotCompletedItems.some((todoItem) => todoItem.id === 4)).toBeTruthy;
    });
});