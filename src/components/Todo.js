import "../style.scss"
import React, { useState }  from 'react';
const { v4: uuid } = require('uuid')

const Todo  = () => {
    const [todo, setTodo] = useState('');
    const [todos, setTodos] = useState([]);
    const [editToDoID, setEditTodoID] = useState('')

    const handleInput = (event) => {
        setTodo(event.target.value)
    }

    const handleAddTodo = () => {
        if (todo) {
            const newTodo = {
                content: todo.trim(),
                completed: false,
                id: uuid()
            }

            setTodos(prev => prev.concat(newTodo));
            setTodo('')
        }
    }

    const handleSaveEditTodo = () => {
        if (todo) {
            const editedTodo = {
                content: todo,
                completed: false,
                id: editToDoID
            }

            setTodos(todos.map(todo => todo.id === editToDoID ? editedTodo : todo))
            setTodo('')
        }
        setEditTodoID('')
    }

    const handleDeleteTodo = (deleteID) => {
        setTodos(todos.filter(todo => todo.id !== deleteID));
        setEditTodoID('') // needed if editing is enabled when deleting
    }

    const handleEditTodo = (editID) => {
        const editTodo = todos.find(todo => todo.id === editID);
        setTodo(editTodo.content)
        setEditTodoID(editTodo.id)
    }

    const handleToggleTodo = (toggleID) => {
        const toggleTodo = todos.find(todo => todo.id === toggleID);
        if(toggleTodo) {
            toggleTodo.completed
                ? setTodos(todos.map(todo => todo.id === toggleID ? {...toggleTodo, completed: false} : todo))
                : setTodos(todos.map(todo => todo.id === toggleID ? {...toggleTodo, completed: true} : todo))
        }
    }

    return (
        <div className="main">
            <input className="main__input" onChange={handleInput} value={todo} type="text" placeholder='type todo'/>
            <button className="main__btn" onClick={editToDoID ? handleSaveEditTodo : handleAddTodo}>{editToDoID ? 'save edit' : 'add todo'}</button>
            <ul className="main__ul">
                {todos.map(todoItem =>
                    <li className="main__ul__li" key={todoItem.id}>
                        <span className="main__ul__li__span"
                            onClick={() => handleToggleTodo(todoItem.id)} 
                            style={{textDecoration: todoItem.completed ? 'line-through' : 'none', marginRight: '5px'}}>
                            {todoItem.id === editToDoID ? todo : todoItem.content} 
                        </span>
                        <button className="main__ul__li__btn main__ul__li__btn--edit" onClick={() => handleEditTodo(todoItem.id)}>{todoItem.id === editToDoID ? 'revert' : 'edit'}</button>
                        <button className="main__ul__li__btn main__ul__li__btn--delete" onClick={() => handleDeleteTodo(todoItem.id)}>delete</button>
                    </li>
                )}
            </ul>
        </div>
    )
}

export default Todo;