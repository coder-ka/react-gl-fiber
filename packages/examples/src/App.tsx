import { ReglCanvas } from "./regl-example";
import { ReglExampleScene } from "./scenes/ReglExampleScene";

function App() {
  return (
    <div style={{ width: "100%", height: "100%", padding: "12px" }}>
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
    </div>
  );
}

export default App;
