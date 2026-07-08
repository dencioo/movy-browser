import { useState } from 'react';
import { registerUser } from '../api/auth';
import { Clapperboard, Lock, Mail, User, UserPlus } from 'lucide-react';
import { Link, useNavigate } from 'react-router';

export default function Register({setToken}) {
  const [ name, setName ] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true)

    try {
      const data = await registerUser({name, email, password});
      localStorage.setItem("token", data.success.token) // store JWT
      setToken(data.success.token);
      navigate('/')
    } catch (error) {
      setError(error.message || "Registration failed. Please try again.")
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
            Movy <span className='auth-logo__dot'>.</span>
          </span>
        </div>

        <h1 className="auth-title">Create an account</h1>
        <p className='auth-subtitle'>Start building your watchlist today.</p>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className='auth-field'>
            <label className='auth-label' htmlFor='name'>Name</label>
            <div className='auth-input-wrap'>
              <User  size={15} strokeWidth={1.75} className='auth-input-icon'/>
              <input
                id='name'
                type="text"
                placeholder="Name"
                value={name}
                onChange={e => setName(e.target.value)}
                required
                className="auth-input"
                autoComplete='name'
              />
            </div>
          </div>

          <div className='auth-field'>
            <label className='auth-label' htmlFor='email'>Email</label>
            <div className='auth-input-wrap'>
              <Mail size={15} strokeWidth={1.75} className='auth-input-icon'/>
              <input
                id='email'
                type="email"
                placeholder="example@mail.com"
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
              <Lock size={15} strokeWidth={1.75} className='auth-input-icon'/>
              <input
                id='password'
                type="password"
                placeholder="Password"
                value={password}
                onChange={event => setPassword(event.target.value)}
                required
                className="auth-input"
                autoComplete='new-password'
              />
            </div>
          </div>
          {error && <p className='auth-error'>{error}</p>}

          <button
            type="submit"
            className="auth-submit"
            disabled={loading}
          >
            <UserPlus size={15} strokeWidth={2}/>
            {loading ? 'Creating account...' : 'Create account'}
          </button>
        </form>
        
        <p className='auth-switch'>
          Already have an account?{' '}
          <Link to='/login' className='auth-switch__link'>Sign in</Link>
        </p>
      </div>
    </div>
  )
}