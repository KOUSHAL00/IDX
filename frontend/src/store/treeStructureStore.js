import { create } from 'zustand';
import { QueryClient } from '@tanstack/react-query';
import { getProjectTree } from '../apis/projects';

const queryClient = new QueryClient();

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