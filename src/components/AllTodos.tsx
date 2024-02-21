import { useEffect, useState } from "react";
import { Button, ButtonGroup, Spinner } from "react-bootstrap";
import { useLocation } from "react-router";
import OneTodo from "./OneTodo";
import { TodoType } from "../helpers/types";
import { useApiTodoStore } from "../store/apiTodos";

type FilterType = 'new' | 'done' | 'all';

type AllTodosPropsType = {
    todos: TodoType[];
    doneTodo: TodoType[];
}

export default function AllTodos({todos, doneTodo}: AllTodosPropsType) {
    const [filter, setFilter] = useState<FilterType>('new');
    const [mapTodos, setMapTodos] = useState<TodoType[]>(todos);
    const {isLoading, loadingTitle} = useApiTodoStore(state => state);
    const isLoadingTitle = loadingTitle === 'addTodo' || loadingTitle === 'deleteTodo' || loadingTitle === 'editTodo';
    const location = useLocation();
    const isApiPage = location.pathname === '/apiTodos';
    const title = isApiPage ? "apiToDo's" : "toDo's";

    useEffect(() => {
        const new_todos = filteredTodos(filter);
        setMapTodos(new_todos);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filter, todos, doneTodo]);

    const filteredTodos = (filter: FilterType) => {
        switch(filter) {
            case 'new': return todos;
            case 'done': return doneTodo;
            default: return [...todos, ...doneTodo];
        }
    };

    return (
        <div className="d-flex flex-column justify-content-start all_todos_w border border_radius p-3 border-dark bg-light mb-3" style={{minHeight: 200}}>
            <div className="d-flex justify-content-between align-items-center my-1 p-1">
                <div className="d-flex align-items-center">
                    <h1>{filter} {title}</h1>
                    {isLoading && isLoadingTitle && <Spinner className="mx-2" as={'span'} style={{height: '1.5rem', width: '1.5rem'}}/>}
                </div>
                <ButtonGroup size='sm' vertical={false}>
                    <Button variant={'success'} onClick={()=>setFilter('new')} title="Новые" disabled={filter === 'new'}>New</Button>
                    <Button variant={'warning'} onClick={()=>setFilter('done')} title="Выполненные" disabled={filter === 'done'}>Done</Button>
                    <Button variant={'info'} onClick={()=>setFilter('all')} title="Все" disabled={filter === 'all'}>All</Button>
                </ButtonGroup>
            </div>
            <div className="overflow-auto">
                {mapTodos.length > 0
                    ? mapTodos.map(el => <OneTodo todo={el} key={`${el.id}/${el.title}/${el.userId}`} isApiPage={isApiPage} />)
                    : <h3 className="text-center mt-2">Список пуст</h3>}
            </div>
        </div>
    )
}