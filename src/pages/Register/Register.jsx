import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { zodResolver } from "@hookform/resolvers/zod"
import * as zod from 'zod'
import axios from 'axios'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { ClockLoader } from 'react-spinners'

export default function Register() {

  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)



  // ZOD validation
  const schema = zod.object({
    name: zod.string('name must be string').min(3, 'name min 3').max(20, 'name max 20'),
    email: zod.email('email must be valid'),
    password: zod.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/, 'pass atleast contaons 8 letters , 1 uppercsae , 1 lowercase , 1 symbols , 1 numbers'),
    rePassword: zod.string(),
    dateOfBirth: zod
      .date()
      .refine((value) => {

        return new Date().getFullYear() - value.getFullYear() > 18

      }, 'age must be 18 or above')
    ,
    gender: zod.enum(['male', 'female'], 'gender is required'),
  }).refine(function (values) {
    if (values.password == values.rePassword) {
      return true
    } else {
      setError('rePassword', { message: 'pass must match' })
    }
  })





  // RHF object
  const { handleSubmit, register, formState, setError } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      gender: 'male',
      dateOfBirth: ''
    },
    mode: 'all',
    resolver: zodResolver(schema)
  })


  // handle submit
  async function sendDataToRegister(values) {

    const ladoingID = toast.loading('loading.....')
    setIsLoading(true)

    try {
      const options = {
        method: 'POST',
        url: 'https://linked-posts.routemisr.com/users/signup',
        data: values
      }

      const { data } = await axios.request(options)
      console.log(data);
      toast.success('registerd successfully')

      setTimeout(() => {
        navigate('/login')
      }, 2000);

    } catch (error) {
      toast.error(error.response.data.error)

    } finally {
      toast.dismiss(ladoingID)
      setIsLoading(false)
    }
  }





  return (
    <div className=' py-8'>
      <h1 className='text-mainColor font-semibold text-4xl'>Register Form</h1>


      {/* {isSuccess && <h5 className='bg-green-500 px-4 py-3 rounded-md text-xl font-semibold mx-auto w-1/2'>registerd successfully</h5>} */}
      {/* {errorMsg && <h5 className='bg-red-500 px-4 py-3 rounded-md text-xl font-semibold mx-auto w-1/2'>{errorMsg}</h5>} */}

      <form onSubmit={handleSubmit(sendDataToRegister)} className='my-10 w-1/2 mx-auto'>
        {/* username */}
        <div className=''>
          <label className='text-lg font-semibold' htmlFor="name">username</label>
          <input {...register('name')} id='name' type="text" placeholder='username' className='input' />

          {formState.dirtyFields.name && formState.errors.name && <p className='text-red-500 my-4 text-lg font-semibold'> {formState.errors.name?.message} </p>}
        </div>

        {/* email */}
        <div className=''>
          <label className='text-lg font-semibold' htmlFor="email">email</label>
          <input  {...register('email')} type="text" placeholder='email' id='email' className='input' />

          {formState.dirtyFields.email && formState.errors.email && <p className='text-red-500 my-4 text-lg font-semibold'> {formState.errors.email?.message} </p>}

        </div>

        {/* pass */}
        <div className=''>
          <label className='text-lg font-semibold' htmlFor="password">password</label>
          <input {...register('password')} type="text" placeholder='password' id='password' className='input' />

          {formState.dirtyFields.password && formState.errors.password && <p className='text-red-500 my-4 text-lg font-semibold'> {formState.errors.password?.message} </p>}

        </div>

        {/* rePass */}
        <div className=''>
          <label className='text-lg font-semibold' htmlFor="rePassword">rePassword</label>
          <input {...register('rePassword')} type="text" placeholder='rePassword' id='rePassword' className='input' />

          {formState.dirtyFields.rePassword && formState.errors.rePassword && <p className='text-red-500 my-4 text-lg font-semibold'> {formState.errors.rePassword?.message} </p>}

        </div>

        {/* date */}
        <div className=''>
          <label className='text-lg font-semibold' htmlFor="birthOfDate">birth date</label>
          <input {...register("dateOfBirth", { valueAsDate: true })} type="date" placeholder='birth date' id='dateOfBirh' className='input' />

          {formState.dirtyFields.dateOfBirth && formState.errors.dateOfBirth && <p className='text-red-500 my-4 text-lg font-semibold'> {formState.errors.dateOfBirth?.message} </p>}

        </div>

        {/* gender */}
        <div className=''>
          <input {...register('gender')} type="radio" name='gender' value='male' className='' />
          <label className='text-lg font-semibold' htmlFor="male">male</label>
          <br />
          <input {...register('gender')} type="radio" name='gender' value='female' className='' />
          <label className='text-lg font-semibold' htmlFor="female">female</label>
        </div>

        <div className='flex justify-between items-center my-4 '>
          <button disabled={isLoading} className='btn'>
            {isLoading ? <ClockLoader size={30} /> : 'Register'}
          </button>
          <p>Already have an account ? <Link className='text-mainColor underline font-semibold' to={'/login'}>login now</Link></p>
        </div>
      </form>
    </div>
  )
}







