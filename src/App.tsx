import { Route, Routes } from "react-router";
import TodoPage from "./pages/TodoPage";

export default function App() {

  return (
    <div className={`d-flex flex-column justify-content-start align-items-center w-100 h-100 overflow-auto`}>
      <Routes>
        <Route path='/' element={<TodoPage />} />
      </Routes>
    </div>
  )
}