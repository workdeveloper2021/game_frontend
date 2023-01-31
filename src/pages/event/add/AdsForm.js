import React, { Component} from 'react';
import axios from "axios";
import CheckButton from "react-validation/build/button";
import TutorialDataService from "../../../services/tutorial.service";

class AdsForm extends Component {
    constructor(props) {
        super(props);
        this.saveTutorial = this.saveTutorial.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeLocation = this.onChangeLocation.bind(this);
        this.onChangeFile = this.onChangeFile.bind(this);
        this.onChangePublished = this.onChangePublished.bind(this);
    
        this.state = {
          id: null,
          title: "",
          location: "",
          published: false,
          file: "",
          filename:""
        };
      }

      onChangeTitle(e) {
        this.setState({
          title: e.target.value
        });
      }

      onChangeLocation(e) {
        this.setState({
          location: e.target.value
        });
      }

      onChangeFile(e) {
        this.setState({ file: e.target.files[0] })
        this.setState({ filename: e.target.files[0].name })
      }

      onChangePublished(e) {
        this.setState({
            published: e.target.value
        });
      }

      saveTutorial() {
        const formData = new FormData();
        formData.append("file", this.state.file);
        formData.append("fileName", this.state.filename);
        const res = axios.post(
          "http://localhost:8080/api/upload",
          formData
        );
          var data = {
            title: this.state.title,
            location: this.state.location,
            file:this.state.filename,
            published: this.state.published,
          };    
          
          TutorialDataService.create(data)
            .then(response => {
              this.setState({
                id: response.data.id,
                title: response.data.title,
                location: response.data.location,
                published: response.data.published,
                file: response.data.file,
      
                submitted: true
              });
              console.log(response.data);
            })
            .catch(e => {
              console.log(e);
            });
      }
    
      

    
    render() {
        return (
            <>
                <div className="topic_form">
                    <form onSubmit={this.saveTutorial}>
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label htmlFor="name">Title</label>
                                            <input type="text"
                                                className="form-control"
                                                id="title"
                                                ref="title"
                                                name="title"
                                                placeholder="Enter title"
                                                value={this.state.title}
                                                onChange={this.onChangeTitle}
                                            />
                                            {/* <small className="text-danger">{this.state.name}</small> */}
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label htmlFor="start_date">Location</label>
                                            <input type="text"
                                                className="form-control"
                                                id="location"
                                                ref="location"
                                                name="location"
                                                placeholder="Enter location"
                                                value={this.state.location}
                                                onChange={this.onChangeLocation}
                                            />
                                            {/* <small className="text-danger">{this.state.start_date}</small> */}
                                        </div>
                                    </div>
                                    
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label htmlFor="file">Model</label>
                                            <input type="file"
                                                className="form-control"
                                                id="file"
                                                ref="file"
                                                name="file"
                                                value={this.state.file[0]}
                                                onChange={this.onChangeFile}
                                            />
                                            {/* <small className="text-danger">{this.state.end_date}</small> */}
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label htmlFor="published">Publish</label>
                                            <select 
                                            className="form-control"
                                            id="published"
                                            ref="published"
                                            name="published"
                                            
                                            value={this.state.published}
                                            onChange={this.onChangePublished}
                                            > 
                                            <option value="true">Active</option>
                                            <option value="false">Disable</option>
                                            </select>
                                            {/* <small className="text-danger">{this.state.start_date}</small> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                        <button
                            className="btn btn-primary btn-block"
                            disabled={this.state.loading}
                        >
                            {this.state.loading && (
                            <span className="spinner-border spinner-border-sm"></span>
                            )}
                            <span>Submit</span>
                        </button>
                      
                       
                    </form>
                </div>
            </>
        );
    }
}

export default AdsForm;