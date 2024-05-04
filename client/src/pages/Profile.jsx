import { useSelector } from 'react-redux'
import { Alert, Button, Spinner, TextInput } from 'flowbite-react'
import { useRef, useState, useEffect } from 'react';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { deleteUserFailure, deleteUserStart, deleteUserSuccess, signOut, updateUserFailure, updateUserStart, updateUserSuccess } from '../redux/user/userSlice';



export default function Profile() {
  const dispatch = useDispatch();
  const fileRef = useRef();
  const [image, setImage] = useState(undefined);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const { currentUser, loading, error } = useSelector((state) => state.user)

  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    } 
  }, [image]);

  const handleFileUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercent(Math.round(progress));
      },
      (error) => {
        setImageError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => 
          setFormData({...formData, profilePicture: downloadURL})
        );
      }
    )
  };

  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value})
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart())
      const response = await fetch(`/api/v1/users/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data))
        return;
      }
      dispatch(updateUserSuccess(data))
      setUpdateSuccess(true)
    } catch (error) {
      dispatch(updateUserFailure(error))
    }
  };

  const handleDelete = async () => {
    try {
      dispatch(deleteUserStart())
      const response = await fetch(`/api/v1/users/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data))
        return;
      }
      dispatch(deleteUserSuccess(data))
    } catch (error) {
      dispatch(deleteUserFailure(error))
    }
  };

  const handleSignOut = async () => {
    try {
      await fetch('/api/v1/users/sign-out');
      dispatch(signOut())
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
        <input 
          type='file'
          ref={fileRef}
          hidden
          accept='image/*'
          onChange={(e) => setImage(e.target.files[0])}
        />
        <img
          src={formData.profilePicture || currentUser.profilePicture}
          alt='profile'
          className='h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2'
          onClick={() => fileRef.current.click()}
        />
        <p className='text-sm self-center'>
          {imageError ? (
            <span className='text-red-700'>
              Error uploading image (file size must be less than 2 MB)
            </span>
          ) : imagePercent > 0 && imagePercent < 100 ? (
            <span className='text-slate-700'>{`Uploading: ${imagePercent} %`}</span>
          ) : imagePercent === 100 ? (
            <span className='text-green-700'>Image uploaded successfully</span>
          ) : (
            ''
          )}
        </p>
        <TextInput
          defaultValue={currentUser.username}
          type='text'
          id='username'
          placeholder='username'
          className=' p-3 rounded-lg'
          onChange={handleChange}
        />
        <TextInput
          defaultValue={currentUser.email}
          type='email'
          id='email'
          placeholder='Email'
          className=' p-3 rounded-lg'
          onChange={handleChange}
        />
        <TextInput
          type='password'
          id='password'
          placeholder='Password'
          className=' p-3 rounded-lg'
          onChange={handleChange}
        />
        <Button type='submit' gradientDuoTone='purpleToBlue' outline>
          { loading ? (
            <>
              <Spinner size='sm' />
              <span className='pl-2'>Loading...</span>
            </>
          ) : (
            'Update'
          )}
        </Button>
      </form>
      <div className="flex justify-between mt-5">
        <span 
          onClick={handleDelete} 
          className='text-red-700 cursor-pointer'
        >
          Delete Account
        </span>
        <span 
          onClick={handleSignOut} 
          className='text-red-700 cursor-pointer'
        >
          Sign Out
        </span>
      </div>
        { error ? (
          <Alert className='mt-5' color='failure'>
            { error.message || 'something went wrong!'}
          </Alert>
        ) : (
          ''
        )}
        { updateSuccess ? (
          <Alert className='mt-5' color='failure'>
            { 'User Update Successfully!' }
          </Alert>
        ) : (
          ''
        )}
    </div>
  )
}
