import { useSelector } from 'react-redux'
import { Button, TextInput } from 'flowbite-react'

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user)
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form className='flex flex-col gap-3'>
        <img
          src={currentUser.profilePicture}
          alt='profile'
          className='h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2'
        />
        <TextInput
          defaultValue={currentUser.username}
          type='text'
          id='username'
          placeholder='username'
          className=' p-3 rounded-lg'
        />
        <TextInput
          defaultValue={currentUser.email}
          type='email'
          id='email'
          placeholder='Email'
          className=' p-3 rounded-lg'
        />
        <TextInput
          type='password'
          id='password'
          placeholder='Password'
          className=' p-3 rounded-lg'
        />
        <Button type='submit' gradientDuoTone='purpleToBlue' outline>
            Update
        </Button>
      </form>
      <div className="flex justify-between mt-5">
        <span className='text-red-700 cursor-pointer'>Delete Account</span>
        <span className='text-red-700 cursor-pointer'>Sign out</span>
      </div>
    </div>
  )
}
