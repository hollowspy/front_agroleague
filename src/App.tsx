import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useRoutes,
} from "react-router-dom";
import './App.scss'
import Header from "./header/header";
import Search from "./search/search";
import DetailFilm from "./details_film/detailFilm";


const RoutesApps = () => {
    let routes = useRoutes([
        { path: "/", element: <Search /> },
        { path: "film/:id", element: <DetailFilm /> },
    ]);
    return routes;
};



function App() {
  return (
    <div>
      <Header />
        <Router>
            <RoutesApps />
        </Router>
    </div>
  );
}

export default App;
