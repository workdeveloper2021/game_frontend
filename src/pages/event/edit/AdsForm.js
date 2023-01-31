import React, { Component } from 'react';
import axios from "axios";
import CheckButton from "react-validation/build/button";
import TutorialDataService from "../../../services/tutorial.service";
class AdsForm extends Component {
    constructor(props) {
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeLocation = this.onChangeLocation.bind(this);
        this.onChangeFile = this.onChangeFile.bind(this);
        this.onChangePublished = this.onChangePublished.bind(this);
        this.getTutorial = this.getTutorial.bind(this);
        this.updatePublished = this.updatePublished.bind(this);
        this.updateTutorial = this.updateTutorial.bind(this);
   
      
        this.state = {
          currentTutorial: {
            id: null,
            title: "",
            location: "",
            published: false,
            file: "",
            filename:""

          },
          message: ""
        };
      }

      componentDidMount() {
        var str = window.location.pathname;
        str = str.replace("/edit-event/", "");
        this.getTutorial(str);
      }
    

      onChangeTitle(e) {
        const title = e.target.value;
    
        this.setState(function(prevState) {
          return {
            currentTutorial: {
              ...prevState.currentTutorial,
              title: title
            }
          };
        });
      }

      onChangeLocation(e) {
        const location = e.target.value;
    
        this.setState(function(prevState) {
          return {
            currentTutorial: {
              ...prevState.currentTutorial,
              location: location
            }
          };
        });
      }

      onChangeFile(e) {
        const file = e.target.files[0] ;
        const filename = e.target.files[0].name ;
        this.setState(function(prevState) {
          return {
            currentTutorial: {
              ...prevState.currentTutorial,
              file: file,
              filename: filename
            }
            
          };
        });
      }

      onChangePublished(e) {
        const published = e.target.value;
    
        this.setState(function(prevState) {
          return {
            currentTutorial: {
              ...prevState.currentTutorial,
              published: published
            }
          };
        });
      }

      getTutorial(id) {
        TutorialDataService.get(id)
          .then(response => {
            this.setState({
              currentTutorial: response.data
            });
            // console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      }

      updatePublished(status) {        
       
        var data = {
          id: this.state.currentTutorial.id,
          title: this.state.currentTutorial.title,
          file:this.state.currentTutorial.filename,
          location: this.state.currentTutorial.location,
          published: status
        };
        console.log(data)
        var str = window.location.pathname;
        str = str.replace("/edit-event/", "");
        TutorialDataService.update(str, data)
          .then(response => {
            this.setState(prevState => ({
              currentTutorial: {
                ...prevState.currentTutorial,
                published: status
              }
            }));
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      }
    
      updateTutorial() {
        const formData = new FormData();
        formData.append("file", this.state.currentTutorial.file);
        formData.append("fileName", this.state.currentTutorial.filename);
        const res = axios.post(
          "http://localhost:8080/api/upload",
          formData
        );
        var str = window.location.pathname;
        str = str.replace("/edit-event/", "");
        TutorialDataService.update(
          str,
          this.state.currentTutorial
        )
          .then(response => {
            console.log(response.data);
            
            window.location.href= "/event-list";
            this.setState({
              message: "The tutorial was updated successfully!"
            });
          })
          .catch(e => {
            console.log(e);
          });
      }
      render() {
        const { currentTutorial } = this.state;
    
        return (
          <div>
            {currentTutorial ? (
              <div className="edit-form">
                <h4>Event</h4>
                <form>
                <div className="form-group">
                      <label htmlFor="name">Title</label>
                      <input type="text"
                          className="form-control"
                          id="title"
                          ref="title"
                          name="title"
                          placeholder="Enter title"
                          value={currentTutorial.title}
                          onChange={this.onChangeTitle}
                      />
                      {/* <small className="text-danger">{this.state.name}</small> */}
                  </div>
                  <div className="form-group">
                      <label htmlFor="start_date">Location</label>
                      <input type="text"
                          className="form-control"
                          id="location"
                          ref="location"
                          name="location"
                          placeholder="Enter location"
                          value={currentTutorial.location}
                          onChange={this.onChangeLocation}
                      />
                      {/* <small className="text-danger">{this.state.start_date}</small> */}
                  </div>
                  <div className="form-group">
                      <label htmlFor="file">Model</label>
                      <input type="file"
                          className="form-control"
                          id="file"
                          ref="file"
                          name="file"
                          onChange={this.onChangeFile}
                      />
                  </div>
    
                  <div className="form-group">
                    <label>
                      <strong>Status:</strong>
                    </label>
                    {currentTutorial.published ? "Published" : "Pending"}
                  </div>
                </form>
    
                {currentTutorial.published ? (
                  <button
                    className="badge badge-primary mr-2"
                    onClick={() => this.updatePublished(false)}
                  >
                    UnPublish
                  </button>
                ) : (
                  <button
                    className="badge badge-primary mr-2"
                    onClick={() => this.updatePublished(true)}
                  >
                    Publish
                  </button>
                )}
    
              
    
                <button
                  type="submit"
                  className="badge badge-success"
                  onClick={this.updateTutorial}
                >
                  Update
                </button>
                <p>{this.state.message}</p>
              </div>
            ) : (
              <div>
                <br />
                <p>Please click on a Tutorial...</p>
              </div>
            )}
          </div>
        );
      }
    }
    
export default AdsForm;