import { createProjectService, getProjectTreeService } from '../service/projectService.js';

export const createProjectController = async (req, res) => {

   const projectId = await createProjectService();


    return res.json({
        message: 'Project created successfully',
        data: projectId
    });
} 

export const projectTree = async (req, res) => {

    console.log("Fetching project tree for project ID:", req.params.projectId);

    const tree = await getProjectTreeService(req.params.projectId);

    return res.json({
        message: 'Successfully fetched project tree',
        data: tree,
        success: true
    });
}

