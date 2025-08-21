import { Forward, Heart, MessageCircle } from 'lucide-react'
import Comment from '../Comment/Comment'
import { Link } from 'react-router-dom'
import { usePost } from '../../hooks/usePost'

export default function Post({ post, isInHomePage }) {

   const {commentInput ,firstComment ,mutate ,isPending ,postHasImage ,user} =  usePost(post)



    return (
        <div className='post bg-white p-5 rounded-lg space-y-4'>


            <Comment postId={post.id} commentID={null}  id={user._id} name={user.name} photo={user.photo} createdAt={post.createdAt} isComment={false} content={null} />

            <div className='post-body'>
                <p>{post.body}</p>
                {postHasImage && <img src={post.image} className='w-full rounded-lg' alt="" />}
            </div>
            <div className="post-footer flex justify-between items-center p-4">
                <div className='flex gap-3'>
                    <Heart className='hover:fill-red-500 hover:text-red-500 transition-all cursor-pointer' />
                    <h4>Like</h4>
                </div>
                <div className='flex gap-3'>
                    <MessageCircle className=' cursor-pointer' />
                    <h4> {post.comments.length} comment</h4>
                </div>
                <div className='flex gap-3'>
                    <Forward className=' cursor-pointer' />
                    <h4>share</h4>
                </div>
            </div>



            <div className="relative">
                <input  ref={commentInput} type="search" id="default-search" className="block w-full p-4 ps-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-mainColor focus:border-mainring-mainColor dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-mainColor dark:focus:border-mainring-mainColor" placeholder="create your comment..." />
                <button disabled={isPending} onClick={mutate} type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    {isPending ? '...' : 'send'}
                </button>
            </div>


            {!isInHomePage && post.comments.map((comment) => <Comment postId={null} commentID={comment._id} id={comment.commentCreator._id} key={comment._id} name={comment.commentCreator.name} photo={comment.commentCreator.photo} createdAt={comment.createdAt} isComment={true} content={comment.content} />)}

            {isInHomePage && firstComment && <Comment postId={null} commentID={firstComment._id}t id={firstComment.commentCreator._id} name={firstComment.commentCreator.name} photo={firstComment.commentCreator.photo} createdAt={firstComment.createdAt} isComment={true} content={firstComment.content} />}

            {isInHomePage && <Link to={`/PostDetails/${post.id}`} className='text-mainColor font-semibold'>View More Comments</Link>}

        </div>
    )
}








