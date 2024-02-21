import { Field, Form, Formik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import { Button } from 'react-bootstrap';
import { generateId } from '../helpers/functions';
import { TodoType } from '../helpers/types';
import { useApiTodoStore } from '../store/apiTodos';
import { useTodoStore } from '../store/todos';

type FormikValuesType = {
    title: string
    touched?: boolean
};

type CreateInputPropsType = {
    isApiPage: boolean;
    todo?: TodoType;
    setIsEditTodo?: (bool: boolean) => void;
}

const initialState: FormikValuesType = {
    title: ''
}

export default function CreateInput({todo, setIsEditTodo, isApiPage}: CreateInputPropsType) {
    const {addTodo, editTodo} = useTodoStore(state => state);
    const {addApiTodo, editApiTodo} = useApiTodoStore(state => state);
    const btn_text = todo ? 'pencil' : 'plus';
    const btn_variant = todo ? 'info' : 'success';
    const btn_title = todo ? 'Редактировать' : 'Создать';
    const initialValues = todo ? {title: todo.title} : initialState;

    const handleSubmit = (values: FormikValuesType, formikHelpers: FormikHelpers<FormikValuesType>) => {
        if (todo && setIsEditTodo) {
            const new_todo: TodoType = {
                ...todo,
                title: values.title,
            };
            isApiPage ? editApiTodo(new_todo) : editTodo(new_todo);
            setIsEditTodo(false);
        } else {
            const new_todo: TodoType = {
                id: generateId(),
                title: values.title,
                completed: false,
            };
            isApiPage ? addApiTodo(new_todo) : addTodo(new_todo);
        }
        formikHelpers.resetForm();
    };

    const validationsScheme = yup.object().shape({
        title: yup.string().required(),
    });

    return (
        <Formik initialValues={initialValues} onSubmit={handleSubmit} enableReinitialize validationSchema={validationsScheme} >
            {({errors, isValid, touched}) => {
                return (
                <Form className='d-flex justify-content-center align-items-center w-100 mx-2 '>
                    <Field type="text" name="title" placeholder='Новая задача' autoComplete='off'
                        className={`m-1 p-1 w-100 border_radius ${errors.title && touched.title && todo ? 'border-danger' : ''}`} />
                    <Button type="submit" disabled={!isValid} variant={btn_variant} title={btn_title}>
                        <i className={`bi bi-${btn_text}`}></i>
                    </Button>
                </Form>
            )}}
        </Formik>
    )
}