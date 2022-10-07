import React from 'react';
import RegisterForm from '../Components/RegisterForm';

const Register = () => {
  const registerUser = (user) =>{
    console.log("EL USUARIO SE HA REGISTRADO", user);
  }
  return (
    <div className='form-container'>
      <RegisterForm firstName="" lastName="" email="" password="" confirmPassword="" onSubmitProp={registerUser}/>
    </div>
  );
}

export default Register;
