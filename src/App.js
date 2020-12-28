import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
//import {directive} from '@babel/types';

//import child component to parent component
import {TodoBanner} from "./features/TodoBanner";
import {TodoRow} from "./features/TodoRow";
import {TodoCreater} from "./features/TodoCreater";
import {VisibilityControl} from "./features/VisibilityControl";

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
      //newItemText: " "
      showCompleted : true
    }
  };

  /* changeStateData = () => {
    this.setState(
      {
        userName: this.state.userName == "Rk" ? "R1" : "R2"
      }
    )
  }; */

  updateNewTextValue=( event ) => {

    this.setState({ newItemText : event.target.value })
  };

  createNewToDo=(task)=>{
    if(!this.state.toDoItems.find(item => item.action === task)){
      this.setState({
        toDoItems : [...this.state.toDoItems, 
          {action: task, 
          done:false}]
          //newItemText: " "
      },
      //to store values in local storage, so that data persist even on page reload
      ()=>localStorage.setItem("todos",JSON.stringify(this.state))
      );
    }
  };

  toggleTodo=(todo)=>this.setState(
    {
      toDoItems : this.state.toDoItems.map(
        item =>  item.action === todo.action ? { ...item, done: !item.done} : item
      )
    }
  );

  todoTableRows = (doneValue )=> this.state.toDoItems
  .filter(item => item.done===doneValue) 
  .map(
    item => 
      <TodoRow key={item.action} item={item} callback={this.toggleTodo} />
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

  //load/Get the kept data
  componentDidMount=()=>{
    //localStorage.removeItem("todos");
    let data = localStorage.getItem("todos");
    this.setState(data != null ? JSON.parse(data) :
    {userName: "Rk",
      //course:"React"
      toDoItems: [
        { action:"Buy a flower", done: false },
        { action:"Do workout", done: true },
        { action:"Study", done: false },
        { action:"Call a friend", done: false }
      ],
      //newItemText: " "
      showCompleted : true
    }
    );
  }


  render=()=>    
    <div>
      <TodoBanner name={this.state.userName} tasks={this.state.toDoItems} />

        <div className="container-fluid">
        <TodoCreater callback={this.createNewToDo}/>
        
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Todo task name</th>
              <th>Done</th>
            </tr>
          </thead>
          <tbody>
            {/** show incomplete tasks */}
            {this.todoTableRows(false)}
          </tbody>

        </table>

        <div className="bg-danger text-white text-center b-2" >
            <VisibilityControl description="Completed Tasks" 
                isChecked={this.state.showCompleted}
                callback={(checked)=> this.setState({showCompleted:checked})}/>
        </div>
          {this.state.showCompleted &&
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>Task Name</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                  {/**show completed tasks */}
                  {this.todoTableRows(true)}
              </tbody>
            </table>
          }
      </div>
    </div>    
  

}

//export default App;
