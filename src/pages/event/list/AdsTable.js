import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import swal from "sweetalert";

import TutorialDataService from "../../../services/tutorial.service";
class AdsTable extends Component {
    state = {}
    // Delete handler
    deleteTutorial(id) {
        swal({
            title: "Are you sure?",
            text: "Will you delete the experience",
            icon: "warning",
            buttons: ["No", "Yes"],
            dangerMode: true
        }).then(willDelete => {
            if (willDelete) {
                TutorialDataService.delete(id)
                .then(response => {
                    console.log(response.data);                    
                    swal("Deleted!", "Your imaginary file has been deleted!", "success");
                    window.location.reload();
                })
                .catch(e => {
                    console.log(e);
                });
            }
        })
    }

    constructor(props) {
        super(props)
        
        this.deleteTutorial = this.deleteTutorial.bind(this);
        this.state = {
                events: []
        }
    }


    componentDidMount(){
        TutorialDataService.getAll().then((res) => {
            this.setState({ events: res.data});
        });
    }

   

    render() {
        
        const { events } = this.state;
        return (
            <>
                <table id="dtBasicExample" className="table table-striped table-bordered table-sm">
                    <thead>
                        <tr>
                            <th className="th-sm">Id</th>
                            <th className="th-sm">Title</th>
                            <th className="th-sm">Location </th>
                            <th className="th-sm">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.events.map(
                            event => 
                        <tr>
                            {/* <td>{user.id}</td> */}
                            <td>{event._id}</td>
                            <td>{event.title}</td>
                            <td>{event.location}</td>
                            <td>
                                {/* <Link to="/" className="btn btn-info btn-sm mr-1"><i className="fa fa-eye"></i></Link> */}
                                <Link
                                    to={"/edit-event/" + event._id}
                                    className="btn btn-info btn-sm mr-1"
                                >
                                   <i className="fa fa-pencil"></i>
                                </Link>
                                <button
                                     onClick={this.deleteTutorial.bind(this, event._id)}
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

export default AdsTable;
