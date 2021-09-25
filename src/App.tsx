import Home from "./components/home/home";
import "./App.css"

function App() {
  return (
    <div>
      <header className="header">
        <div className="header__title">
          <h1>Финансовые предложения</h1>
        </div>
      </header>
      <div className="main container">
        <Home />
      </div>
    </div>
  );
}

export default App;
