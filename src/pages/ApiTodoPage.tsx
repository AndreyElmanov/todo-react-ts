import { useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import AllTodos from '../components/AllTodos';
import HeadInput from '../components/HeadInput';
import { useApiTodoStore } from '../store/apiTodos';

export default function ApiTodoPage() {
    const {apiTodos, apiDoneTodos, getApiTodos, isLoading, clearStore, loadingTitle} = useApiTodoStore(state => state);
    useEffect(() => {
        getApiTodos();
        return clearStore;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <HeadInput />
            {isLoading && loadingTitle === 'getTodo'
                ? <Spinner />
                : <AllTodos todos={apiTodos} doneTodo={apiDoneTodos} />}
        </>
    )
}