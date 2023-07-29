import Excel from "./Table";
import { data, headers } from "./book";


function App() {
  return (
    <div className="App">
    <Excel headers={headers} initialData={data}></Excel>
    </div>
  );
}

export default App;
