import React from 'react'
import createReactClass from 'create-react-class';

import LinkedStateMixin from 'react-addons-linked-state-mixin'; // ES6
const CreateButton = function () {
    return <button className="btn btn-primary" data-toggle="modal"
                   data-target="#createPrinterForm">Create</button>
};

const CreatePrinter = createReactClass({

    mixins: [LinkedStateMixin],

    getInitialState: function () {
        return {
            printerName: '',
            printerIp: '',
            status: true
        };
    },

    handlePrinterNameChange(event) {
        this.setState({printerName: event.target.value});
    },

    handlePrinterIpChange(event) {
        this.setState({printerIp: event.target.value});
    },

    handleStatusChange() {

    },

    handleSubmission(event) {
        const headers = new Headers();
        headers.set('Accept', 'application/json');
        headers.set('Content-Type', 'application/json');
        const json = {
            printer_name: this.state.printerName,
            printer_ip: this.state.printerIp,
            status: this.state.status
        };
        fetch(`http://localhost:3000/printers`, {
            body: JSON.stringify(json),
            method: 'POST',
            headers
        }).then(response => {
            document.getElementById('dismissCreatePrinterForm').click();
            this.setState(this.getInitialState());
            this.props.pubSub.publish('ON_REFRESH');
        });
        event.preventDefault();
    },

    render() {
        return [<CreateButton/>,
            <div className="modal" tabIndex="-1" role="dialog" id="createPrinterForm">
                <form onSubmit={this.handleSubmission}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Add PRinter</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label htmlFor="printerName">Printer Name</label>
                                    <input name="printer_name" value={this.state.printerName}
                                           onChange={this.handlePrinterNameChange}
                                           type="text" className="form-control" id="printerName"
                                           aria-describedby="printerNameHelp" placeholder="Printer Name"/>
                                    <small id="printerNameHelp" className="form-text text-danger">*</small>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="printerName">Printer IP</label>
                                    <input name="printer_ip" value={this.state.printerIp}
                                           onChange={this.handlePrinterIpChange}
                                           type="text" className="form-control" id="printerIp"
                                           aria-describedby="printerIpHelp" placeholder="Printer IP"/>
                                    <small id="printerIpHelp" className="form-text text-danger">*</small>
                                </div>
                                {/*<div className="form-group form-check">*/}
                                {/*<input name="status" defaultChecked={this.props.printer.status} type="checkbox" className="form-check-input" id="status"/>*/}
                                {/*<label className="form-check-label" htmlFor="status">Status</label>*/}
                                {/*</div>*/}
                            </div>
                            <div className="modal-footer">
                                <button type="button" id="dismissCreatePrinterForm" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="submit" className="btn btn-primary">Create</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>]
    }
});

export default CreatePrinter;