import * as Yup from "yup";

export const companyValidations = Yup.object({
    nombre: Yup.string()
        .required('Required'),

})