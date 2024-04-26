
import React, { useState } from 'react';
import { Link, } from 'react-router-dom'
import '../App.css';

const RegistrationForm = () => {
  const [credentials, setcredentials] = useState({name:"",email:"",password:""})
  const handlesubmit=async(e)=>{
      e.preventDefault();
      console.log(JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password,location:credentials.geolocation}))
      const response= await fetch("http://localhost:5000/api/createuser",{
          
          method:'POST',
          headers:{
              'Content-Type':'application/json'

          },
          body:JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password})

      })
     
      const json=await response.json()
    
      console.log(response)

      if(!json.success){
          alert("Enter ValidCredentials")
      }
  }
      const onchange=(e)=>{
          setcredentials({...credentials,[e.target.name]:e.target.value})
      }
     

  

  return (
    <div className="registration-form">
      <h2>Register</h2>
      <form onSubmit={handlesubmit}>
        <input
          type="text"
          name="name"
          placeholder="Username"
          value={credentials.name}
          onChange={onchange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={credentials.email}
          onChange={onchange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={credentials.password}
          onChange={onchange}
        />
        <button type="submit"> Register</button>
        <Link to='/login' className='m-3 btn btn-danger' >Already a user</Link>
      </form>
    </div>
  );
};

export default RegistrationForm;
