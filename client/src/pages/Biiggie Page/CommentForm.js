import React, { useState } from "react"
// import { Link } from "react-router-dom";


const CommentForm = (params) => {

    // function comment() {
    const [comment, setComment] = useState("");

    const handleFormSubmit = (event) => {
        event.preventDefault();
    }

    const handleChange = (event) => {
        console.log(event)
        const { name, value } = event.target;
        console.log(name,value)
        setComment(value)
        // setFormState({
        //   ...formState,
        //   [comment]: value,
        // });
      };
    return(
        <form onSubmit={handleFormSubmit}>
            <input
            className="block border border-grey-light w-full p-3 rounded mb-4"
            placeholder="Comment"
            type="text"
            value={comment}
            name="comment"
            onChange={handleChange}
            />
            <input type="submit" />


        </form>
    )

}
export default CommentForm;