import {useState} from "react";
import {Form, Formik} from "formik";
import PropTypes from "prop-types";
import {Dialog} from "primereact/dialog";
import {Button} from "primereact/button";
import {usePostMutation} from "../../hooks/usePostMutation.js";
import {CustomInput} from "../formik/CustomInput.jsx";
import {CustomSelect} from "../formik/CustomSelect.jsx";
import {gameValidations} from "../../validations/gameValidations.js";
import {GAME_ENDPOINTS} from "../../api/gameApi.js";
import {CustomCheckbox} from "../formik/CustomCheckbox.jsx";
import {useQueryClient} from "@tanstack/react-query";
import {COMPANY_ENDPOINTS} from "../../api/companyApi.js";
import {companyValidations} from "../../validations/companyValidations.js";
import {toast} from "react-toastify";

export const CompanyFormModal = () => {
    const [visible, setVisible] = useState(false);
    const queryClient = useQueryClient()
    const companyMutation = usePostMutation({
        onSuccess: ({data}) => {
            handleDialog();
            toast.success("La compañia se ha creadp correctamente!");
            queryClient.invalidateQueries({ queryKey: ['companies'] })
        }
    });

    const handleDialog = () => setVisible(!visible);

    const handleSubmit = (values) => {
        companyMutation.mutate({
            url: COMPANY_ENDPOINTS.create,
            data: values,
        });
    }

    const formHeader = (
        <h4 className='my-0'>Create company</h4>
    );

    return (
        <>
            <Button
                icon="pi pi-plus"
                className='bg-cyan-500 text-white'
                rounded text raised
                tooltip='Add company'
                tooltipOptions={{
                    position: 'top'
                }}
                onClick={handleDialog}
            />
            <Dialog
                header={formHeader}
                visible={visible}
                style={{width: '33vw'}}
                onHide={handleDialog}
                dismissableMask={true}
            >
                <Formik
                    initialValues={{
                        nombre: '',
                    }}
                    onSubmit={(values) => handleSubmit(values)}
                    validationSchema={companyValidations}
                >
                    {(formik) => (
                        <Form>
                            <div className='field mb-4'>
                                <CustomInput name='nombre' label='Name' />
                            </div>
                            <div className='field mb-0 mt-5 flex justify-content-center'>
                                <Button
                                    label='Save'
                                    type="submit"
                                    loading={companyMutation.isPending}
                                />
                            </div>
                        </Form>
                    )}
                </Formik>
            </Dialog>
        </>
    )
}