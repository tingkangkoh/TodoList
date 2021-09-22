import {project} from './project.js';

let projectController=function(){
    let projects=[];

    let addProject=function(title){
        let newProject=project(title);
        projects.push(newProject);
    }

    let getProject=function(title){
        for (let i=0;i<projects.length;i++){
            if(projects[i].getTitle()==title){
                return projects[i];
            }
        }
    }

    let getLength=function(){
        return projects.length;
    }

    let getProjectAt=function(index){
        return projects[index];
    }

    let removeProject=function(title){
        projects=projects.filter(function(project){

            return project.getTitle()!=title;
        })
    }

    let getProjects=function(){
        return projects;
    }

    return {addProject,getProject,getLength,getProjectAt,removeProject,getProjects}

}

export {projectController};