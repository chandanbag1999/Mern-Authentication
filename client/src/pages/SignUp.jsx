import { Alert, Button, Spinner, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);
      const response = await fetch('/api/v1/users/sign-up', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setLoading(false);
      if (data.success === false) {
        setError(true);
        return;
      }
      navigate('/sign-in');
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  }

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-2'>
        <TextInput 
          type='text'
          placeholder='Username'
          id='username'
          className=' p-3 rounded-lg'
          onChange={handleChange}
        />
        <TextInput 
          type='email'
          placeholder='Email'
          id='email'
          className=' p-3 rounded-lg'
          onChange={handleChange}
        />
        <TextInput 
          type='password'
          placeholder='Password'
          id='password'
          className=' p-3 rounded-lg'
          onChange={handleChange}
        />
        <Button
          gradientDuoTone='purpleToPink'
          type='submit'
          disabled={loading}
        >
          { loading ? (
            <>
              <Spinner size='sm' />
              <span className='pl-2'>Loading...</span>
            </>
          ) : (
            'Sign Up'
          )}
        </Button>
        <OAuth />
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Have an account?</p>
        <Link to='/sign-in'>
          <span className='text-blue-500'>Sign in</span>
        </Link>
      </div>
      { error && (
        <Alert className='mt-5' color='failure'>
          {'Something went wrong!'}
        </Alert>
      )}
    </div>
  );
}
