import commentStyles from './productDetailed.module.scss'

export function CommentItem({ comment }) {
  return (
    <div className={commentStyles.commentContainer}>
      <div className={commentStyles.commentAuthor}>{comment.author}</div>
      <div className={commentStyles.commentText}>{comment.text}</div>
    </div>
  )
}
