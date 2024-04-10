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
import {toast} from "react-toastify";

export const GameFormModal = ({isUpdate, gameData, companies}) => {
    const [visible, setVisible] = useState(false);
    const queryClient = useQueryClient()
    const gameMutation = usePostMutation({
        onSuccess: ({data}) => {
            handleDialog();
            toast.success("El juego se ha creadp correctamente!");
            queryClient.invalidateQueries({ queryKey: ['games'] })
        }
    });

    const handleDialog = () => setVisible(!visible);

    const handleSubmit = (values) => {
        const newValues = {
            ...values,
            stock: values.stock ? 1 : 0
        }

        gameMutation.mutate({
            url: GAME_ENDPOINTS.create,
            data: newValues,
        });
    }

    const formHeader = (
        <h4 className='my-0'>{isUpdate ? 'Edit game' : 'Create new game' }</h4>
    );

    return (
        <>
            <Button
                label={isUpdate ? 'Edit game' : 'Add new game'}
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
                        price: '',
                        company_id: '',
                        stock: '',
                    }}
                    onSubmit={(values) => handleSubmit(values)}
                    validationSchema={gameValidations}
                >
                    {(formik) => (
                        <Form>
                            <div className='field mb-4'>
                                <CustomInput name='nombre' label='Name' />
                            </div>
                            <div className='field mb-4'>
                                <CustomInput name='price' label='Precio' type='number' />
                            </div>
                            <div className='field mb-4'>
                                <CustomSelect
                                    label='Company'
                                    name='company_id'
                                    options={companies}
                                    optionLabel='nombre'
                                />
                            </div>
                            <div className='field mb-4'>
                                <CustomCheckbox name='stock' label='In stock' />
                            </div>
                            <div className='field mb-0 mt-5 flex justify-content-center'>
                                <Button
                                    label='Save'
                                    type="submit"
                                    loading={gameMutation.isPending}
                                />
                            </div>
                        </Form>
                    )}
                </Formik>
            </Dialog>
        </>
    )
}

GameFormModal.propTypes = {
    isUpdate: PropTypes.bool,
    gameData: PropTypes.object,
    companies: PropTypes.array.isRequired,
}