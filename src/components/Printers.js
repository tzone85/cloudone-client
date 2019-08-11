import Printer from './Printer'
import React, {Component} from "react";

class Printers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            printers: [],
        }
    };

    componentDidMount() {
        fetch('http://localhost:3000/printers', {
            method: 'GET',
            // mode: 'no-cors'
        })
            .then((result) => {
                result.json()
                    .then(res => res.map(i => {
                        return {
                            printerName: i.printer_name,
                            printerIp: i.printer_ip,
                            status: i.status,
                            printerId: i.id
                        }
                    }))
                    .then(data => this.setState({printers: data}));
            })
            .catch(error => console.log('Error', error))
    }

    render() {
        return (
            <table className="table">
                <thead className="thead-dark">
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Printer Name</th>
                    <th scope="col">Printer IP</th>
                    <th scope="col">Status</th>
                </tr>
                </thead>
                <tbody>
                {this.state.printers.map((item) => <Printer printer={item}/>)}
                </tbody>
            </table>
        )
    }
}

export default Printers;