import { useState } from 'react'
import logo from './logo.svg'
import './App.css'


const ToDo = ({ todo,  removeTask, func, arr }) => {

  return (
    <div key={todo.id + todo.key} className="field">

        <input type="checkbox" className="radioButton" /> 
        <p class="txt"> {todo.task}</p>

      <div className="close" onClick={() => removeTask(todo.id, func, arr)}>
        <span className="line_rotate45"></span>
        <span className="line_rotate45"></span>
      </div>
    </div>
  );
};



const ToDoForm =({addTask, func, arr}) => {
  const [userInput, setUserInput] = useState("");

  const handleChange = (e) => {
    setUserInput(e.currentTarget.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(userInput, func, arr);
    setUserInput("");
  };
  
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  return(

    <form  onSubmit={handleSubmit}>

        <div className="addCross">
        <span className="line_rotate90"></span>
        <span className="line_rotate90"></span>
        <input type="submit" className="buttonPlus high_list" value="" />
        </div>
    <input type="text" className="inp" id='highInpId' placeholder="Добавить важных дел" onKeyDown={handleKeyPress}  onChange={handleChange} value={userInput}/>

    </form>
  )

}





function App() {

  const [todos, setTodos] = useState([]);
  const [todos2, setTodos2] = useState([]);



  const addTask = (userInput, func, arr) => {
    if (userInput) {
      const newItem = {
        id: Math.random().toString(36).substr(2, 9),
        task: userInput,
        complete: false
      };
      //setTodos([...todos, newItem]);
      func([...arr, newItem])
    }
  };

  const removeTask = (id, func, arr) => {
    //setTodos([...todos.filter((todo) => todo.id !== id)]);
    func([...arr.filter((todo) => todo.id !== id)]);
  };

  return(
    <div className="forma">

   <div className="highPrior">

    <p className="high">HIGH</p>   

    <ToDoForm  addTask={addTask} func={setTodos} arr={todos}/>
    {todos.map((todo) => {
        return (
          <ToDo
            todo={todo}
            func={setTodos}
            arr={todos}
            key={todo.id}
            removeTask={removeTask}
          />
        );
      })}
   </div>

   <div className="lowPrior">
   <p className="low">LOW</p>
     <ToDoForm  addTask={addTask} func={setTodos2} arr={todos2}/>
     {todos2.map((todo) => {
        return (
          <ToDo
            todo={todo}
            func={setTodos2}
            arr={todos2}
            key={todo.id}
            removeTask={removeTask}
          />
        );
      })}
   </div>

 </div>
  )
}

export default App

