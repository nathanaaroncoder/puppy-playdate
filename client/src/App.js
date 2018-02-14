import React from "react";
import Books from "./pages/Books";
import Detail from "./pages/Detail";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const App = () =>
<Router>
  <div>
    <Nav />
    <Switch>
      <Route exact path="/" component={Books} />
      <Route exact path="/books" component={Books} />
      <Route path="/books/:id" component={Detail}/>
    <Route component={NoMatch} />
    </Switch>
    {/* <Books /> */}
  </div>
  </Router>;


export default App;
