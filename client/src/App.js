import './App.css';
import PostForm from "./components/post-form";
import {useEffect, useState} from "react";
import axios from "axios";
import PostList from "./components/post-list";
import CommentContext from "./store/comment-context";

function App() {
    const [newPost, setNewPost] = useState(null);
    const [newContent, setNewContent] = useState(null);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        getPosts();
    }, [newPost, newContent]);

    const getPosts = async () => {
        const res = await axios.get('http://localhost:4002/posts');
        setPosts(res.data);
    }

    const onPostSubmit = async formData => {
        const res = await axios.post('http://localhost:4000/posts', formData);
        const data = res.data;
        setNewPost(data);
    }

    const contextValue = {
        setNewContent
    }

    return <div className="container">
        <CommentContext.Provider value={contextValue}>
            <PostForm onPostSubmit={onPostSubmit}/>
            <PostList posts={posts}/>
        </CommentContext.Provider>
    </div>;
}

export default App;
