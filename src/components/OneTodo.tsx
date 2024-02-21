import { useState } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import CreateInput from './CreateInput';
import { TodoType } from '../helpers/types';
import { useApiTodoStore } from '../store/apiTodos';
import { useTodoStore } from '../store/todos';

type OneTodoPropsType = {
    todo: TodoType;
    isApiPage: boolean;
}

export default function OneTodo({todo, isApiPage}: OneTodoPropsType) {
    const {completeTodo, deleteTodo, deleteDoneTodo} = useTodoStore(state => state);
    const {completeApiTodo, deleteApiTodo, deleteApiDoneTodo} = useApiTodoStore(state => state);
    const [isEditTodo, setIsEditTodo] = useState(false);
    const title = todo.title;
    const id = todo.id;
    const completed = todo.completed;

    const handleDeleteTodo = () => {
        if (isApiPage) {
            completed ? deleteApiDoneTodo(id) : deleteApiTodo(id);
        } else {
            completed ? deleteDoneTodo(id) : deleteTodo(id);
        }
    };
    const handleCompleteTodo = () => isApiPage ? completeApiTodo(id, completed) : completeTodo(id, completed);
    const handleShowEditTodo = () => !completed && setIsEditTodo(true);

    return (
        <div className={`d-flex justify-content-between align-items-center border border_radius my-1 p-1`}>
            {isEditTodo
                ? <CreateInput todo={todo} setIsEditTodo={setIsEditTodo} isApiPage={isApiPage} />
                : <h3 onClick={handleShowEditTodo} className={`todo_text mx-2 ${completed ? 'text-decoration-line-through opacity-5' : 'cursor_pointer'}`} >
                    {title}
                  </h3>}
            <ButtonGroup size='sm' vertical={false}>
                <Button variant={'warning'} onClick={handleCompleteTodo} title="Выполнен" disabled={isEditTodo}><i className="bi bi-check m-2"></i></Button>
                <Button variant={'danger'} onClick={handleDeleteTodo} title="Удалить" disabled={isEditTodo}><i className="bi bi-trash3 m-2"></i></Button>
            </ButtonGroup>
        </div>
    )
}