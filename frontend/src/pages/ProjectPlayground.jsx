import { useParams } from "react-router-dom";
import { EditorComponent } from "../components/molecules/EditorComponent/EditorComponent";
import { EditorButton } from "../components/atoms/EditorButton/EditorButton";
import { TreeStructure } from "../components/organisms/TreeStructure/TreeStructure";
import { useEffect } from "react";
import { useTreeStructureStore } from "../store/treeStructureStore";



export const ProjectPlayground = () => {

    const { projectId:projectIdFromUrl } = useParams();

    const { projectId,setProjectId } = useTreeStructureStore();
    

    useEffect(() => {
        setProjectId(projectIdFromUrl);
        console.log("Project ID from URL set to:", projectIdFromUrl);
    }, [setProjectId, projectIdFromUrl]);

    return (

        <div >
            <h1 style={{fontSize:"15px"}}>Project ID: {projectIdFromUrl}</h1>
            {projectId && (
            <div
                style={{
                  backgroundColor:'#333254',
                  paddingRight: '10px',
                  paddingTop:'0.3vh',
                  minWidth: '250px',
                    maxWidth:'25%',
                    height: '99.7vh',
                    overflow: 'auto',
                }}>
            <TreeStructure />
            </div>
           ) }
            <EditorComponent />
            <EditorButton isActive={false} />
            <EditorButton isActive={true} />
        </div>
    )
}