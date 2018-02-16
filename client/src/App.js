import React from "react";
import Dogs from "./pages/Dogs";
import Detail from "./pages/Detail";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const App = () =>
<Router>
  <div>
    <Nav />
    <Switch>
      <Route exact path="/" component={Dogs} />
      <Route exact path="/dogs" component={Dogs} />
      <Route path="/dogs/:id" component={Detail}/>
    <Route component={NoMatch} />
    </Switch>
    {/* <Books /> */}
  </div>
  </Router>;


export default App;
