import  Editor  from "@monaco-editor/react";
import { useEffect, useState } from "react";
import { useActiveFileTabStore } from "../../../store/activeFileTabStore";
import { useEditorSocketStore } from "../../../store/editorSocketStore";
import { extensionToFileType } from "../../../utils/extensionToFileType";


export const EditorComponent = () => {

    let timerId = null;


   const [editorState, setEditorState] = useState({
        theme: null
    });

    const {editorSocket} = useEditorSocketStore();

    const {activeFileTab} = useActiveFileTabStore();


    async function downloadTheme() {
        const response = await fetch('/Dracula.json');
        const data = await response.json();
        console.log(data);
        setEditorState({ ...editorState, theme: data });
    }


    function handleEditorTheme(editor, monaco) {
        monaco.editor.defineTheme('dracula', editorState.theme);
        monaco.editor.setTheme('dracula');
    }


  function handleChange(value) {

    //debouncing(create a timer to wait for 2 seconds before sending the writeFile event)
    
    //cleat old timer if it exists
    if (timerId) {
        clearTimeout(timerId);
    }
   
    timerId= setTimeout(() => {
    const editorContent = value;
    console.log("Sending writeFile event");
    editorSocket.emit("writeFile", {
        data:editorContent,
        pathToFileOrFolder: activeFileTab.path
    })
}, 2000);

} 



    useEffect(() => {
        downloadTheme();
    }, []);

  return (
    <>
      {   editorState.theme &&
                <Editor 
                    
                    width={'100%'}
                    defaultLanguage={undefined}
                    height={'80vh'}
                    defaultValue='// Welcome to the playground'
                    options={{
                        fontSize: 18,
                        fontFamily: 'monospace'
                    }}
                    language={extensionToFileType(activeFileTab?.extension)}
                    value={activeFileTab?.value ? activeFileTab.value : "//welcome to the playground"}

                    onMount={handleEditorTheme}
                    onChange={handleChange}
                />
            }
    </>
  );
};