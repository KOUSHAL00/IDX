import { getProjectTree } from "../../../apis/projects";
import { useQuery } from "@tanstack/react-query";
export const useProjectTree = (projectId) => {

    const { isLoading, isError, data: projectTree, error } = useQuery({
        queryFn: () => getProjectTree({ projectId }),
    });
    return {
        isLoading,
        isError,
         projectTree,
        error
    };
};