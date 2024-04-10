import PropTypes from 'prop-types';
import {Button} from 'primereact/button';
import {Dialog} from 'primereact/dialog';
import {Formik, Form} from 'formik';
import {CustomInput} from "../formik/CustomInput.jsx";
import {userValidations} from "../../validations/userValidations.js";
import {usePostMutation} from "../../hooks/usePostMutation.js";
import {USER_ENDPOINTS} from "../../api/userApi.js";
import {useAuthContext} from "../../context/AuthContext.jsx";
import {toast} from "react-toastify";

export const UserFormModal = ({userData, visible, handleDialog}) => {
    const {setUser} = useAuthContext()
    const userMutation = usePostMutation({
        onSuccess: ({data}) => {
            setUser(data.user)
            toast.success("El nombre de usuario se ha actualizado correctamente!");
            handleDialog()
        }
    });

    const handleSubmit = (values) => {
        userMutation.mutate({
            url: USER_ENDPOINTS.update(userData.id),
            data: values,
            method: 'PUT'
        });
    }

    const formHeader = (
        <h4 className='my-0'>Edit profile</h4>
    );

    return (
        <>
            <Dialog
                header={formHeader}
                visible={visible}
                style={{width: '33vw'}}
                onHide={handleDialog}
                dismissableMask={true}
            >
                <Formik
                    initialValues={{
                        name: userData?.name
                    }}
                    onSubmit={(values) => handleSubmit(values)}
                    validationSchema={userValidations}
                >
                    {(formik) => (
                        <Form>
                            <div className='field mb-4'>
                                <CustomInput label='Name' name='name'/>
                            </div>

                            <div className='field mb-0 mt-5 flex justify-content-center'>
                                <Button
                                    label='Save'
                                    type="submit"
                                    loading={userMutation.isPending}
                                />
                            </div>
                        </Form>
                    )}
                </Formik>
            </Dialog>
        </>
    )
}

UserFormModal.propTypes = {
    visible: PropTypes.bool.isRequired,
    handleDialog: PropTypes.func.isRequired,
}
