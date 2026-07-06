  import { useState } from "react";
  import { loginUser } from "../api/auth";
  import { Link, useNavigate } from 'react-router';
import { Clapperboard, Lock, LogIn, Mail } from 'lucide-react';

  export default function Login({setToken}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState('');
    const [loading, setLoading]   = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const data = await loginUser({ email, password });
        localStorage.setItem("token", data.success.token); // store JWT
        setToken(data.success.token);
        navigate("/");
      } catch (error) {
        setError(error.message || "Invalid email or password");
      } finally {
        setLoading(false);
      }
    };

    return (
      <div className="auth-page">
        <div className="auth-card">
          <div className='auth-logo'>
            <div className='auth-logo__icon'>
              <Clapperboard size={20} strokeWidth={1.75} />
            </div>
            <span className='auth-logo__wordmark'>
              Movy<span className='auth-logo__dot'>.</span>
            </span>
          </div>
          
          <h1 className="auth-title">Welcome back</h1>
          <p className='auth-subtitle'>Sign in to your account to continue</p>
          
          <form onSubmit={handleSubmit} className="auth-form">
            <div className='auth-field'>
              <label className='auth-label' htmlFor='email'>Email</label>
              <div className='auth-input-wrap'>
                <Mail size={15} strokeWidth={1.75} className='auth-input-icon'/>
                <input
                  id='email'
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={event => setEmail(event.target.value)}
                  required
                  className="auth-input"
                  autoComplete='email'
                />
              </div>
            </div>

            <div className='auth-field'>
              <label className='auth-label' htmlFor='password'>Password</label>
              <div className='auth-input-wrap'>
                <Lock size={15} strokeWidth={1.75} className='auth-input-icon' />
                <input
                  id='password'
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={event => setPassword(event.target.value)}
                  required
                  className="auth-input"
                  autoComplete='current-password'
                />
              </div>
            </div>

            {error && <p className='auth-error'>{error}</p>}

            <button
              type="submit"
              className="auth-submit"
              disabled={loading}
            >
              <LogIn size={15} strokeWidth={2}/>
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          
          </form>
          <p className='auth-switch'>
            Don't have an account?{' '}
            <Link to='/register' className='auth-switch__link'>Create one</Link>
          </p>
        </div>
    </div>
    );
  }
