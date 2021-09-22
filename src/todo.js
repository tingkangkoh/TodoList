let todo=function(title,dueDate,priority){
    let notes="";
    let done=false;
    let description="";
    let todo_title=title;
    let todo_dueDate=dueDate;
    let todo_priority=priority;
 

    let getTitle=function(){
        return todo_title;
    }

    let setTitle=function(title){
        todo_title=title;
    }

    let getDueDate=function(){
        return todo_dueDate;
    }

    let setDueDate=function(dueDate){
        todo_dueDate=dueDate;
    }

    let getPriority=function(){
        return todo_priority;
    }

    let setPriority=function(priority){
        todo_priority=priority;
    }

    let checkDone=function(){
        return done;
    }

    let toggleDone=function(){
        if (done==false){
            done=true;
        }
        else if (done==true){
            done=false;
        }
    }

    let printNotes=function(){
        return notes;
    }

    return {getTitle,setTitle,getDueDate,setDueDate,getPriority,setPriority,checkDone,toggleDone,printNotes};
}

export {todo};