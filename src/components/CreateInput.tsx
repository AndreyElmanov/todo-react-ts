import { Field, Form, Formik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import { Button } from 'react-bootstrap';
import { TodoType, useTodoStore } from '../store/todos';
import { generateId } from '../helpers/functions';

type FormikValuesType = {
    title: string
    touched?: boolean
};

type CreateInputPropsType = {
    todo?: TodoType;
    setIsEditTodo?: (bool: boolean) => void;
}

const initialState: FormikValuesType = {
    title: ''
}

export default function CreateInput({todo, setIsEditTodo}: CreateInputPropsType) {
    const [addTodo, editTodo] = useTodoStore(state => [state.addTodo, state.editTodo]);
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
            editTodo(new_todo);
            setIsEditTodo(false);
        } else {
            const new_todo: TodoType = {
                id: generateId(),
                title: values.title,
                completed: false,
            };
            addTodo(new_todo);
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
                        className={`m-1 p-1 w-100 ${errors.title && touched.title && todo ? 'border-danger' : ''}`} />
                    <Button type="submit" disabled={!isValid} variant={btn_variant} title={btn_title}>
                        <i className={`bi bi-${btn_text}`}></i>
                    </Button>
                </Form>
            )}}
        </Formik>
    )
}