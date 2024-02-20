import CreateInput from "./CreateInput";

export default function HeadInput() {
    return (
        <div className={`d-flex flex-column align-items-center my-4 p-3 header_w border`}>
            <h1>create new toDo</h1>
            <CreateInput />
        </div>
    )
}