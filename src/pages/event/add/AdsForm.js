import React, { Component, useRouter } from "react";
import axios from "axios";
import CheckButton from "react-validation/build/button";
import TutorialDataService from "../../../services/tutorial.service";
import { withRouter } from "react-router-dom";

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
      filename: "",
    };
  }

  componentDidMount() {
    if (this.props.eventId) {
      this.getTutorial(this.props.eventId);
    }
  }

  getTutorial(id) {
    TutorialDataService.get(id)
      .then((response) => {
        console.log(response.data);
        this.setState({
          id: response.data._id,
          title: response.data.title,
          location: response.data.location,
          published: response.data.published,
          file: "", // File object (input)
          filename: response.data.file,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value,
    });
  }

  onChangeLocation(e) {
    this.setState({
      location: e.target.value,
    });
  }

  onChangeFile(e) {
    if (e.target.files.length === 0) {
      // no file selected
      return;
    }
    this.setState({ file: e.target.files[0] });
    this.setState({ filename: e.target.files[0].name });
  }

  onChangePublished(e) {
    this.setState({
      published: e.target.value,
    });
  }

  async saveTutorial(e) {
    e.preventDefault();
    if (this.props.eventId === undefined && !this.state.file) {
      alert("P Select file");
      return;
    }
    let uploadResponse = { fileName: this.state.filename };

    if (this.state.file) {
      const formData = new FormData();
      formData.append("file", this.state.file, this.state.file.name);
      formData.append("fileName", this.state.filename);
      console.log(formData);
      uploadResponse = await axios.post(
        "http://localhost:8080/api/upload",
        formData
      );
    }

    let data = this.props.eventId
      ? { ...this.state, file: uploadResponse.data.fileName }
      : {
          title: this.state.title,
          location: this.state.location,
          file: uploadResponse.data.fileName,
          published: this.state.published,
        };

    TutorialDataService[this.props.eventId ? "update" : "create"](data)
      .then((response) => {
        console.log(response.data);
        this.props.history.push("/event-list");
      })
      .catch((e) => {
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
                      <input
                        type="text"
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
                      <input
                        type="text"
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
                      <input
                        type="file"
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
              <span> {this.props.eventId ? "Save" : "Add"}</span>
            </button>
          </form>
        </div>
      </>
    );
  }
}

export default withRouter(AdsForm);
