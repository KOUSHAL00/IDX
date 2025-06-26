import axios from '../configs/axiosConfig';

export const createProjectApi = async() => {
    try{
        const response = await axios.post('/api/v1/projects');
          console.log(response.data);
          return response.data;
    }
    catch (error) {
        console.error('Error creating project:', error);
        throw error;
    }
}

export const getProjectTree = async({projectId})=>{
    try{
        const response = await axios.get(`/api/v1/projects/${projectId}/tree`);
        console.log(response.data);
        return response?.data?.data;
    }
    catch (error) {
        console.error('Error fetching project tree:', error);
        throw error;
    }
}