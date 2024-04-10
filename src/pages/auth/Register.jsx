
import {Form, Formik} from "formik";
import {CustomInput} from "../../components/index.js";
import {Button} from "primereact/button";
import {useAuthContext} from "../../context/AuthContext.jsx";
import {Link, useNavigate} from "react-router-dom";
import {registerValidations} from "../../validations/userValidations.js";
import {AUTH_ENDPOINTS} from "../../api/authApi.js";
import {usePostMutation} from "../../hooks/usePostMutation.js";
import {toast} from "react-toastify";

export const Register = () => {
    const {register} = useAuthContext();
    const navigate = useNavigate();
    const registerMutation = usePostMutation({
        onSuccess: () => {
            navigate('/login');
            toast.success("El registro se ha realizado correctamente!");
        }
    });

    const handleSubmit = (values) => {
        registerMutation.mutate({
            url: AUTH_ENDPOINTS.register,
            data: values,
        })
    }
    return (
        <>
            <div className="flex justify-content-center align-items-center min-h-screen p-4">
                <div className='' style={{maxWidth: '700px'}}>
                    <h1 className='mb-5 pb-4font-bold text-cyan-700 text-center'>Create an account</h1>
                    <Formik
                        initialValues={{
                            name: '',
                            email: '',
                            password: '',
                            confirmPassword: '',
                        }}
                        onSubmit={handleSubmit}
                        validationSchema={registerValidations}
                    >
                        {(formik) => (
                            <Form>
                                <div className='field mb-4'>
                                    <CustomInput
                                        label='Name'
                                        name='name'
                                    />
                                </div>
                                <div className='field mb-4'>
                                    <CustomInput
                                        label='Email'
                                        name='email'
                                    />
                                </div>
                                <div className='field mb-4'>
                                    <CustomInput
                                        label='Password'
                                        name='password'
                                        type='password'
                                    />
                                </div>
                                <div className='field mb-4'>
                                    <CustomInput
                                        label='Confirm password'
                                        name='confirmPassword'
                                        type='password'
                                    />
                                </div>
                                <div className='flex flex-column gap-3 text-center'>
                                    <Button
                                        label='Register'
                                        type='submit'
                                        loading={registerMutation.isPending}
                                    />
                                    <span>Or</span>
                                    <Button
                                        label='Login'
                                        type='button'
                                        outlined
                                        onClick={() => navigate('/login')}
                                    />
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </>
    )
}

