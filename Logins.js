import React,{useState} from 'react'
import { Link,useNavigate } from 'react-router-dom';

function Logins() {
    const [credentials, setcredentials] = useState({email:"",password:""})
  let navigate=useNavigate()
    const handlesubmit=async(e)=>{
        e.preventDefault();
        console.log(JSON.stringify({email:credentials.email,password:credentials.password}))
        const response= await fetch("http://localhost:5000/api/loginuser",{
            method:'POST',
            headers:{
                'Content-Type':'application/json'

            },
            body:JSON.stringify({email:credentials.email,password:credentials.password})

        })
        const json=await response.json()
        console.log(json)

        if(!json.success){
            alert("Enter ValidCredentials")
        }
        if(json.success){
          localStorage.setItem("authtoken",json.authtoken)
          console.log(localStorage.getItem("authtoken"))
          navigate('/')
        }
    }
        const onchange=(e)=>{
            setcredentials({...credentials,[e.target.name]:e.target.value})
        }
  return (
    <div>
        <div>
         <div className='container'>
    <form onSubmit={handlesubmit}>
   
  <div className="form-group1 text-white">
    <label htmlfor="exampleInputEmail1 ">Email address</label>
    <input type="email" style={{color:'black'}} className="form-control bg-dark"  placeholder="Enter email" name='email'value={credentials.email} onChange={onchange} />
    <small id="emailHelp" className="form-text text-muted"></small>
  </div>
  <div className="form-group2 text-white">
    <label htmlfor="exampleInputPassword1">Password</label>
    <input type="password" style={{color:'black'}} className="form-control bg-dark"  placeholder="Password" name='password'value={credentials.email} onChange={onchange} />
  </div>
 

  
  <Link to='/login' className='m-3 btn btn-danger' >I'm a new user</Link>
  <Link to='/taskmanager' className='m-3 btn btn-danger' >Submit</Link>
</form>
</div>
    </div>
    </div>
  )
}

export default Logins