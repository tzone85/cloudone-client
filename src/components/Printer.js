import React, { Component} from 'react';

class Printer extends Component{

    render() {
        return (<tr>
        <td>{this.props.printer.printerId}</td>
        <td>{this.props.printer.printerName}</td>
        <td>{this.props.printer.printerIp}</td>
        <td>{this.props.printer.status}</td>
        </tr>);
    }
}

export default Printer;