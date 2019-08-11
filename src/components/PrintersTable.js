import * as React from "react";

class PrintersTable extends React.Component {
    render() {
        return <table className="table">
                <thead className="thead-dark">
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Printer Name</th>
                    <th scope="col">Printer IP</th>
                    <th scope="col">Status</th>
                </tr>
                </thead>
                <tbody>

                <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                </tr>

                </tbody>
            </table>
    }
}

export default PrintersTable;