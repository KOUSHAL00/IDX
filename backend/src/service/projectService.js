import fs from 'fs/promises';
import uuid4 from 'uuid4';
import { REACT_PROJECT_COMMAND } from '../config/serverConfig.js';
import { execPromisified } from '../utils/execUtility.js';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const directoryTree = require('directory-tree');
import path from 'path';

export const  createProjectService = async() => {

 //check if the projects folder exists, if not create it
    // try {
    //     await fs.access('./projects');
    // } catch (error) {
    //     //if the folder does not exist, create it
    //     await fs.mkdir('./projects');
    // }


      //create a unique id and then inside the projects folder create a new folder with that id
    const projectId = uuid4();
    console.log('New project ID:', projectId);

    await fs.mkdir(`./projects/${projectId}`);

    //after this call the npm create vite command in the newly created project folder

    const response = await execPromisified(REACT_PROJECT_COMMAND, {
        cwd: `./projects/${projectId}`,
    });

    return projectId;
    
}



export const getProjectTreeService = async(projectId) => {

    console.log("Fetching project tree for project ID:", projectId);

    const projectPath = path.resolve(`./projects/${projectId}`);
    const projectTree = directoryTree(projectPath); 
    return projectTree;

}
