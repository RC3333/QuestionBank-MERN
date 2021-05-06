import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import './App.css';
import { Footer } from "./components/auth/Footer";
import  Login from './components/auth/Login';
import  Register  from './components/auth/Register';
import { Home } from './components/Home';
import  Navbar  from "./components/Navbar";
import { NotFound } from "./components/NotFound";
import { Profile } from "./components/Profile";
import Alert from './components/Alert'
import { loadUser } from './actions/auth'
import setAuthToken from './utils/setAuthToken'
// import  Posts  from "./components/Posts";

//Redux
import {Provider} from 'react-redux';
import store from './store'
import { useEffect } from "react";

if(localStorage.token){
  setAuthToken(localStorage.token);
}

const App= () => { 

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <>
      <Provider store={store}>
        <Router>
          <Navbar />
          <section className="container">
            <Alert/>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/profile" component={Profile} />
              {/* <Route exact path="/posts" component={Posts} /> */}
               <Route component={NotFound} />
            </Switch>
          </section>
          <Footer />
        </Router>
      </Provider>
    </>
  );
}

export default App;
