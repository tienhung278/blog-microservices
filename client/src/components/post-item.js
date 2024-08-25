import CommentForm from "./comment-form";
import {useContext} from "react";
import axios from "axios";
import CommentList from "./comment-list";
import CommentContext from "../store/comment-context";

const PostItem = ({post}) => {
    const context = useContext(CommentContext);

    const onContentSubmit = async formData => {
        let res = await axios.post(`http://comment-service:4001/posts/${post.id}/comments`, formData);
        context.setNewContent(res.data);
    }

    return <div className="col-2 m-3 card" key={post.id}>
        <h2>{post.title}</h2>
        <CommentList comments={post.comments}/>
        <CommentForm onContentSubmit={onContentSubmit}/>
    </div>
}

export default PostItem;