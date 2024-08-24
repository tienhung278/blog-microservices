import {useState} from "react";

const PostForm = ({onPostSubmit}) => {
    const initialFormValues = {
        title: ''
    }
    const [formData, setFormData] = useState(initialFormValues);

    const onChangeHandler = e => {
        setFormData(prev => ({...prev, [e.target.name]: e.target.value}));
    }

    const onSubmitHandler = e => {
        e.preventDefault();
        onPostSubmit(formData);
        setFormData(prev => prev = initialFormValues);
    }

    return <div>
        <h1>Create Post</h1>
        <form onSubmit={onSubmitHandler}>
            <div className="form-group">
                <label htmlFor='post-title'>Title</label>
                <input
                    id='post-title'
                    className="form-control"
                    name="title"
                    value={formData.title}
                    onChange={onChangeHandler}/>
            </div>
            <button className="btn btn-primary mt-3">Submit</button>
        </form>
    </div>
}

export default PostForm;