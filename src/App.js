import React from 'react';
import './App.css';
import Printers from "./components/Printers";
import CreatePrinter from "./components/CreatePrinter";


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
        <CreatePrinter />,
        <Printers />
    ];
}

export default App;
