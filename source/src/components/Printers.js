import Printer from './Printer'
import React, {Component} from "react";
import PubSub from 'pubsub-js';
import CreatePrinter from "./CreatePrinter";
import dotenv from 'dotenv'

dotenv.config();

class Printers extends Component {
    printersSubscriber = function (msg, data) {
        setTimeout(() => {
            fetch('http://ec2-13-250-127-57.ap-southeast-1.compute.amazonaws.com/printers', {
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
                                printerId: i.id,
                            };
                        }))
                        .then(data => this.setState({printers: data}));
                })
                .catch(error => console.log('Error', error));
        }, 500)
    };

    constructor(props) {
        super(props);
        this.state = {
            printers: [],
        };
        PubSub.subscribe('ON_REFRESH', this.printersSubscriber.bind(this))
    };

    componentDidMount() {
        PubSub.publish('ON_REFRESH')
    }

    render() {
        return [<CreatePrinter pubSub={PubSub}/>,
            <table className="table">
                <thead className="thead-dark">
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Printer Name</th>
                    <th scope="col">Printer IP</th>
                    <th scope="col">Status</th>
                    <th scope="col" className="text-center" width="100px">Actions</th>
                </tr>
                </thead>
                <tbody>
                {this.state.printers.map((item) => <Printer key={item.printerId} printer={item} pubSub={PubSub}/>)}
                </tbody>
            </table>]
    }
}

export default Printers;