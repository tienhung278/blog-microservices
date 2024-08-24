import {useState} from "react";

const CommentForm = ({onContentSubmit}) => {
    const initalFormValue = {
        content: ''
    }
    const [formData, setFormData] = useState(initalFormValue);

    const onChangeHandler = e => {
        setFormData(prev => ({...prev, [e.target.name]: e.target.value}));
    }
    const onSubmitHandler = e => {
        e.preventDefault();
        onContentSubmit(formData);
        setFormData(prev => prev = initalFormValue);
    }

    return <div>
        <form onSubmit={onSubmitHandler}>
            <div className="form-group">
                <label htmlFor="comment-content">Comment</label>
                <input
                    id="comment-content"
                    className="form-control"
                    name="content"
                    value={formData.content}
                    onChange={onChangeHandler}/>
            </div>
            <button className="btn btn-primary mt-3 mb-3" type="submit">Submit</button>
        </form>
    </div>
}

export default CommentForm;