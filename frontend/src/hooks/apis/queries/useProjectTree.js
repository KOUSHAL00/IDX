import { getProjectTree } from "../../../apis/projects";
import { useQuery } from "@tanstack/react-query";

//not used in the codebase yet, but this is a query to get the project tree structure
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