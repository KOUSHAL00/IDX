import { useEffect } from "react";
import { useTreeStructureStore } from "../../../store/treeStructureStore";
import { TreeNode } from "../../molecules/TreeNode/TreeNode";
import { useFileContextMenuStore } from "../../../store/fileContextMenuStore";
import { useFolderContextMenuStore } from "../../../store/folderContextMenuStore";
import { FileContextMenu } from "../../molecules/ContextMenu/FileContextMenu";
import { FolderContextMenu } from "../../molecules/ContextMenu/FolderContextMenu";
export const TreeStructure = ()=>{

    const { treeStructure, setTreeStructure } = useTreeStructureStore();

      const { file,isOpen: isFileContextMenuOpen , x : fileContextX , y : fileContextY  } = useFileContextMenuStore();
    const { folder,isOpen: isFolderContextMenuOpen, x: folderContextX, y: folderContextY } = useFolderContextMenuStore();


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
      <>
            { isFileContextMenuOpen && fileContextX && fileContextY && (
                <FileContextMenu
                    x={fileContextX}
                    y={fileContextY}
                    path={file}
                />
                )}
            { isFolderContextMenuOpen && folderContextX && folderContextY && (
                <FolderContextMenu
                    x={folderContextX}
                    y={folderContextY}
                    path={folder}
                />
                )}

            
             <TreeNode fileFolderData={treeStructure} />
        </>
    );
}