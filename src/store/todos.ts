import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type TodoType = {
    id: string;
    title: string;
    completed: boolean;
}

type TodoStoreType = {
    todos: TodoType[];
    doneTodo: TodoType[];
    addTodo: (todo: TodoType) => void;
    deleteTodo: (id: string) => void;
    deleteDoneTodo: (id: string) => void;
    editTodo: (todo: TodoType) => void;
    completeTodo: (id: string, completed: boolean) => void;
}

export const useTodoStore = create<TodoStoreType, [["zustand/persist", unknown]]>(
    persist(
        (set, get) => ({
            todos: [],
            doneTodo: [],
            addTodo: (todo) => {
                const old_todos = get().todos;
                set({ todos: [todo, ...old_todos] });
            },
            deleteTodo: (id) => {
                const new_todos = get().todos.filter(el => el.id !== id);
                set({ todos: new_todos });
            },
            deleteDoneTodo: (id) => {
                const new_todos = get().doneTodo.filter(el => el.id !== id);
                set({ doneTodo: new_todos });
            },
            editTodo: (todo) => {
                const new_todos = get().todos.map(el => el.id !== todo.id ? el : todo);
                set({todos: new_todos});
            },
            completeTodo: (id, completed) => {
                const {todos, doneTodo} = get();
                let new_todos: TodoType[] = [];
                let new_todosDone: TodoType[] = [];
                completed
                    ? doneTodo.forEach(el => el.id !== id ? new_todosDone.push(el) : (new_todos = [...todos, {...el, completed: false}]))
                    : todos.forEach(el => el.id !== id ? new_todos.push(el) : (new_todosDone = [{...el, completed: true}, ...doneTodo]));
                set({
                    todos: new_todos,
                    doneTodo: new_todosDone,
                });
            },
        }),
        {  
            name: 'todo',
            storage: createJSONStorage(() => localStorage)
        }
    ));