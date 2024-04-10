import {Form, Formik} from "formik";
import {useNavigate} from "react-router-dom";
import {CustomInput} from "../../components/index.js";
import {Button} from "primereact/button";
import {useAuthContext} from "../../context/AuthContext.jsx";
import {loginValidations} from "../../validations/userValidations.js";
import {usePostMutation} from "../../hooks/usePostMutation.js";
import {AUTH_ENDPOINTS} from "../../api/authApi.js";

export const Login = () => {
    const {setUser, setUserToken} = useAuthContext();
    const navigate = useNavigate();

    const loginMutation = usePostMutation({
        onSuccess: ({data}) => {
            const {access_token, user} = data
            setUser(user);
            setUserToken(access_token);
        }
    });

    const handleSubmit = (values) => {
        loginMutation.mutate({
            url: AUTH_ENDPOINTS.login,
            data: values,
        })
    }

    return (
        <>
            <div className="login flex justify-content-center align-items-center min-h-screen p-4">
                <div className='w-100  z-5 ' style={{maxWidth: '700px'}}>
                    <h1 className='mb-5 pb-4font-bold text-cyan-700'>Welcome to GameStore</h1>
                    <Formik
                        initialValues={{
                            email: '',
                            password: '',
                        }}
                        onSubmit={handleSubmit}
                        validationSchema={loginValidations}
                    >
                        {(formik) => (
                            <Form>
                                    <div className='field mb-3'>
                                        <CustomInput
                                            label='Email'
                                            name='email'
                                        />
                                    </div>
                                    <div className='field mb-5'>
                                        <CustomInput
                                            label='Password'
                                            name='password'
                                        />
                                    </div>
                                    <div className='flex flex-column gap-3 text-center'>
                                        <Button
                                            label='Login'
                                            type='submit'
                                            loading={loginMutation.isPending}
                                        />
                                        <span>Or</span>
                                        <Button
                                            label='Register'
                                            type='button'
                                            outlined
                                            onClick={() => navigate('/register')}
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
