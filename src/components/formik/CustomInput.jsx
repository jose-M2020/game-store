import {ErrorMessage, useField} from 'formik';
import {InputText} from "primereact/inputtext";
import {CustomErrorMessage} from "../CustomErrorMessage.jsx";
export const CustomInput = ({label, ...props}) => {
    const [field] = useField(props);
    return (
        <>
            <label htmlFor={props.id || props.name}>{label}</label>
            <InputText className='w-full' {...field} {...props} />
            <ErrorMessage name={props.name} component={CustomErrorMessage}/>
        </>
    )
}