import {Message} from "primereact/message";

export const CustomErrorMessage = ({children}) => {
    return (
        <Message severity="error" text={children} className='bg-transparent p-2 mt-1'/>
    )
}