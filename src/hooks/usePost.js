import { useContext, useRef } from "react"
import { TokenContext } from "../context/token.context"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import toast from "react-hot-toast"

export function usePost(post) {




    const user = post.user
    const postHasImage = !!post.image
    const firstComment = post.comments[0]
    const { token } = useContext(TokenContext)
    const queryClient = useQueryClient()
    const commentInput = useRef('')

    function createComment() {
        const options = {
            method: 'POST',
            url: 'https://linked-posts.routemisr.com/comments',
            data: {
                content: commentInput.current.value,
                post: post.id
            },
            headers: {
                token,
            }
        }

        return axios.request(options)

    }



    // mutate usemutation
    const { mutate, isPending } = useMutation({
        mutationFn: createComment,
        onSuccess: (resp) => {
            console.log(resp);
            toast.success('comment created successfully')

            commentInput.current.value = ''

            queryClient.invalidateQueries(['get all posts'])
        },
        onError: (error) => {
            toast.error(error.response.data.error)

        },
    })




    return {
        user,
        postHasImage,
        firstComment,
        commentInput,
        mutate,
        isPending
    }

}