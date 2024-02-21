import HeadInput from '../components/HeadInput';
import AllTodos from '../components/AllTodos';
import { useTodoStore } from '../store/todos';

export default function TodoPage() {
    const {todos, doneTodos} = useTodoStore(state => state);

    return (
        <>
            <HeadInput />
            <AllTodos todos={todos} doneTodo={doneTodos} />
        </>
    )
}