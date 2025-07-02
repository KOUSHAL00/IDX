import { create } from 'zustand';
import { useActiveFileTabStore } from './activeFileTabStore';
import { useTreeStructureStore } from './treeStructureStore';

export const useEditorSocketStore = create((set) => ({
    editorSocket: null,
    setEditorSocket: (incomingSocket) => {

    //set active file tab when the socket is set    
    const activeFileTabSetter=useActiveFileTabStore.getState().setActiveFileTab;

    const projectTreeStructureSetter = useTreeStructureStore.getState().setTreeStructure;
        
            incomingSocket?.on("readFileSuccess", (data) => {
                console.log("File read successfully", data);
                const fileExtension = data.path.split('.').pop();
                activeFileTabSetter(data.path, data.value, fileExtension);
            });

            incomingSocket?.on("writeFileSuccess", (data) => {
                console.log("File written successfully", data);
                incomingSocket.emit("readFile", {
                    pathToFileOrFolder: data.path
                });
            });

            incomingSocket?.on("deleteFileSuccess", () => {
                console.log("File deleted successfully");
                projectTreeStructureSetter();
            });

            incomingSocket?.on('deleteFolderSuccess', () => {
                console.log("Folder deleted successfully");
                projectTreeStructureSetter();
            });

        set({ editorSocket: incomingSocket })}
}));

