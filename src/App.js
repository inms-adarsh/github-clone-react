import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Pane, majorScale } from 'evergreen-ui'

import './App.css';
import Search  from './components/Search';
import Profile from './components/Profile';


const App = () => {
  return (
    <React.Fragment>
      <Pane
        paddingTop={majorScale(3)}
        paddingX={majorScale(5)}
        display="flex"
        margin={majorScale(5)}
        border="none"
        flexDirection="column"
      >
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Search} />
            <Route path="/:username" component={Profile} />
          </Switch>
        </BrowserRouter>

      </Pane>

    </React.Fragment>
  );
}

export default App;
