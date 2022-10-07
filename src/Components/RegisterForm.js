import React from 'react';
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";  

const RegisterForm = (props) => {
  const { firstName, lastName, email, rut, password, confirmPassword, onSubmitProp  } = props
  
  return (
    <div>
      <Formik
        initialValues={
          {
            firstName: firstName,
            lastName: lastName,
            email: email,
            rut: rut,
            password: password,
            confirmPassword: confirmPassword,
          }
        }

        validationSchema={
          Yup.object().shape({
            firstName: 
              Yup.string()
                .min(4, "El nombre tiene menos de 4 caracteres")
                .max(15, "El nombre es muy caro")
                .required("Ingresa un nombre"),
            lastName: 
              Yup.string()
                .min(4, "El apellido tiene menos de 4 caracteres")
                .max(15, "El apellido es muy caro")
                .required("Ingresa un apellido"),
            email:
              Yup.string()
                .email("El formato de correo no es valido")
                .required("El correo es obligatorio"),
            rut:
              Yup.string()
                .matches(/^[0-9]+[-|-]{1}[0-9kK]{1}$/, "El formato de rut es obligatorio")
                .required("El rut es obligatorio"),
            password:
              Yup.string()
                .required("La contraseña es requerida")
                .equals([Yup.ref('confirmPassword'), null], "las contraseñas no son iguales")
                .min(8,"La contraseña debe de tener al menos 8 carácteres"),
            confirmPassword:
              Yup.string()
                .required("La confirmación de contraseña es obligatorio")
                .equals([Yup.ref('password'), null], "las contraseñas no son iguales"),
          })
        }


        onSubmit={(values, {setSubmiting})=>{
          console.log("La info del formulario", values);
          onSubmitProp(values);
        }}
      >

        {({errors, touched, handleSubmit})=>{
          return(
            <div>
              <h2>FORMULARIO DE REGISTO</h2>
              <Form onSubmit={handleSubmit}>
                <label htmlFor='firstName'>Nombre:</label>
                <Field id="firstName" type="text" placeholder="Ingresa nombre" name="firstName" className="form-control" />
                {errors.firstName && touched.firstName && <p>{errors.firstName}</p>}

                <label htmlFor='lastName'>Apellido:</label>
                <Field id="lastName" type="text" placeholder="Ingresa apellido" name="lastName" className="form-control" />
                {errors.lastName && touched.lastName && <p>{errors.lastName}</p>}
                
                <label htmlFor='email'>Email:</label>
                <Field id="email" type="email" placeholder="Ingresa tu email" name="email" className="form-control" />
                {errors.email && touched.email && <p>{errors.email}</p>}

                <label htmlFor='rut'>Rut (sin puntos con guion):</label>
                <Field id="rut" type="text" placeholder="Ingresa tu rut" name="rut" className="form-control" />
                {errors.rut && touched.rut && <p>{errors.rut}</p>}

                <label htmlFor='password'>Contraseña:</label>
                <Field id="password" type="password" placeholder="Ingresa tu password" name="password" className="form-control" />
                {errors.password && touched.password && <p>{errors.password}</p>}

                <label htmlFor='confirmPassword'>confirmar Contraseña:</label>
                <Field id="confirmPassword" type="password" placeholder="Ingresa tu confirmPassword" name="confirmPassword" className="form-control" />
                {errors.confirmPassword && touched.confirmPassword && <p>{errors.confirmPassword}</p>}

                <button type='submit' disabled={Object.values(errors).length>0}>REGISTRARME</button>
              </Form>
            </div>
          )
        }}

      </Formik>
    </div>
  );
}

export default RegisterForm;
