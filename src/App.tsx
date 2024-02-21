import { Route, Routes } from "react-router";
import TodoPage from "./pages/TodoPage";
import ApiTodoPage from "./pages/ApiTodoPage";
import UserPage from "./pages/UserPage";
import NotFoundPage from "./pages/NotFoundPage";
import Header from "./components/Header";

export default function App() {

  return (
    <div className={`d-flex flex-column justify-content-start align-items-center w-100 h-100 overflow-auto`}>
      <Header />
      <Routes>
        <Route path='/' element={<TodoPage />} />
        <Route path='/apiTodos' element={<ApiTodoPage />} />
        <Route path='/user' element={<UserPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </div>
  )
}