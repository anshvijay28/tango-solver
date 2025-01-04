import '../styles/App.css';
import Cell from '../components/Cell.js';

function App() {

  return (
    <div className="App">
      <div className="gridContainer">
        {Array.from({ length: 36 }).map((_, index) => (
          <Cell key={index} bgColor={"#F9F9F9"} />
        ))}
        {/* <Cell bgColor={"#F9F9F9"}/> */}
      </div>
    </div>
  );
}

export default App;
