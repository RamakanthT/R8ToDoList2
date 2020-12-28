import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {directive} from '@babel/types';

//import child component to parent component
import {TodoBanner} from "./features/TodoBanner";
import {TodoRow} from "./features/TodoRow";
import {TodoCreater} from "./features/TodoCreater";

/* function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
} */

export default class App extends Component{

  constructor(props){
    super(props);
    this.state={
      userName: "Rk",
      //course:"React"
      toDoItems: [
        { action:"Buy a flower", done: false },
        { action:"Do workout", done: true },
        { action:"Study", done: false },
        { action:"Call a friend", done: false }
      ],
      newItemText: " "
    }
  };

  changeStateData = () => {
    this.setState(
      {
        userName: this.state.userName == "Rk" ? "R1" : "R2"
      }
    )
  };

  updateNewTextValue=( event ) => {

    this.setState({ newItemText : event.target.value })
  };

  createNewToDo=()=>{
    if(!this.state.toDoItems.find(item => item.action === this.state.newItemText)){
      this.setState({
        toDoItems : [...this.state.toDoItems, 
          {action: this.state.newItemText, 
          done:false}],
          newItemText: " "
      });
    }
  };

  toggleTodo=(todo)=>this.setState(
    {
      toDoItems : this.state.toDoItems.map(
        item =>  item.action === todo.action ? { ...item, done: !item.done} : item
      )
    }
  );

  todoTableRows = ()=> this.state.toDoItems.map(
    item => 
      <tr key={item.action}>
        <td>{item.action}</td>
        <td><input type="checkbox" checked={item.done} onChange={()=>this.toggleTodo(item)} />
        </td>
      </tr>
    );
  
 /*  changeStateDate(){    
    this.setState(
      {
        userName: this.state.userName == "Rk" ? "R1" : "R2"
      }
    )   
  } */

 /*  render(){
    return(
    <div>
      <h4 className="bg-primary text-white text-center p-2">
        Hello RK<br/>
        {this.state.userName} {this.state.course} course
        <button className="btn btn-danger m-2" 
         onClick={this.changeStateDate}>
           Change the state
        </button>
      </h4>
    </div>
    );
  } */

  render=()=>    
    <div>
      <h4 className="bg-primary text-white text-center p-2">        
        {this.state.userName}'s Todo list <br/>
       {/*  <button className="btn btn-danger m-2" 
         onClick={this.changeStateData}>
           Change the state
        </button> */}

        ({
          this.state.toDoItems.filter(t=>!t.done).length
        }) incomplete tasks
      </h4>
      <div className="container-fluid">
        <div className="m-1">
          <input className="form-control"
              value={ this.state.newItemText}
              onChange={this.updateNewTextValue} />

          <button className="btn btn-danger mt-1"
                onClick={this.createNewToDo} >
                  Add a new task 
          </button>
        </div>
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Todo task name</th>
              <th>Done</th>
            </tr>
          </thead>
          <tbody>
            {this.todoTableRows()}
          </tbody>

        </table>

      </div>
    </div>    
  

}

//export default App;
