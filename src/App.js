import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import React,{Component} from "react";
import {Link,Switch,Route} from "react-router-dom";
import MovieAdd from './components/movie-add.component';
import MovieDetail from './components/movie-detail.component';
import MovieList from './components/movie-list.component';
import HomePage from './components/homepage.component';
class  App extends Component {
 

  //html sayfasındaki body 

 
 render()
 {
  return(
    <div>
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      <a href="/anasayfa" className="navbar-brand">BT Akademi</a>
      <div className="navbar-nav mr-auto">
        <li className="nav-item">
          <Link to={"/movies"} className="nav-link">Film Listesi</Link>
        </li>
        <li className="nav-item">
          <Link to={"/ekle"} className="nav-link">Film Ekle</Link>
        </li>
      </div>
    </nav>
    <div className="container mt-3">
      <Switch>
        <Route exact path="/anasayfa" component={HomePage} />
        <Route exact path={["/","movies"]} component={MovieList} />
        <Route exact path={["/movies"]} component={MovieList} />
        <Route exact path="/ekle" component={MovieAdd} />
        <Route exact path="/movies/:id" component={MovieDetail} />
      </Switch>
    </div>
  </div>
  )
 }

}

export default App;
