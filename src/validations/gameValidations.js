import * as Yup from "yup";

export const gameValidations = Yup.object({
    nombre: Yup.string()
        .required('Required'),
    price: Yup.number()
        .required('Required'),
    company_id: Yup.number()
        .required('Required'),
    stock: Yup.boolean(),

})