import axios from 'axios'
import { useContext, useState } from 'react'
import { TokenContext } from '../../context/token.context'
import Loading from '../../components/Loading/Loading'
import { Ellipsis, Forward, Heart, MessageCircle } from 'lucide-react'
import Post from '../../components/Post/Post'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import CreatePost from '../../components/CreatePost/CreatePost'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function Home() {

  

  const { token } = useContext(TokenContext)
  const [page ,setPage] = useState(1)
  const queryCLient = useQueryClient()

  function handleNextPage(){
    let nextPage = page+1
    setPage(nextPage)

    queryCLient.invalidateQueries(['get all posts'])

  }
 


  function getAllPosts() {
    const options = {
      method: 'get',
      url: `https://linked-posts.routemisr.com/posts?limit=5&sort=-createdAt&page=${page}`,
      headers: {
        token
      }
    }

    return axios.request(options)
  }


  const { data, error, isLoading, isError } = useQuery({
    queryKey: ['get all posts'],
    queryFn: getAllPosts,
    refetchOnMount:true,
  })


  if (isLoading) {
    return <div className='w-1/2 mx-auto py-8'>
      <Skeleton className='h-80 my-6' baseColor='#ddd' count={8}/>
    </div>
  }

  if (isError) {

    console.log(error);
    return <h2>shof console</h2>
  }


  return (
    <>

      <div className='w-1/2 mx-auto p-8 space-y-5'>
      <CreatePost/>

        {data.data.posts.map((post) => <Post key={post.id} post={post} isInHomePage={true} />)}


        <div className='flex justify-between items-center'>
          <button className='btn'>ayhagaa</button>
          <button onClick={handleNextPage} className='btn'>next</button>
        </div>
      </div>
    </>
  )
}
