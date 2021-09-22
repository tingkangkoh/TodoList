import {Dom} from './dom.js';
import {project} from './project.js';
import {projectController} from './projectController.js';
import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'
import '@fortawesome/fontawesome-free/js/regular'
import '@fortawesome/fontawesome-free/js/brands'


let Controller=projectController();
const domController=Dom(Controller);
domController.main();

