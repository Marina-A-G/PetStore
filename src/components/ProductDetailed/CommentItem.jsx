/* eslint-disable no-unused-vars */
import { useQuery } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import { api } from '../../classes/APIclass'
import commentStyles from './productDetailed.module.scss'

export function CommentItem({ comment }) {
  const token = useSelector((store) => store.token)
  // getUserDataByID
  // console.log('comment.author ', comment.author)
  // console.log('token ', token)

  const { data: userData, isLoading } = useQuery({
    queryKey: [comment.author],
    queryFn: () => api.getUserDataByID(comment.author, token),
    // onSuccess: (response) => {      console.log(comment.author, ' ', response)    },
    onError: (errResp) => {
      console.log(`errMessage: ${errResp.message}, errName: ${errResp.name}`)
    },
  })

  if (isLoading) return <p>Уточняем данные...</p>

  return (
    <div className={commentStyles.commentContainer}>
      <div className={commentStyles.commentAuthor}>{userData.name}</div>
      <div className={commentStyles.commentText}>{comment.text}</div>
    </div>
  )
}

/*

      */
