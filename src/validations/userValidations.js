import * as Yup from "yup";

export const loginValidations = Yup.object({
    email: Yup.string()
        .email('Invalid email address')
        .required('Required'),
    password: Yup.string().required('Required')
})

export const registerValidations = Yup.object({
    name: Yup.string()
        .required('Required'),
    email: Yup.string()
        .email('Invalid email address')
        .required('Required'),
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .required('Required'),
    confirmPassword: Yup.string()
        .required('Required')
        .min(8, 'Password must be at least 8 characters')
        .oneOf([Yup.ref('password')], 'Passwords must match'),

})

export const userValidations = Yup.object({
    name: Yup.string()
        .required('Required'),

})