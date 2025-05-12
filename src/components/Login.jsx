import axios from 'axios';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';


function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.post('http://localhost:8000/api/user/login', { username, password });
      localStorage.setItem('token', res.data.JWTtoken);
     
      const role =  res.data.role
      localStorage.setItem('role', res.data.role);

       (role && role.includes('ADMIN')) ? navigate('/admin') : navigate('/');
    } catch (err) {
      // console.log(err)
       if (err.response && err.response.data && err.response.data.message) {
      setError(err.response.data.message);
    }
      // alert('Login failed');
      
    }
  };
  return (
    <div>
        <h2>LOGIN</h2>
         {error && <p style={{ color: 'red' }}>{error}</p>}
         <form  onSubmit={handleLogin}>
             <div className="form-container">
        <input name="username" 
                placeholder="USERNAME"  
                onChange={e => setUsername(e.target.value)} 
                value={username} 
                required/>
        <input name="password" placeholder="PASSWORD"  type="password"  onChange={e => setPassword(e.target.value)} value={password} required/>
         <button type="submit">LOGIN</button>
         <button onClick={()=>navigate('/register')}>REGISTRATION</button>
      </div>   
         </form>
    </div>
  )
}

export default Login
