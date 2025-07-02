import { useState,useEffect } from "react";
import {IoIosArrowDown, IoIosArrowForward} from "react-icons/io";
import {FileIcon } from "../../atoms/FileIcon/FileIcon";
import {useEditorSocketStore} from "../../../store/editorSocketStore";
import { useFileContextMenuStore } from "../../../store/fileContextMenuStore";
import { useFolderContextMenuStore } from "../../../store/folderContextMenuStore";


export const TreeNode = ({ fileFolderData }) => {


  const [visibility, setVisibility] = useState({});

  const {editorSocket} =useEditorSocketStore();
  const { setFile, setIsOpen:setFileContextMenuIsOpen, setX:setFileContextMenuX , setY:setFileContextMenuY } = useFileContextMenuStore();
  const {setFolder, setIsOpen:setFolderContextMenuIsOpen, setX:setFolderContextMenuX , setY:setFolderContextMenuY } = useFolderContextMenuStore();
  

    const toggleVisibility = (path) => {
        setVisibility({
            ...visibility,
            [path]: !visibility[path]
        });
    };

    function computeExtension(fileFolderData) {
        const names = fileFolderData.name.split(".");
        return names[names.length - 1];
    }

    const handleDoubleClick = (fileFolderData) => {
        console.log("Double clicked on file:", fileFolderData.name);
        editorSocket.emit("readFile", {
            pathToFileOrFolder: fileFolderData.path,
        });
    };


    const handleContextMenuForFiles = (e, path) => {
        e.preventDefault();
        console.log("Right clicked on file:", path);
        setFile(path);
        setFileContextMenuX(e.clientX);
        setFileContextMenuY(e.clientY);
        setFileContextMenuIsOpen(true);
    }; 

    const handleContextMenuForFolders = (e,path) => {
        e.preventDefault();
        console.log("Right clicked on folder:", path);
        setFolder(path);
        setFolderContextMenuX(e.clientX);
        setFolderContextMenuY(e.clientY);
        setFolderContextMenuIsOpen(true);
    }


        useEffect(() => {
        console.log("Visibility changed", visibility); 
    }, [visibility])


    return (
        fileFolderData ? (
            <div style={{ paddingLeft: "15px", color: "white" }}>
                {fileFolderData.children ? (
                    <button
                        onClick={() => toggleVisibility(fileFolderData.path)}
                        style={{
                              border: "none",
                        cursor: "pointer",
                        outline: "none",
                        color: "white",
                        backgroundColor: "transparent",
                        padding: "15px",
                        fontSize: "16px",
                        marginTop: "10px"
                        }}
                        onContextMenu={(e) => handleContextMenuForFolders(e, fileFolderData.path) }
                    >
                        {visibility[fileFolderData.path] ? <IoIosArrowDown /> : <IoIosArrowForward />}
                        {fileFolderData.name}
                    </button>
                ) : (
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "start", }}>

                    {/* // If current node is a file, just show the name */}
                    <FileIcon extension={computeExtension(fileFolderData) } />
                    <p
                        style={{
                             paddingTop: "15px",
                            paddingBottom: "15px",
                            marginTop: "8px",
                            fontSize: "15px",
                            cursor: "pointer",
                            marginLeft: "18px",
                            // color: "black"
                        }}
                        onDoubleClick={()=>handleDoubleClick(fileFolderData)}
                        onContextMenu={(e) => handleContextMenuForFiles(e, fileFolderData.path) }
                    >
                        {fileFolderData.name}
                    </p>
                    </div>
                )}
                {visibility[fileFolderData.path] && fileFolderData.children && (
                    // If the node is expanded, recursively render children recursively
                    fileFolderData.children.map((child) => (
                        <TreeNode key={child.path} fileFolderData={child} />
                    ))
                )}
                
            </div>
        ) : (
            <p style={{ color: "white" }}>Loading...</p>
        )
    );
};
