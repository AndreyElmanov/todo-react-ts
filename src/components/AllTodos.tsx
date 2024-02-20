import { useEffect, useState } from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import OneTodo from "./OneTodo";
import { TodoType, useTodoStore } from "../store/todos"

type FilterType = 'new' | 'done' | 'all';

export default function AllTodos() {
    const [todos, doneTodo] = useTodoStore(state => [state.todos, state.doneTodo]);
    const [filter, setFilter] = useState<FilterType>('new');
    const [mapTodos, setMapTodos] = useState<TodoType[]>(todos);

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
        <div className="d-flex flex-column justify-content-start all_todos_w border p-3 border-dark bg-light mb-3" style={{minHeight: 200}}>
            <div className="d-flex justify-content-between align-items-center my-1 p-1">
                <h1>{filter} toDo's</h1>
                <ButtonGroup size='sm' vertical={false}>
                    <Button variant={'success'} onClick={()=>setFilter('new')} title="Новые" disabled={filter === 'new'}>New</Button>
                    <Button variant={'warning'} onClick={()=>setFilter('done')} title="Выполненные" disabled={filter === 'done'}>Done</Button>
                    <Button variant={'info'} onClick={()=>setFilter('all')} title="Все" disabled={filter === 'all'}>All</Button>
                </ButtonGroup>
            </div>
            <div className="overflow-auto">
                {mapTodos.length > 0
                    ? mapTodos.map(el => <OneTodo todo={el} key={el.id}/>)
                    : <h3 className="text-center mt-2">Список пуст</h3>}
            </div>
        </div>
    )
}