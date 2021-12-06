import React, { useState } from "react"
import { useMutation } from '@apollo/client';
import { ADD_COMMENT } from '../../utils/mutations.js';


const CommentForm = ({biiggieId, refetch}) => {
    const [comment, setComment] = useState("");
    const [addComment] = useMutation(ADD_COMMENT);
    
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            await addComment({
                variables: {
                    body: comment,
                    biiggieId
                }
            })
            refetch()
            
        } catch (error) {
            console.error(error)
        }
    }
    
    const handleChange = (event) => {
        const { value } = event.target;
        setComment(value)
    };

    console.log('comment form biiggieId', biiggieId, comment)
    return(
        <form onSubmit={handleFormSubmit} className='flex flex-col items-center gap-2 flex-1 w-full'>
            <textarea
            className="custom-inputs p-4 w-full"
            placeholder="Comment"
            type="text"
            value={comment}
            name="comment"
            onChange={handleChange}
            />
            <button type="submit" className='bg-orange-primary text-white py-2 px-4 rounded-lg shadow font-semibold text-center hover:bg-orange-hover'>Submit Comment</button>
        </form>
    )

}
export default CommentForm;