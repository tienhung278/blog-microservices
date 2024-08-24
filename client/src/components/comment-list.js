const CommentList = ({comments}) => {
    const showComment = comment => {
        let text = '';
        switch (comment.status) {
            case 'pending':
                text = 'The comment is moderating'
                break;
            case 'rejected':
                text = 'The comment is hidden'
                break;
            default:
                text = comment.content;
        }

        return text;
    }

    return <ul>
        {comments?.length > 0 && comments.map(comment => <li key={comment.id}>{showComment(comment)}</li>)}
    </ul>
}

export default CommentList;