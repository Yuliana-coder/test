import "./App.css"
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Home from "./components/home";
import Page404 from "./components/page404"
import Cardpage from "./components/cardpage"


function App() {
  return (
    <div>
      <header className="header">
        <div className="header__title">
          <h1>Финансовые предложения</h1>
        </div>
      </header>
      <div className="main container">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/card/:id" component={Cardpage} />
            <Route component={Page404} />
          </Switch>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
