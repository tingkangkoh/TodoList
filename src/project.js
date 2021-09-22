import {todo} from './todo.js';

let project = function(title){
    let todos=[];

    let addTodo=function(title,dueDate,priority){
        let todo1=todo(title,dueDate,priority);
        todos.push(todo1);
    }

    let getTodos=function(){
        return todos;
    }

    let checkExistTodo=function(title){
        let todo_find=todos.find(function(todo){
            return todo.getTitle==title;
        })
        let found=-1;
        for(let i=0;i<todos.length;i++){
            if(todos[i].getTitle()==title){
                found=i;
            }
        }
        if (found==-1){
            return false;
        }
        else{
            return true;
        }
    }
    let removeTodo=function(todo_title){
        console.log(todo_title)
        let index=-1;
        for(let i=0;i<todos.length;i++){
            if(todos[i].getTitle()==todo_title){

                index=i;
                break;
            };
        }
        console.log(index);
        todos.splice(index,1);
    }

    let getTodosLength=function(){
        return tudos.length;
    }

    let getTitle=function(){
        return title;
    }

    return {getTitle,addTodo,getTodos,getTodosLength,removeTodo,checkExistTodo}



    
}

export {project};