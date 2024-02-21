import axios, { AxiosError } from "axios";
import { TodoType } from "../helpers/types";

type GetTodosType = () => Promise<TodoType[]>;
type AddOrEditTodosType = (data: TodoType) => Promise<TodoType>;
type DeleteTodosType = (id: string | number) => Promise<unknown>;

const config = {
    base_url: 'https://jsonplaceholder.typicode.com/',
};

class ApiTodo {
    private api_root: string;

    constructor(props: typeof config) {
        this.api_root = props.base_url;
    }

    getTodos: GetTodosType = () =>
        new Promise((resolve, reject) => {
            axios.get<TodoType[]>(`${this.api_root}todos?_limit=20`)
            .then(res => resolve(res.data))
            .catch((e: AxiosError) => reject(e))
        });

    addTodo: AddOrEditTodosType = (data) =>
        new Promise((resolve, reject) => {
            axios.post<TodoType>(`${this.api_root}todos`, data)
            .then(res => resolve(res.data))
            .catch((e: AxiosError) => reject(e))
        });

    deleteTodo: DeleteTodosType = (id) =>
        new Promise((resolve, reject) => {
            axios.delete(`${this.api_root}todos/${id}`)
            .then(resolve)
            .catch((e: AxiosError) => reject(e))
        });

    editTodo: AddOrEditTodosType = (data) =>
        new Promise((resolve, reject) => {
            axios.put<TodoType>(`${this.api_root}todos/${data.id}`, data)
            .then(res => resolve(res.data))
            .catch((e: AxiosError) => reject(e))
        });
}

export const apiTodo = new ApiTodo(config);