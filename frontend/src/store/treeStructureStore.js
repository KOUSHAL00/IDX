import { create } from 'zustand';
import { QueryClient } from '@tanstack/react-query';
import { getProjectTree } from '../apis/projects';

const queryClient = new QueryClient();

//fetchQuery is used to fetch data and cache it 


//in this function ,fetchQuery is used to fetch the project tree structure based on the projectId
//and then set the treeStructure state with the fetched data

export const useTreeStructureStore = create((set, get) => ({
    projectId: null,
    treeStructure: null,
    setTreeStructure: async () => {
        const id = get().projectId;
        const data = await queryClient.fetchQuery({
            queryKey: [`projecttree-${id}`],
            queryFn: () => getProjectTree({ projectId: id }),
        });

        set({ treeStructure: data });

        console.log("Tree structure set", data);
    },
    setProjectId: (projectId) => {
        set({ projectId: projectId });
        console.log("Project ID set to:", projectId);
    }
}));