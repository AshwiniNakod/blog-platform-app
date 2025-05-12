import axios from 'axios';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleRegister = async (e) => {
   
    try {
       e.preventDefault();
        if (password.length < 8) {
          setError("Password must be at least 8 characters long");
          return;
        }

       await axios.post('http://localhost:8000/api/user/createUser', { username, password });
      // console.log("res:",res)
    // console.log("go tologin page")
      navigate('/login');
    } catch (err) {
        // console.log(err)
      if (err.response && err.response.data && err.response.data.message) {
      setError(err.response.data.message);
    } else {
      setError('Registration failed. Please try again.');
    }
    }
  };
  return (
    <div>
      <h2>REGISTRATION</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
       <div className="form-container">
        <input name="username" placeholder="USERNAME"  onChange={e => setUsername(e.target.value)} value={username} />
        <input 
          name="password" 
          placeholder="PASSWORD"  
          type="password"  
          onChange={e => setPassword(e.target.value)} 
          value={password} 
          minLength={8}
          />
        <button onClick={handleRegister}>REGISTRATION</button>
      </div>     
    </div>
  )
}

export default RegisterForm
