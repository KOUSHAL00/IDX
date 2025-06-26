import { useEffect } from "react";
import { useTreeStructureStore } from "../../../store/treeStructureStore";
import { TreeNode } from "../../molecules/TreeNode/TreeNode";


export const TreeStructure = ()=>{

    const { treeStructure, setTreeStructure } = useTreeStructureStore();


    useEffect(() => {
        if(treeStructure)
        {
            console.log("Tree structure already exists for project:",treeStructure);
            return;
        }
        else{
        setTreeStructure();
        }
    },[ setTreeStructure,treeStructure]);

    return (
        <div className="tree-structure">

            {/* <h2>Tree Structure</h2> */}
            
             <TreeNode fileFolderData={treeStructure} />
        </div>
    );
}