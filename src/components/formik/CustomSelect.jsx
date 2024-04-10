import {ErrorMessage, useField} from 'formik';
import {Dropdown} from 'primereact/dropdown';
import {CustomErrorMessage} from "../CustomErrorMessage.jsx";

export const CustomSelect = ({
    label,
    options,
    optionLabel='name',
    optionValue = 'id',
    ...props
}) => {
    const [field] = useField(props)

    return (
        <>
            <label htmlFor={props.id || props.name}>{label}</label>
            <Dropdown
                options={options}
                optionLabel={optionLabel}
                optionValue={optionValue}
                className='w-full'
                filter={!!props.filter}
                {...field}
            />
            <ErrorMessage name={props.name} component={CustomErrorMessage}/>
        </>
    )
}
