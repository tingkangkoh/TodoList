import {project} from './project.js';
import {todo} from './todo.js'
import { compareAsc, format } from 'date-fns';
import {projectController} from './projectController.js';
function Dom(projectController){



   

    projectController.addProject("home");

    let home=projectController.getProject("home");

    home.addTodo("wash dishes",new Date("9/16/2021"),"Low")
    home.addTodo("buy groceries", new Date("9/5/2021"),"High");


    


    let main=function(){


        let container=document.querySelector("container");
        let header=document.createElement("header");
        let title=document.createElement("h1");
        title.textContent="Todo List";
        header.appendChild(title);
        container.appendChild(header);

        let hr=document.createElement("hr");
        container.appendChild(hr);

        let main=document.createElement("main");

        let left=document.createElement("div");
        left.classList.add("main-left");
        left.textContent="Projects";
        generateLeft(left);
        main.appendChild(left);

        let center=document.createElement("div");
        center.classList.add("main-center");
        //center.textContent="Project Name"
        main.appendChild(center);

        container.appendChild(main);
    }

    let generateToday=function(div){

       
        let Div=document.createElement("div");
            Div.setAttribute("projectdiv","today");

            let calendar_icon=document.createElement("i");
            calendar_icon.classList.add("fas","fa-calendar-alt");
            let button=document.createElement("span");
            button.textContent= "Today";
            button.classList.add("project-button");

            Div.appendChild(calendar_icon);
       
            Div.appendChild(button);

           
            //div.appendChild(Div);

        var today= new Date();
        today.setHours(0,0,0,0);

        for(let j=0;j<projectController.getLength();j++){
            let currentProject=projectController.getProjectAt(j);
            let todos=currentProject.getTodos();
            for(let i=0;i<todos.length;i++){
                var todo_date=todos[i].getDueDate();
                todo_date.setHours(0,0,0,0)
                if(todo_date.valueOf()==today.valueOf()){ //todos due date== today's date
                    let outsideDiv=document.createElement("div");
                    outsideDiv.classList.add("todo-list");
                    let checkSpan=document.createElement("span");
                    checkSpan.classList.add("todo-check");
                    let check=document.createElement("i");
                    if(todos[i].checkDone()==true){
                        check.classList.add("far","fa-check-square");
                        checkSpan.classList.add("todo-check-green");
                    }
                    else{
                        check.classList.add("far","fa-square");
                        checkSpan.classList.add("todo-check-red");
                    }
                    checkSpan.appendChild(check);
                    outsideDiv.appendChild(checkSpan);
                    let button=document.createElement("button");
                    button.textContent=todos[i].getTitle()+" " +format(todos[i].getDueDate(),"MM/dd/yyyy");
                    button.classList.add("todo-button");
                    button.addEventListener("click",function(){
                        genMiddle(currentProject,todos[i]);
                    })
                    outsideDiv.appendChild(button);
    
                    let remove=document.createElement("button");
                    remove.classList.add("remove-todo")
                    let fa=document.createElement("i");
                    fa.classList.add("fas");
                    fa.classList.add("fa-trash-alt");
                    remove.appendChild(fa);
                    remove.setAttribute("todo",todos[i].getTitle());
                    remove.addEventListener("click",function(){
                        let todo_title=this.getAttribute("todo");
                        currentProject.removeTodo(todo_title);
                        var project_title=currentProject.getTitle();
                        //generateCenter(project_title);
                        var left=document.querySelector(".main-left");
                        generateLeft(left);
                    })
                    outsideDiv.appendChild(remove);
                    //center.appendChild(outsideDiv);
                    Div.appendChild(outsideDiv);
                        //print todo 
                }
    
            }
        }
      

        div.appendChild(Div);
    }

    let genMiddle=function(currentProject,todo){

        let center=document.querySelector(".main-center");
        let outerDiv=document.createElement("div");
        outerDiv.classList.add("todo-outer-div");
        let mainDiv=document.createElement("div");
        mainDiv.classList.add("todo-div");
        let leftCenter=document.createElement("div");
        leftCenter.classList.add("center-buttons");
        let checkSpan=document.createElement("span");
        checkSpan.classList.add("todo-check");
        let check=document.createElement("i");
        if(todo.checkDone()==true){
            check.classList.add("far","fa-check-square");
            checkSpan.classList.add("todo-check-green");
            outerDiv.classList.add("todo-list-green");
        }
        else{
            check.classList.add("far","fa-square");
            checkSpan.classList.add("todo-check-red");
            outerDiv.classList.add("todo-list-red");
            
        }
        checkSpan.appendChild(check);
        checkSpan.addEventListener("click",function(){
            todo.toggleDone();
            genMiddle(currentProject,todo);
            var left=document.querySelector(".main-left");
            generateLeft(left);
        })

        leftCenter.appendChild(checkSpan);
        outerDiv.appendChild(leftCenter);
        center.innerHTML="";
        let project_label=document.createElement("label");
        project_label.textContent="Project: ";
        let project_title=currentProject.getTitle();
        let heading=document.createElement("h2");
        heading.textContent=project_title;
        mainDiv.appendChild(project_label);
        mainDiv.appendChild(heading);
        
        let br1=document.createElement("br");
        let todo_label=document.createElement("label");
        todo_label.textContent="Todo: ";
        let todo_title=document.createElement("p");
        todo_title.textContent=todo.getTitle();
        mainDiv.appendChild(br1);

        mainDiv.appendChild(todo_label);
        mainDiv.appendChild(todo_title);
        
        let br2=document.createElement("br");
        let date_label=document.createElement("label");
        date_label.textContent="Due Date: ";
        let todo_date=document.createElement("p");
        todo_date.classList.add("todo-date");
        todo_date.textContent=format(todo.getDueDate(),"yyyy-MM-dd");

        let br3=document.createElement("br");
        let priority_label=document.createElement("label");
        priority_label.textContent="Priority: ";
        let todo_priority=document.createElement("p");

        todo_priority.textContent=todo.getPriority();

        
        mainDiv.appendChild(br2);
        mainDiv.appendChild(date_label);
        mainDiv.appendChild(todo_date);
        mainDiv.appendChild(br3);
        mainDiv.appendChild(priority_label);
        mainDiv.appendChild(todo_priority);

        let br4=document.createElement("br");
        let edit_button=document.createElement("button");
        edit_button.textContent="Edit ";
        edit_button.classList.add("edit-button");
        let edit_icon=document.createElement("i");
        edit_icon.classList.add("far","fa-edit");
        edit_button.appendChild(edit_icon);
        mainDiv.appendChild(br4);
        mainDiv.appendChild(edit_button);
        edit_button.addEventListener("click",function(){
            generateMiddleEdit(currentProject,todo);
        })

        outerDiv.appendChild(mainDiv);
        center.appendChild(outerDiv);

    }

    let generateMiddleEdit=function(currentProject,todo){
        
        let center=document.querySelector(".main-center");
        center.innerHTML="";
        let outerDiv=document.createElement("div");
        outerDiv.classList.add("todo-outer-div");
        let mainDiv=document.createElement("div");
        mainDiv.classList.add("todo-div");
        let leftCenter=document.createElement("div");
        leftCenter.classList.add("center-buttons");

        outerDiv.appendChild(leftCenter);
        let project_label=document.createElement("label");
        project_label.textContent="Project: ";
        let project_title=currentProject.getTitle();
        let heading=document.createElement("h2");
        heading.textContent=project_title;
        mainDiv.appendChild(project_label);
        mainDiv.appendChild(heading);
        
        let br1=document.createElement("br");
        let todo_label=document.createElement("label");
        todo_label.textContent="Todo: ";
        let todo_title=document.createElement("input");
        todo_title.classList.add("todo-title")
        todo_title.value=todo.getTitle();
        mainDiv.appendChild(br1);

        mainDiv.appendChild(todo_label);
        mainDiv.appendChild(todo_title);
        
        let br2=document.createElement("br");
        let date_label=document.createElement("label");
        date_label.textContent="Due Date: ";
        let todo_date=document.createElement("input");
        todo_date.setAttribute("type","date");
        todo_date.classList.add("todo-date");
        todo_date.value=format(todo.getDueDate(),"yyyy-MM-dd");

        let br3=document.createElement("br");
        let priority_label=document.createElement("label");
        priority_label.textContent="Priority: ";
        let todo_priority=document.createElement("select");

        todo_priority.classList.add("todo-priority");
        
        let priority_low=document.createElement("option")
        priority_low.setAttribute("value","Low");
        priority_low.textContent="Low";

        let priority_med=document.createElement("option")
        priority_med.setAttribute("value","Medium");
        priority_med.textContent="Medium";

        let priority_high=document.createElement("option")
        priority_high.setAttribute("value","High");
        priority_high.textContent="High";

        todo_priority.appendChild(priority_low);
        todo_priority.appendChild(priority_med);
        todo_priority.appendChild(priority_high);

        todo_priority.value=todo.getPriority();

        
        mainDiv.appendChild(br2);
        mainDiv.appendChild(date_label);
        mainDiv.appendChild(todo_date);
        mainDiv.appendChild(br3);
        mainDiv.appendChild(priority_label);
        mainDiv.appendChild(todo_priority);

        let br4=document.createElement("br");
        let save_button=document.createElement("button");
        save_button.textContent="Save";
        save_button.classList.add("save-button");
        let save_icon=document.createElement("i");
        save_icon.classList.add("far","fa-save");
        save_button.appendChild(save_icon);

        save_button.addEventListener("click",function(){
            let title=document.querySelector(".todo-title").value;
            let date=document.querySelector(".todo-date").value;
            let priority=document.querySelector(".todo-priority").value;
            todo.setTitle(title);
            todo.setDueDate(new Date(date));
            todo.setPriority(priority);
            genMiddle(currentProject,todo);
            let left=document.querySelector(".main-left");
            generateLeft(left);
        })

        mainDiv.appendChild(br4);
        mainDiv.appendChild(save_button);
        outerDiv.appendChild(mainDiv);
        center.appendChild(outerDiv);



    }



    let generateTodoList=function(currentProject,div){

        let left=document.querySelector(".main-left");
        //generateLeft(left);
        let center=div;
        let todos=currentProject.getTodos();

        
        
        for (let i=0;i<todos.length;i++){
            let outsideDiv=document.createElement("div");
            outsideDiv.classList.add("todo-list");
            let checkSpan=document.createElement("span");
            checkSpan.classList.add("todo-check");
            let check=document.createElement("i");
            if(todos[i].checkDone()==true){
                check.classList.add("far","fa-check-square");
                checkSpan.classList.add("todo-check-green");
            }
            else{
                check.classList.add("far","fa-square");
                checkSpan.classList.add("todo-check-red");
            }
            checkSpan.appendChild(check);
            // checkSpan.addEventListener("click",function(){
            //     todos[i].toggleDone();
            //     var left=document.querySelector(".main-left");
            //     generateLeft(left);
            // })
            outsideDiv.appendChild(checkSpan);
            let button=document.createElement("button");
            console.log(todos[i].getDueDate());
            button.textContent=todos[i].getTitle()+" " +format(todos[i].getDueDate(),"MM/dd/yyyy");
            button.classList.add("todo-button");
            button.addEventListener("click",function(){
               genMiddle(currentProject,todos[i]);
            })
            outsideDiv.appendChild(button);

            let remove=document.createElement("button");
            remove.classList.add("remove-todo")
            let fa=document.createElement("i");
            fa.classList.add("fas");
            fa.classList.add("fa-trash-alt");
            remove.appendChild(fa);
            remove.setAttribute("todo",todos[i].getTitle());
            remove.addEventListener("click",function(){
                let todo_title=this.getAttribute("todo");
                currentProject.removeTodo(todo_title);
                var project_title=currentProject.getTitle();
                //generateCenter(project_title);
                var left=document.querySelector(".main-left");
                generateLeft(left);
            })
            outsideDiv.appendChild(remove);
            center.appendChild(outsideDiv);
        }


        let toDoButton=document.createElement("button");
        toDoButton.classList.add("add-todo");
        let todoSpan=document.createElement("span");
        todoSpan.textContent="Todo";
        let add_todo_icon=document.createElement("i");
        add_todo_icon.classList.add("fas","fa-plus");
        
        toDoButton.appendChild(add_todo_icon);
        toDoButton.appendChild(todoSpan);

        toDoButton.addEventListener("click",function(){
            console.log(currentProject.getTitle());
            this.hidden=true;
            let addToDoBox=document.createElement("div");
            addToDoBox.classList.add("add-todo-box")  
            let input_label=document.createElement("label");
            input_label.textContent="Todo Title: ";         
            let input=document.createElement("input");
            input.id="newTodoId"
            addToDoBox.appendChild(input_label);
            addToDoBox.appendChild(input);
            let br1= document.createElement("br");
            let br2= document.createElement("br");
            var dateInput=document.createElement("input");
            var date_label=document.createElement("label");
            date_label.textContent="Due Date: ";
            dateInput.setAttribute("type","date");
            dateInput.id="todoDueDate"

           


            addToDoBox.appendChild(br1);
            addToDoBox.appendChild(date_label);
            addToDoBox.appendChild(dateInput);
            addToDoBox.appendChild(br2);

            let priority=document.createElement("select");
            let priority_label=document.createElement("label");
            priority_label.textContent="Priority: ";
            priority.id="todopriority";
            
            let priority_low=document.createElement("option")
            priority_low.setAttribute("value","Low");
            priority_low.textContent="Low";

            let priority_med=document.createElement("option")
            priority_med.setAttribute("value","Medium");
            priority_med.textContent="Medium";

            let priority_high=document.createElement("option")
            priority_high.setAttribute("value","High");
            priority_high.textContent="High";

            priority.appendChild(priority_low);
            priority.appendChild(priority_med);
            priority.appendChild(priority_high);

            let br3=document.createElement("br");
            addToDoBox.appendChild(priority_label);
            addToDoBox.appendChild(priority);
            addToDoBox.appendChild(br3);
            let createButton=document.createElement("button");
            createButton.classList.add("create-button");
            createButton.textContent="Create";
            createButton.addEventListener("click",function(){
                var center=document.querySelector(".main-left");
                var todoTitle=document.querySelector("#newTodoId").value;
                let dueDateVal=document.getElementById("todoDueDate").value;
                let priority_select=document.getElementById("todopriority").value;
                if(dueDateVal==""){
                    alert("Please input Due Date");
                    return;
                }
                //let dueDate=Date.parse(dueDateVal);
                if(currentProject.checkExistTodo(todoTitle)==true){
                    alert("Please enter todo with a different name");
                    return;
                }
                currentProject.addTodo(todoTitle,new Date(dueDateVal),priority_select);
                var boxDelete=document.querySelector(".add-todo-box");
                //center.removeChild(boxDelete);
                boxDelete.remove();
                //generateCenter(currentProject.getTitle());
                var left=document.querySelector(".main-left");
                generateLeft(left);
                document.querySelector(".add")
            })
            addToDoBox.appendChild(createButton);

            let cancelButton=document.createElement("button");
            cancelButton.classList.add("cancel-button");
            cancelButton.textContent="Cancel";
            cancelButton.addEventListener("click",function(){
                var left=document.querySelector(".main-left");
                generateLeft(left);
            })
            addToDoBox.appendChild(cancelButton);
            var center=document.querySelector("[projectDiv='"+currentProject.getTitle()+"']");
            center.appendChild(addToDoBox);
        })
        center.appendChild(toDoButton);

        
    }



    let generateProjectList=function(leftSection){
        

        for(let i=0;i<projectController.getLength();i++){
            let currentProject=projectController.getProjectAt(i);
            let outsideDiv=document.createElement("div");
            outsideDiv.setAttribute("projectdiv",currentProject.getTitle());
            let button=document.createElement("span");
            button.textContent= currentProject.getTitle()
            button.classList.add("project-button");
            let remove=document.createElement("button");
            let fa=document.createElement("i");
            fa.classList.add("fas");
            remove.classList.add("remove-project")
            fa.classList.add("fa-times");
            remove.appendChild(fa);
            remove.setAttribute("project",currentProject.getTitle());
            remove.addEventListener("click",function(){
                let project_title=this.getAttribute("project");
                projectController.remove(project_title);
                var left=document.querySelector(".main-left");
                generateLeft(left);
            })
            outsideDiv.appendChild(button);
            outsideDiv.appendChild(remove);

            generateTodoList(currentProject,outsideDiv);

            leftSection.appendChild(outsideDiv);
        }
    }

    

    let generateLeft=function(leftSection){

        leftSection.innerHTML="";

        //generate today

        generateToday(leftSection);


        generateProjectList(leftSection);   

        let addProjectButton=document.createElement("button");
        addProjectButton.classList.add("add-project");

        let projectSpan=document.createElement("span");
        projectSpan.textContent="Project"
        let add_project_icon=document.createElement("i");
        add_project_icon.classList.add("fas","fa-plus");
        addProjectButton.appendChild(add_project_icon);
        addProjectButton.appendChild(projectSpan);
        

        addProjectButton.addEventListener("click",function(){
            this.hidden=true;
            let addProjectBox=document.createElement("button");
            addProjectBox.classList.add("add-project-box")           
            let input=document.createElement("input");
            input.id="newProjectId"
            addProjectBox.appendChild(input);
            let br= document.createElement("br");
            addProjectBox.appendChild(br);
            let createButton=document.createElement("button");
            createButton.classList.add("create-button");
            createButton.textContent="Create";
            createButton.addEventListener("click",function(){
                var left=document.querySelector(".main-left");
                var projectTitle=document.querySelector("#newProjectId").value;
                projectController.addProject(projectTitle);
                var boxDelete=document.querySelector(".add-project-box");
                //left.removeChild(boxDelete);
                boxDelete.remove();
                generateLeft(left);
            })
            addProjectBox.appendChild(createButton);

            let cancelButton=document.createElement("button");
            cancelButton.classList.add("cancel-button");
            cancelButton.textContent="Cancel";
            cancelButton.addEventListener("click",function(){
                var left=document.querySelector(".main-left");
                generateLeft(left);
            })
            addProjectBox.appendChild(cancelButton);

            var left=document.querySelector(".main-left");
            left.appendChild(addProjectBox);
        })
        leftSection.appendChild(addProjectButton);


       
    }

    return {main,generateLeft};


};

export {Dom};




