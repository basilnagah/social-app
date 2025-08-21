
import { Dropdown, DropdownItem } from 'flowbite-react'
import { Ellipsis, Pencil, Trash } from 'lucide-react'
import React, { useContext } from 'react'
import { TokenContext } from '../../context/token.context'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import toast from 'react-hot-toast'
import moment from 'moment/moment'

export default function Comment({ name, photo, createdAt, isComment, content, id , commentID , postId}) {
    const STATIC_USER_IMAGE = 'https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png'

    const { userId, token } = useContext(TokenContext)
    const queryCLient = useQueryClient()

    function deletePost() {
        const options = {
            method: 'DELETE',
            url: `https://linked-posts.routemisr.com/posts/${postId}`,
            headers: {
                token
            }
        }

        return axios.request(options)
    }


    const { mutate: postMutate } = useMutation({
        mutationFn: deletePost,
        onSuccess: (res) => {
            console.log(res);
            queryCLient.invalidateQueries(['get all posts'])
            toast.success('post deleted successfully')

        },
        onError: (err) => {
            console.log(err);

        },
    })



    function deleteComment() {
        const options = {
            method: 'DELETE',
            url: `https://linked-posts.routemisr.com/comments/${commentID}`,
            headers: {
                token
            }
        }

        return axios.request(options)
    }


    const { mutate: commentMutate } = useMutation({
        mutationFn: deleteComment,
        onSuccess: (res) => {
            console.log(res);
            queryCLient.invalidateQueries(['get all posts'])
            toast.success('comment deleted successfully')

        },
        onError: (err) => {
            console.log(err);

        },
    })







    return (
        <>
            <div className={`${isComment ? 'bg-slate-300 ' : ''}  p-3 rounded-lg`}>
                <div className="post-header flex justify-between items-center">
                    <div className="left-part flex items-center gap-3">
                        <img onError={(e) => e.target.src = STATIC_USER_IMAGE} src={photo} className='w-12 h-12 rounded-full' alt={name} />

                        <div className="info">
                            <h3 className='text-lg font-semibold'>{name}</h3>
                            <h4>{ moment(createdAt).subtract(1, 'days').calendar() }</h4>
                        </div>
                    </div>
                    <div className="right-part">
                        {userId == id ?
                            <Dropdown className='bg-mainColor' dismissOnClick={false}>
                                <DropdownItem className='text-yellow-500 bg-white'>edit <Pencil /></DropdownItem>
                                <DropdownItem onClick={ isComment ? commentMutate : postMutate } className='text-red-500 bg-white'>delete <Trash /></DropdownItem>
                            </Dropdown> : ''}
                    </div>
                </div>


                {isComment && <p>{content}</p>}
            </div>


        </>

    )
}
