import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { TodoType } from '../helpers/types';

type TodoStoreType = {
    todos: TodoType[];
    doneTodos: TodoType[];
    addTodo: (todo: TodoType) => void;
    deleteTodo: (id: string | number) => void;
    deleteDoneTodo: (id: string | number) => void;
    editTodo: (todo: TodoType) => void;
    completeTodo: (id: string | number, completed: boolean) => void;
}

export const useTodoStore = create<TodoStoreType, [["zustand/persist", unknown]]>(
    persist(
        (set, get) => ({
            todos: [],
            doneTodos: [],
            addTodo: (todo) => {
                const old_todos = get().todos;
                set({ todos: [todo, ...old_todos] });
            },
            deleteTodo: (id) => {
                const new_todos = get().todos.filter(el => el.id !== id);
                set({ todos: new_todos });
            },
            deleteDoneTodo: (id) => {
                const new_todos = get().doneTodos.filter(el => el.id !== id);
                set({ doneTodos: new_todos });
            },
            editTodo: (todo) => {
                const new_todos = get().todos.map(el => el.id !== todo.id ? el : todo);
                set({todos: new_todos});
            },
            completeTodo: (id, completed) => {
                const {todos, doneTodos} = get();
                let new_todos: TodoType[] = [];
                let new_todosDone: TodoType[] = [];
                completed
                    ? doneTodos.forEach(el => el.id !== id ? new_todosDone.push(el) : (new_todos = [...todos, {...el, completed: false}]))
                    : todos.forEach(el => el.id !== id ? new_todos.push(el) : (new_todosDone = [{...el, completed: true}, ...doneTodos]));
                set({
                    todos: new_todos,
                    doneTodos: new_todosDone,
                });
            },
        }),
        {  
            name: 'todo',
            storage: createJSONStorage(() => localStorage)
        }
    ));