import { useState } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import CreateInput from './CreateInput';
import { TodoType, useTodoStore } from '../store/todos';

type OneTodoPropsType = {
    todo: TodoType
}

export default function OneTodo({todo}: OneTodoPropsType) {
    const [completeTodo, deleteTodo, deleteDoneTodo] = useTodoStore(state => [state.completeTodo, state.deleteTodo, state.deleteDoneTodo]);
    const [isEditTodo, setIsEditTodo] = useState(false);
    const title = todo.title;
    const id = todo.id;
    const completed = todo.completed;

    const handleDeleteTodo = () => completed ? deleteDoneTodo(id) : deleteTodo(id);
    const handleCompleteTodo = () => completeTodo(id, completed);
    const handleShowEditTodo = () => !completed && setIsEditTodo(true);

    return (
        <div className={`d-flex justify-content-between align-items-center border my-1 p-1`}>
            {isEditTodo
                ? <CreateInput todo={todo} setIsEditTodo={setIsEditTodo} />
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