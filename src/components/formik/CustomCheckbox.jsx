import {ErrorMessage, useField} from "formik";
import {CustomErrorMessage} from "../CustomErrorMessage.jsx";
import {Checkbox} from "primereact/checkbox";
import {useState} from "react";

export const CustomCheckbox = ({label, ...props}) => {
    const [field, meta, helpers] = useField(props);
    const [checked, setChecked] = useState(false);

    const handleChange = ({checked}) => {
        helpers.setValue(checked);
    }

    return (
        <>
            <div className="flex align-items-center gap-2">
                <Checkbox
                    {...field}
                    onChange={handleChange}
                    checked={field.value}
                />
                <label htmlFor={props.id || props.name}>{label}</label>
            </div>
            <ErrorMessage name={props.name} component={CustomErrorMessage}/>
        </>
    )
}