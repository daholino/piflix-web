import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from "./pages/home/Home.js";
import Header from "./components/Header.js"
import Footer from './components/Footer.js';
import Movie from './pages/movie/Movie';
import AddTorrent from './pages/add/AddTorrent';
import ActiveTransfers from './pages/transfers/ActiveTransfers';

function App() {
  return (
    <Router>
      <div className="container">
        <Header></Header>
        <Switch>
          <Route path="/movie/:id">
            <Movie />
          </Route>
          <Route path="/add">
            <AddTorrent />
          </Route>
          <Route path="/transfers">
            <ActiveTransfers />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
        <Footer></Footer>
      </div>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover={false}
        draggable={false}
      />
    </Router>
  );
}

export default App;
