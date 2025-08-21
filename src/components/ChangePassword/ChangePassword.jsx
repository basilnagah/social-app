import { useMutation } from '@tanstack/react-query'
import React, { useContext, useRef } from 'react'
import { TokenContext } from '../../context/token.context'
import axios from 'axios'
import toast from 'react-hot-toast'

export default function ChangePassword() {

    const currentPass = useRef('')
    const newPass = useRef('')
    const {token , setToken} = useContext(TokenContext)

    function handleChangePass(){
        const options={
            method:'PATCH',
            url:'https://linked-posts.routemisr.com/users/change-password',
            headers:{
                token
            },
            data:{
                password:currentPass.current.value,
                newPassword:newPass.current.value
            }
        }

        return axios.request(options)
    }


    const {mutate}= useMutation({
        mutationFn:handleChangePass,
        onSuccess:(res)=>{
            setToken(res.data.token)            
        },
        onError:()=>{
            toast.error('current pass is not correct')            
        }
    })

    return (
        <div className='bg-white p-8 rounded-lg'>
            <h3 className='text-2xl font-semibold'>Change Password </h3>
            <input ref={currentPass} type="text" className='input' placeholder='current passowrd' />
            <input ref={newPass} type="text" className='input' placeholder='new passowrd' />

            <button onClick={mutate} className='btn'>change</button>
        </div>
    )
}
