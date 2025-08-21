import React, { useContext } from 'react'
import { TokenContext } from '../../context/token.context'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import Loading from '../../components/Loading/Loading'
import Post from '../../components/Post/Post'
import ChangePassword from '../../components/ChangePassword/ChangePassword'

export default function Profile() {

  const {token} = useContext(TokenContext)


  function getUserPosts(){
    const options={
      method:'GET',
      url:`https://linked-posts.routemisr.com/users/664bcf3e33da217c4af21f00/posts`,
      headers:{
        token
      }
    }

    return axios.request(options)
  }


 const {data ,isLoading} = useQuery({
    queryKey:['user posts'],
    queryFn:getUserPosts
  })


  if(isLoading){
    return <Loading/>
  }


  

  return (
    <>

    
    <div className='w-1/2 mx-auto py-8 space-y-4'>
    <ChangePassword/>
      {data.data.posts.map((post)=> <Post key={post.id} post={post} isInHomePage={true} />)}

      </div>    
    </>
  )
}
