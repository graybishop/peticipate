import React, { useState } from "react"
import { useMutation } from '@apollo/client';
import { ADD_COMMENT } from '../../utils/mutations.js';


const CommentForm = ({biiggieId}) => {
    const [comment, setComment] = useState("");
    const [addComment] = useMutation(ADD_COMMENT);
    
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        let result = await addComment({
            variables: {
                body: comment,
                biiggieId
            }
        })
        console.log(result)
    }
    
    const handleChange = (event) => {
        const { value } = event.target;
        setComment(value)
    };

    console.log('comment form biiggieId', biiggieId, comment)
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