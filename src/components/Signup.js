import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signup(props) {
  const [credentials, setCredentials] = useState({userName: "" , email: "", password: "", cpassword: ""});
  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const {userName , email, password} = credentials;
            const response = await fetch(`https://inotebook-backend-i56l.onrender.com/api/auth/createUser`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
 body: JSON.stringify({userName: credentials.userName, email: credentials.email, password: credentials.password })
})
const json = await response.json();
console.log(json);
if (json.success) {
  // Save the auth token and redirect
  localStorage.setItem('token', json.authToken);
  navigate("/");
  props.showAlert("Account created successfully", "success");
}else {
    props.showAlert("Invalid credentials", "danger");
}
  }

      const onChange = (e) => {
        // Handle input changes here
setCredentials({...credentials, [e.target.name]: e.target.value});
    }

  return (
    <div>

<form onSubmit={handleSubmit}>
    <div className="mb-3">
    <label htmlFor="userName" className="form-label">Username</label>
    <input type="text" className="form-control" id="userName" name="userName" onChange={onChange}/>
  </div>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={onChange}/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" name="password" onChange={onChange} minLength={5} required/>
  </div>
   <div className="mb-3">
    <label htmlFor="cpassword" className="form-label">Conform Password</label>
    <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={onChange} minLength={5} required/>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>

    </div>
  )
}

export default Signup