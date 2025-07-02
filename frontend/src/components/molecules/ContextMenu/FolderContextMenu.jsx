import './FileContextMenu.css';

import { useFolderContextMenuStore } from "../../../store/folderContextMenuStore";
import { useEditorSocketStore } from '../../../store/editorSocketStore';

export const FolderContextMenu = ({
    x,
    y,
    path
}) => {

    console.log("FolderContextMenu rendered at", x, y, "for path", path);
    
    const { setIsOpen } = useFolderContextMenuStore();

    const { editorSocket } = useEditorSocketStore();

    function handleFolderDelete(e) {
        e.preventDefault();
        console.log("Deleting folder at", path);
        editorSocket.emit("deleteFolder", {
            pathToFileOrFolder: path
        });
    }

    return (
        <div
            onMouseLeave={() => {
                console.log("Mouse left");
                setIsOpen(false);
            }}
            className='fileContextOptionsWrapper'
            style={{
                left: x,
                top: y,
            }}
        >
            <button
                className='fileContextButton'
                onClick={handleFolderDelete}
            >
                Delete Folder
            </button>
            <button
                className='fileContextButton'
            >
                Rename Folder
            </button>

        </div>
    )
}