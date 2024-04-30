import * as yup from "yup"

/**
 * * yup-schema 
 * */
export const LoginSchema = yup.object({
  email: yup.string().email('Ingrese un correo valido').required('Ingrese un Email'),
  password: yup.string().min(6, "Minimo de 6 caracteres").required("Ingrese su contraseña"),
})

export const NewPropertieSchema = yup.object({
  title:yup.string().min(6,'Minimo de 6 caracteres').required('Titulo es Obligatorio'),
  price:yup.number().required('Ingrese el precio de la propiedad'),
  bedrooms:yup.number().required('Seleccione cantidad de habitaciones'),
  bathrooms:yup.number().required('Seleccione cantidad de Baños'),
  description:yup.string().required('Ingrese descripcion de la propiedad'),
  parking:yup.number().required('Seleccione cantidad de estacionamientos'),
  image:yup.string().required('Ingrese imagen de la propiedad')
})

export const EditPropertieSchema = yup.object({
  title:yup.string().min(6,'Minimo de 6 caracteres').required('Titulo es Obligatorio'),
  price:yup.number().required('Ingrese el precio de la propiedad'),
  bedrooms:yup.number().required('Seleccione cantidad de habitaciones'),
  bathrooms:yup.number().required('Seleccione cantidad de Baños'),
  description:yup.string().required('Ingrese descripcion de la propiedad'),
  parking:yup.number().required('Seleccione cantidad de estacionamientos'),
})