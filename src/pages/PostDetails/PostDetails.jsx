import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { TokenContext } from '../../context/token.context'
import Loading from '../../components/Loading/Loading'
import Post from '../../components/Post/Post'

export default function PostDetails() {
  const { id } = useParams()
  const { token } = useContext(TokenContext)

  function getPostDetails() {
    const options = {
      method: 'GET',
      url: `https://linked-posts.routemisr.com/posts/${id}`,
      headers: {
        token,
      }
    }

    return axios.request(options)
  }

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['get all details' , id],
    queryFn: getPostDetails
  })

  if (isLoading) {
    return <Loading />
  }

  if (isError) {
    console.log(error);
    return <h2>shof console</h2>
  }

  console.log(data);


  return (
    <div className='w-1/2 mx-auto py-6'>
      <Post post={data.data.post} isInHomePage={false} />

    </div>

  )
}
