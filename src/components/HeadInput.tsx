import { useLocation } from "react-router";
import CreateInput from "./CreateInput";

export default function HeadInput() {
    const location = useLocation();
    const isApiPage = location.pathname === '/apiTodos';
    const title = isApiPage ? 'apiToDo' : 'toDo';

    return (
        <div className={`d-flex flex-column align-items-center my-4 p-3 header_w border border_radius`}>
            <h1>create new {title}</h1>
            <CreateInput isApiPage={isApiPage} />
        </div>
    )
}