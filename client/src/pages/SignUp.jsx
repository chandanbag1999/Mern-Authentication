import { Button, TextInput } from 'flowbite-react';
import { Link } from 'react-router-dom';

export default function SignUp() {
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
      <form className='flex flex-col gap-2'>
        <TextInput 
          type='text'
          placeholder='Username'
          id='username'
          className=' p-3 rounded-lg'
        />
        <TextInput 
          type='email'
          placeholder='Email'
          id='email'
          className=' p-3 rounded-lg'
        />
        <TextInput 
          type='password'
          placeholder='Password'
          id='password'
          className=' p-3 rounded-lg'
        />
        <Button
          gradientDuoTone='purpleToPink'
        >
          Sign Up
        </Button>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Have an account?</p>
        <Link to='/sign-in'>
          <span className='text-blue-500'>Sign in</span>
        </Link>
      </div>
    </div>
  );
}
