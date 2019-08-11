import React from 'react'
import createReactClass from 'create-react-class';

const DeletePrinter = createReactClass({

    handleSubmission(event) {
        const headers = new Headers();
        headers.set('Accept', 'application/json');
        headers.set('Content-Type', 'application/json');
        fetch(`http://localhost:3000/printers/${this.props.printerId}`, {
            method: 'DELETE',
            headers
        }).then(response => console.log(response));
        event.preventDefault();
    },

    render() {
        return <div className="modal bd-example-modal-sm" tabIndex="-1"
                    role="dialog" id={"delete_printer_" + this.props.printerId}
                    aria-labelledby="mySmallModalLabel" aria-hidden="true">
            <form onSubmit={this.handleSubmission}>
            <div className="modal-dialog modal-sm">
                <div className="modal-content">
                    <div className="model-body">Are you sure, you want to delete printer: {this.props.printerName}</div>

                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="submit" className="btn btn-danger">Confirm</button>
                    </div>
                </div>
            </div>
            </form>
        </div>
    }
});

export default DeletePrinter;