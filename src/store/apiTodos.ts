import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { TodoType } from '../helpers/types';
import { apiTodo } from '../api/apiTodos';

type ApiTodoStoreType = {
    isLoading: boolean;
    loadingTitle: 'getTodo' | 'addTodo' | 'editTodo' | 'deleteTodo' | '';
    apiTodos: TodoType[];
    apiDoneTodos: TodoType[];
    getApiTodos: () => void;
    addApiTodo: (todo: TodoType) => void;
    deleteApiTodo: (id: string | number) => void;
    deleteApiDoneTodo: (id: string | number) => void;
    editApiTodo: (todo: TodoType, setNewTodos?: () => void) => void;
    completeApiTodo: (id: string | number, completed: boolean) => void;
    clearStore: () => void;
}

export const useApiTodoStore = create<ApiTodoStoreType, [["zustand/persist", unknown]]>(
    persist(
        (set, get) => ({
            isLoading: false,
            loadingTitle: '',
            apiTodos: [],
            apiDoneTodos: [],
            getApiTodos: () => {
                const todo: TodoType[] = [];
                const doneTodo: TodoType[] = [];
                set({ isLoading: true, loadingTitle: 'getTodo' });
                apiTodo.getTodos()
                .then(res => res.forEach(el => el.completed ? doneTodo.push(el) : todo.push(el)))
                .catch(console.error)
                .finally(() => setTimeout(() => set({
                    isLoading: false,
                    loadingTitle: '',
                    apiTodos: todo,
                    apiDoneTodos: doneTodo,
                }), 500))
            },
            addApiTodo: (todo) => {
                set({ isLoading: true, loadingTitle: 'addTodo' });
                apiTodo.addTodo(todo)
                .then(res => {
                    const old_todos = get().apiTodos;
                    set({ apiTodos: [res, ...old_todos] });
                })
                .catch(console.error)
                .finally(() => set({isLoading: false, loadingTitle: ''}));
            },
            deleteApiTodo: (id) => {
                set({ isLoading: true, loadingTitle: 'deleteTodo' });
                apiTodo.deleteTodo(id)
                .then(() => {
                    const new_todos = get().apiTodos.filter(el => el.id !== id);
                    set({ apiTodos: new_todos });
                })
                .catch(console.error)
                .finally(() => set({isLoading: false, loadingTitle: ''}))
            },
            deleteApiDoneTodo: (id) => {
                set({ isLoading: true, loadingTitle: 'deleteTodo' });
                apiTodo.deleteTodo(id)
                .then(() => {
                    const new_todos = get().apiDoneTodos.filter(el => el.id !== id);
                    set({ apiDoneTodos: new_todos });
                })
                .catch(console.error)
                .finally(() => set({isLoading: false, loadingTitle: ''}))
            },
            editApiTodo: (todo, setNewTodos) => {
                set({ isLoading: true, loadingTitle: 'editTodo' });
                apiTodo.editTodo(todo)
                .then(res => {
                    const {apiTodos} = get();
                    const new_todos = apiTodos.map(el => el.id !== res.id ? el : res);
                    set({ apiTodos: new_todos });
                })
                .catch(console.error)
                .finally(() => {
                    set({isLoading: false, loadingTitle: ''});
                    setNewTodos && setNewTodos();
                });
            },
            completeApiTodo: (id, completed) => {
                const {apiTodos, apiDoneTodos, editApiTodo} = get();
                let new_todos: TodoType[] = [];
                let new_todosDone: TodoType[] = [];
                let new_todo: TodoType = {
                    completed: false,
                    id: '',
                    title: '',
                };
                if (completed) {
                    apiDoneTodos.forEach(el => {
                        if (el.id !== id) {
                            new_todosDone.push(el);
                        } else {
                            new_todo = {...el, completed: false};
                            new_todos = [...apiTodos, new_todo]
                        }
                     })
                } else {
                    apiTodos.forEach(el => {
                        if (el.id !== id) {
                            new_todos.push(el);
                        } else {
                            new_todo = {...el, completed: true};
                            new_todosDone = [new_todo, ...apiDoneTodos]
                        }
                     });
                }
                const setNewTodos = () => set({ apiTodos: new_todos, apiDoneTodos: new_todosDone });
                editApiTodo(new_todo, setNewTodos);
            },
            clearStore: () => set({
                isLoading: false,
                loadingTitle: '',
                apiTodos: [],
                apiDoneTodos: [],
            }),
        }),
        {  
            name: 'apiTodo',
            storage: createJSONStorage(() => localStorage)
        }
    ));