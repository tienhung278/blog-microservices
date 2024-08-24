import PostItem from "./post-item";

const PostList = ({posts}) => {
    return <div className="row">
        {posts.length > 0 && posts.map(post => <PostItem key={post.id} post={post} />)}
    </div>
}

export default PostList;