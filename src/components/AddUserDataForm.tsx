import { Field, Form, Formik, FormikHelpers } from "formik";
import * as yup from 'yup';
import { Button } from "react-bootstrap";
import { UserDataType } from "../helpers/types";
import { useUserStore } from "../store/userInfo";

type FormikValuesType = {
    firstName: string;
    secondName: string;
    description: string;
    touched?: boolean;
};

const initialValues: UserDataType = {
    firstName: '',
    secondName: '',
    description: '',
};

export default function AddUserDataForm() {
    const addUserData = useUserStore(state => state.addUserData);
    const validationsScheme = yup.object().shape({
        firstName: yup.string().required(),
        secondName: yup.string().required(),
        description: yup.string().required(),
    });

    const handleSubmit = (values: FormikValuesType, formikHelpers: FormikHelpers<FormikValuesType>) => {
        const user_data: UserDataType = {
            firstName: values.firstName,
            secondName: values.secondName,
            description: values.description,
        };
        addUserData(user_data);
        formikHelpers.resetForm();
    };

    return (
        <Formik initialValues={initialValues} onSubmit={handleSubmit} enableReinitialize validationSchema={validationsScheme} >
            {({errors, isValid, touched}) => {
                return (
                    <Form className='d-flex flex-column justify-content-center w-100 mx-2'>
                        <Field type="text" name="firstName" placeholder='Имя' autoComplete='off'
                            className={`my-1 p-1 w-100 border_radius ${errors.firstName && touched.firstName ? 'border-danger' : ''}`} />
                        <Field type="text" name="secondName" placeholder='Фамилия' autoComplete='off'
                            className={`my-1 p-1 w-100 border_radius ${errors.secondName && touched.secondName ? 'border-danger' : ''}`} />
                        <Field type="text" name="description" placeholder='Краткая информация' autoComplete='off' as='textarea'
                            className={`my-1 p-1 w-100 border_radius ${errors.description && touched.description ? 'border-danger' : ''}`} />
                        <Button type="submit" disabled={!isValid} variant={'success'} title={'Добавить информацию'}>
                            Добавить информацию
                        </Button>
                    </Form>
                )}}
        </Formik>
    )
}