import React, {Component} from 'react';
import UpdatePrinter from "./UpdatePrinter";
import DeletePrinter from "./DeletePrinter";

function UpdateButton(printer) {
    return <button className="btn btn-success" data-toggle="modal"
                   data-target={"#printer_" + printer.printerId}>Update</button>
}

function DeleteButton(printer) {
    return <button className="btn btn-danger" data-toggle="modal"
                   data-target={"#delete_printer_" + printer.printerId}>Delete</button>
}

class Printer extends Component {

    render() {
        return (<tr>
            <td>{this.props.printer.printerId}</td>
            <td>{this.props.printer.printerName}</td>
            <td>{this.props.printer.printerIp}</td>
            <td>{this.props.printer.status}</td>
            <td className="text-right">
                <div className="btn-group" role="group" aria-label="Actions">
                    <UpdateButton printerId={this.props.printer.printerId}/>
                    <DeleteButton printerId={this.props.printer.printerId}/>
                    <UpdatePrinter
                        pubSub={this.props.pubSub}
                        printerName={this.props.printer.printerName}
                        printerIp={this.props.printer.printerIp}
                        status={this.props.printer.status}
                        printerId={this.props.printer.printerId}
                    />
                    <DeletePrinter
                        pubSub={this.props.pubSub}
                        printerName={this.props.printer.printerName}
                        printerIp={this.props.printer.printerIp}
                        status={this.props.printer.status}
                        printerId={this.props.printer.printerId}
                    />
                </div>
            </td>
        </tr>);
    }
}

export default Printer;