import { useState } from "react";
import { PingComponent } from "./components/atoms/PingComponent";

const App = () => {

  const [visible, setVisible] = useState(false);

  return (
    <>
      <button onClick={() => setVisible(!visible)}>Toggle</button>
      { visible && <PingComponent /> }
    </>
  )
}

export default App; 