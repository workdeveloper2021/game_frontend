import React, { Component } from "react";
import Nav from "../../../components/Nav";
import Header from "../../../components/Header";
import PageTitle from "../../../components/PageTitle";
import AdsForm from "./AdsForm";
import { withRouter } from "react-router-dom";

class AddAds extends Component {
  state = {};
  constructor(props) {
    super(props);
    this.state = {
      eventId: props.match.params?.id,
    };
  }
  render() {
    return (
      <>
        <div className="nav_bg_color" id="wrapper">
          <Nav />
          <div id="page-wrapper" className="gray-bg">
            <div className="row border-bottom">
              <Header />
            </div>
            <div className="wrapper wrapper-content animated fadeInRight">
              {/* Page title start */}
              <PageTitle
                page_headline={this.state.eventId ? "Edit Ads" : "Add New Ads"}
              />
              {/* Page title end */}

              <div className="row form_bg">
                <div className="col-lg-12">
                  <AdsForm eventId={this.state.eventId} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(AddAds);
