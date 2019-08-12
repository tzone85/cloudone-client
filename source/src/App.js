import React from 'react';
import './App.css';

import Printers from "./components/Printers";


function App() {

    function Header(props) {
        return <div className="row"></div>;
    }
    function Title(props) {
        return <div className="row"><h1>Printers Table</h1></div>;
    }


    return [
        <Header />,
        <Title />,
        <Printers />
    ];
}

export default App;
