import { ReglCanvas } from "./regl-example";
import { ReglExampleScene } from "./scenes/ReglExampleScene";
import { ThreeExampleScene } from "./scenes/ThreeExampleScene";
import { ThreeCanvas } from "./three-example";

function App() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        padding: "12px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div>
        <h2>using regl</h2>
        <ReglCanvas
          canvas={{
            width: 300,
            height: 300,
            style: {
              border: "1px solid black",
              backgroundColor: "black",
            },
          }}
        >
          <ReglExampleScene></ReglExampleScene>
        </ReglCanvas>
      </div>
      <div>
        <h2>using three</h2>
        <ThreeCanvas
          canvas={{
            width: 300,
            height: 300,
            style: {
              border: "1px solid black",
              backgroundColor: "black",
            },
          }}
        >
          <ThreeExampleScene></ThreeExampleScene>
        </ThreeCanvas>
      </div>
    </div>
  );
}

export default App;
