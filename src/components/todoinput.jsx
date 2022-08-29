import { useState } from "react"
import './todo.css'



export const TodoInput = ({isedit,getTodo,todoIn,setTodoIn})=>{
    
    

    return(
      <div className="input-div">
        <input type="search" placeholder="Write Task ✍️" value={todoIn} onChange={(e)=>{
            setTodoIn(e.target.value)
        }}/>
        <button disabled={todoIn.length === 0} className='button-33' onClick={()=>{
            getTodo(todoIn)
        }}>{isedit ? 'Edit':'ADD'}</button>
      </div>
    )
}