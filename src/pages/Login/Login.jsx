import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom';
import * as zod from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import axios from 'axios';
import toast from 'react-hot-toast';
import { useContext } from 'react';
import { TokenContext } from '../../context/token.context';



export default function Login() {

  const navigate = useNavigate()
  const {setToken} =useContext(TokenContext)


  const shcema = zod.object({
    email: zod.email('emaill must be valid'),
    password: zod.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/, 'pass atleast contaons 8 letters , 1 uppercsae , 1 lowercase , 1 symbols , 1 numbers')
  })


 const {register , handleSubmit , formState}= useForm({
    defaultValues:{
      email:'',
      password:''
    },
    mode:"all",
    resolver:zodResolver(shcema)
  })


  async function sendDataToLogin(values){

    const loadingId = toast.loading('loading.....')
  
    try {
      const options={
        method:'POST',
        url:'https://linked-posts.routemisr.com/users/signin',
        data:values
      }

      const {data} = await axios.request(options)
      setToken(data.token)
      localStorage.setItem('token' , data.token)
      toast.success('logged in successfully')

      setTimeout(() => {
        navigate('/home')
      }, 2000);
      
    } catch (error) {
      toast.error(error.response.data.error)
        
    }finally{
      toast.dismiss(loadingId)
    }
  }




  return (
    <div className=' py-8'>
      <h1 className='text-mainColor font-semibold text-4xl'>Register Form</h1>



      <form onSubmit={handleSubmit(sendDataToLogin)} className='my-10 w-1/2 mx-auto'>

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

   
   
       
        <div className='flex justify-between items-center my-4 '>
          {/* <button disabled={isLoading} className='btn'>
            {isLoading ? <ClockLoader size={30} /> : 'Register'}
          </button> */}
          <button className='btn'>aaaaaaa</button>
          <p>don't have an account ? <Link className='text-mainColor underline font-semibold' to={'/register'}>Register NOW</Link></p>
        </div>
      </form>
    </div>
  )
}
