import React from 'react';
import './App.css';
import * as ReactDOM from "react-dom";
import PrintersTable from "./components/PrintersTable";


function App() {

    function Header(props) {
        return <div className="row"></div>;
    }
    function Title(props) {
        return <div className="row"><h1>Printers Table</h1></div>;
    }


    return [
        <Header name="Sara" />,
        <Title name="Cahal" />,
        <PrintersTable data={this.props.printers} />
    ];
}

export default App;
