import util from 'util';
import child_process from 'child_process';
import fs from 'fs/promises';
import uuid4 from 'uuid4';

const execPromisified = util.promisify(child_process.exec);
//it allows us to use exec in a promise-based way

export const createProjectController = async (req, res) => {

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

    const response = await execPromisified(`npm create vite@latest sandbox  -- --template react`, {
        cwd: `./projects/${projectId}`,
    });

    return res.json({
        message: 'Project created successfully',
        data: projectId
    });
} 