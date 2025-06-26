import { useState,useEffect } from "react";
import {IoIosArrowDown, IoIosArrowForward} from "react-icons/io";
import {FileIcon } from "../../atoms/FileIcon/FileIcon";

export const TreeNode = ({ fileFolderData }) => {


  const [visibility, setVisibility] = useState({});

    const toggleVisibility = (name) => {
        setVisibility({...visibility,
            [name]:!visibility[name]
     } );
    };

    function computeExtension(fileFolderData) {
        const names = fileFolderData.name.split(".");
        return names[names.length - 1];
    }

        useEffect(() => {
        console.log("Visibility chanmged", visibility); 
    }, [visibility])


    return (
        fileFolderData ? (
            <div style={{ paddingLeft: "15px", color: "white" }}>
                {fileFolderData.children ? (
                    // If current node is a folder, show the children
                    <button
                        onClick={() => toggleVisibility(fileFolderData.name)}
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
                    >
                        {visibility[fileFolderData.name] ? <IoIosArrowDown /> : <IoIosArrowForward />}
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
                    >
                        {fileFolderData.name}
                    </p>
                    </div>
                )}

                {visibility[fileFolderData.name] && fileFolderData.children && (
                    // If the node is expanded, recursively render children recursively
                    fileFolderData.children.map((child) => (
                        <TreeNode key={child.name} fileFolderData={child} />
                    ))
                )}
            </div>
        ) : (
            <p style={{ color: "white" }}>Loading...</p>
        )
    );
};
