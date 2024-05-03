import { Alert, Button, Spinner, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { signInFailure, signInStart, signInSuccess } from '../redux/user/userSlice'
import OAuth from '../components/OAuth'

export default function SignIn() {
  const [formData, setFormData] = useState({})
  const { loading, error } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart())
      const response = await fetch('/api/v1/users/sign-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success === false) {
        dispatch(signInFailure(data))
        return;
      }
      dispatch(signInSuccess(data))
      navigate('/');
    } catch (error) {
      dispatch(signInFailure(error))
    }
  }
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-2'>
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
            'Sign In'
          )}
        </Button>
        <OAuth />
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Dont Have an account?</p>
        <Link to='/sign-up'>
          <span className='text-blue-500'>Sign up</span>
        </Link>
      </div>
      { error ? (
        <Alert className='mt-5' color='failure'>
          { error.message || 'something went wrong!'}
        </Alert>
      ) : (
        ''
      )}
    </div>
  );
};
