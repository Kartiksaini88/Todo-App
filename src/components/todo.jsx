import { nanoid } from "nanoid"
import { useEffect, useRef, useState } from "react"
import { TodoInput } from "./todoinput"
import './todo.css'
import Lottie from 'react-lottie'
import pencil from './pencil.json'

export const Todo = () => {
   
    const [todo, setTodo] = useState([])
    const [todoIn, setTodoIn] = useState('')
    const [isedit, setisedit] = useState(false)
    const [editid, setiseditid] = useState(0)
    const container = useRef(null)

    const penciloption = {
        loop : true,
        autoplay : true,
        animationData: pencil,
        rendererSettings:{
            preserverAspectRatio:"xMidYMid slice"
        }
    }


    const getTodo = (data) => {
      if(isedit){
        if (editid) {
            const editTodo = todo.find((t) => t.id === editid)
            const updateTodo = todo.map((t) => t.id === editTodo.id ? (
                t = { id: t.id, txt: todoIn }) : { id: t.id, txt: t.txt }
            )
            setTodo(updateTodo)
            setiseditid(0)
            setTodoIn('')
            setisedit(!isedit)
            return;
        }
      }

        if (todoIn !== '') {
            let payload = {
                txt: data,
                iscompleted: false,
                id: nanoid(3)
            }
            setTodo([
                ...todo, payload
            ])
            setTodoIn('')
        }
    }

    const deletet = (id) => {
       setTodo(todo.filter((e) => e.id !== id))
    }

    const toggle = (e) => {
        setTodo(
            todo.map((item) => {
                if (item.id == e.id) {
                    return { ...item, iscompleted: !item.iscompleted }
                }       
                return item
            })
        )   
    }

    const edit = (id) => {
        const edit_todo = todo.find((e) => e.id == id)
        setTodoIn(edit_todo.txt)
        setiseditid(edit_todo.id)
        setisedit(!isedit)
    }


    return (
        <>
        <h2 className="h2">Todo List</h2>
        <div className="main-div">
            <TodoInput isedit={isedit} todoIn={todoIn} setTodoIn={setTodoIn} getTodo={getTodo}></TodoInput>
            <div className="margin-top-div">
            {todo.length!==0?<>
            {todo.map((e,i)=>(<div className={e.iscompleted ? "done-flex-div":'flex-div'}>
                <div>{i+1}.{e.txt}</div>
                <div><button className="button-34" onClick={() => {
                    toggle(e)
                }}>Toggle</button><button className="button-34" onClick={() => {
                    edit(e.id)
                }}>Edit</button><button className="button-34" onClick={() => {
                    deletet(e.id)
                }}>Delete</button></div>
            </div>))}
            </>:<Lottie options={penciloption} height={300} width={300}></Lottie>}
        </div>
        </div>
        </>
    )
}