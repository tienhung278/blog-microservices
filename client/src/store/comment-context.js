import {createContext} from "react";

const CommentContext = createContext({
    setNewContent: () => {}
});

export default CommentContext;