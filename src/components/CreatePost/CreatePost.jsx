import { Image, X } from 'lucide-react'
import React, { useContext, useRef, useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { TokenContext } from '../../context/token.context'
import axios from 'axios'
import toast from 'react-hot-toast'

export default function CreatePost() {
    const [modalOpen, setModalOpen] = useState(false)
    const [image, setImage] = useState('')

    const imageInput = useRef('')
    const bodyInput = useRef('')

    const { token } = useContext(TokenContext)

    const queryClient = useQueryClient()

    function handleModalOpen() {
        setModalOpen(true)
    }
    function handleCloseModal() {
        setModalOpen(false)
    }
    function handleImage() {
        setImage(URL.createObjectURL(imageInput.current.files[0]))


    }
    function handleCloseImage() {
        setImage(null)
    }


    function handleCreatePost() {
        const myForm = new FormData()
        if (bodyInput.current.value) {
            myForm.append('body', bodyInput.current.value)
        }
        if (imageInput.current.files[0]) {
            myForm.append('image', imageInput.current.files[0])
        }
        const options = {
            method: 'POST',
            url: 'https://linked-posts.routemisr.com/posts',
            headers: {
                token
            },
            data: myForm
        }

        return axios.request(options)
    }

    const { mutate } = useMutation({
        mutationFn: handleCreatePost,
        onSuccess:(resp)=>{
            console.log(resp);
            queryClient.invalidateQueries(['get all posts'])
            toast.success('post created successfully')

            bodyInput.current.value=''
            setImage('')
            
        },
        onError:(err)=>{
            toast.error(err.response.data.error)
            
        }
    })


    //     const { mutate } = useMutation({
    //     mutationFn: handleCreateComment
    // })




    return (
        <div className='bg-white rounded-xl'>

            <h2 className='font-semibold text-lg border-b p-3 border-slate-300'>Post Something</h2>

            <div className='p-3'>
                {!modalOpen && <div onClick={handleModalOpen}>
                    <input type="text" placeholder='what is in your mind...' className='input bg-slate-200' />
                </div>}

                {modalOpen && <div className='space-y-5'>
                    <input ref={bodyInput} type="text" placeholder='what is in your mind...' className='input bg-slate-200' />


                    {image && <div className='relative'>
                        <img className='rounded-lg w-full' src={image} alt="" />
                        <div onClick={handleCloseImage} className='absolute top-3 right-3 bg-red-500 p-2 text-white rounded-lg'>
                            <X />
                        </div>
                    </div>}

                    <div className='flex justify-between items-center'>
                        <label>
                            <input ref={imageInput} onChange={handleImage} type="file" className='hidden' />


                            <div className='flex gap-3 text-mainColor'>
                                <Image />
                                upload your image
                            </div>
                        </label>

                        <div>
                            <button onClick={handleCloseModal} className='btn bg-red-500 mx-4'>cancel </button>
                            <button onClick={mutate} className='btn'>post</button>
                        </div>
                    </div>
                </div>}
            </div>
        </div>
    )
}
