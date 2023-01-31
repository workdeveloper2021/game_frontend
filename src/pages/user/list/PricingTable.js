import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import swal from "sweetalert";

import UserService from "../../../services/user.service";
class PricingTable extends Component {
    state = {}

    // Delete handler
    handleDelete() {
        swal({
            title: "Are you sure?",
            text: "Will you delete the experience",
            icon: "warning",
            buttons: ["No", "Yes"],
            dangerMode: true
        }).then(willDelete => {
            if (willDelete) {
                swal("Deleted!", "Your imaginary file has been deleted!", "success");
            }
        })
    }
    constructor(props) {
        super(props)

        this.state = {
                users: []
        }
    }


    componentDidMount(){
        UserService.getPublicContent().then((res) => {
            this.setState({ users: res.data});
        });
    }

    render() {
        const { users } = this.state;

        return (
            <>
                <table id="dtBasicExample" className="table table-striped table-bordered table-sm">
                    <thead>
                        <tr>
                            {/* <th className="th-sm">S.no.</th> */}
                            <th className="th-sm">Email</th>
                            <th className="th-sm">Contact </th>
                            <th className="th-sm">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.users.map(
                            user => 
                        <tr>
                            {/* <td>{user.id}</td> */}
                            <td>{user.email}</td>
                            <td>{user.contact}</td>
                            <td>
                                {/* <Link to="/" className="btn btn-info btn-sm mr-1"><i className="fa fa-eye"></i></Link> */}
                                {/* <button className="btn btn-info btn-sm mr-1"><i className="fa fa-pencil"></i></button> */}
                                <button
                                    onClick={e => this.handleDelete()}
                                    className="btn btn-danger btn-sm mr-1">
                                    <i className="fa fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                        )
                    }

                        
                    </tbody>
                </table>
            </>
        );
    }
}

export default PricingTable;
