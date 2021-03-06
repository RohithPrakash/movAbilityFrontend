import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ViewModal from "./modal";
import ListGroup from "react-bootstrap/ListGroup";
import "../../assets/styles/aaOpenRequests.css";
import jwtDecode from "jwt-decode";

import { fetchRequestForAirport } from "../../axios/apiCalls";
import { performActionByAirport } from "../../axios/apiCalls";
import { closeRequest } from "../../axios/apiCalls";

class OpenRequests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: "",
      id: "",
      code: "",
      requests: "",
      errors: "",
      success: "",
      modalShow: false,
      data: "",
      destinationAirportCode: null,
      departureAirportCode: null
    };
    this.decode = this.decode.bind(this);
    this.fetchOpenRequest = this.fetchOpenRequest.bind(this);
    this.closeRequests = this.closeRequests.bind(this);
    this.performAction = this.performAction.bind(this);
  }

  async componentDidMount() {
    this.decode();
  }

  decode() {
    let token;
    if (localStorage.getItem("session")) {
      token = JSON.parse(localStorage.getItem("session"));
    } else if (sessionStorage.getItem("session")) {
      token = JSON.parse(sessionStorage.getItem("session"));
    }
    if (token !== null) {
      const decodedToken = jwtDecode(token);
      this.setState(
        {
          code: decodedToken.code
        },
        function() {
          this.fetchOpenRequest();
        }
      );
    }
  }

  closeRequests() {
    let closedBy = null;
    if (this.state.code === this.state.departureAirportCode) {
      closedBy = "departureAirport";
    } else if (this.state.code === this.state.destinationAirportCode) {
      closedBy = "destinationAirport";
    }

    const request = {
      id: this.state.id,
      closedBy: closedBy
    };
    closeRequest(request)
      .then(res => {
        if (res.data.success) {
          this.setState(
            {
              success: res.data.response
            },
            function() {
              this.fetchOpenRequest();
            }
          );
        } else {
          this.setState(
            {
              errors: res.data
            },
            function() {
              this.fetchOpenRequest();
            }
          );
        }
      })
      .catch(e => {
        this.setState(
          {
            errors:
              e && e.response
                ? e.response.data.err
                : { error: "Something went wrong!" }
          },
          function() {
            this.fetchOpenRequest();
          }
        );
      });
  }

  performAction() {
    let responseBy = null;
    if (this.state.code === this.state.departureAirportCode) {
      responseBy = "departureAirport";
    } else if (this.state.code === this.state.destinationAirportCode) {
      responseBy = "destinationAirport";
    }
    const request = {
      id: this.state.id,
      airportResponse: this.state.response,
      responseBy: responseBy
    };
    performActionByAirport(request)
      .then(res => {
        if (res.data.success) {
          this.setState(
            {
              success: res.data.response,
              id: "",
              airportResponse: ""
            },
            function() {
              this.fetchOpenRequest();
            }
          );
        } else {
          this.setState(
            {
              errors: res.data
            },
            function() {
              this.fetchOpenRequest();
            }
          );
        }
      })
      .catch(e => {
        this.setState(
          {
            errors:
              e && e.response
                ? e.response.data.err
                : { error: "Something went wrong!" }
          },
          function() {
            this.fetchOpenRequest();
          }
        );
      });
  }

  fetchOpenRequest() {
    const request = {
      code: this.state.code,
      closed: "false"
    };
    fetchRequestForAirport(request)
      .then(res => {
        if (res.data.success) {
          this.setState({ requests: res.data.request });
        } else {
          this.setState({
            errors: res.data
          });
        }
      })
      .catch(e => {
        this.setState({
          errors:
            e && e.response
              ? e.response.data.err
              : { error: "Something went wrong!" }
        });
      });
  }

  render() {
    let modalClose = () => this.setState({ modalShow: false });

    return (
      <div className="vh-100">
        <h4 className="text-center">
          <i>Open Requests Page</i>
        </h4>
        <br />
        {this.state.requests.length > 0 ? (
          this.state.requests.map((request, index) => (
            <Card className="my-3" key={index}>
              <Card.Header className="text-center">
                <b>Request ID No:</b> {request.id}
              </Card.Header>
              <Card.Body>
                <ListGroup>
                  <ListGroup.Item>
                    <b>Requested For:</b> {request.requestedFor}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <b>Phone Number:</b> {"+" + request.phoneNumber}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <b>Disability:</b> {request.disability}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <b>Response By Departure Airport:</b>{" "}
                    {request.departureAirportResponse === "true"
                      ? "Approved"
                      : request.departureAirportResponse === "false"
                      ? "Denied"
                      : "No Action"}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <b>Response By Destination Airport:</b>{" "}
                    {request.destinationAirportResponse === "true"
                      ? "Approved"
                      : request.destinationAirportResponse === "false"
                      ? "Denied"
                      : "No Action"}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <b>Response By Airline:</b>{" "}
                    {request.airlineResponse === "true"
                      ? "Approved"
                      : request.airlineResponse === "false"
                      ? "Denied"
                      : "No Action"}
                  </ListGroup.Item>
                </ListGroup>
                <br />
                <hr />
                <Button
                  className="col-8 col-xs-8 col-sm-8 col-md-4 col-lg-3 m-1"
                  variant="primary"
                  onClick={() =>
                    this.setState({ modalShow: true, data: request })
                  }
                >
                  Info
                </Button>
                <ViewModal
                  show={this.state.modalShow}
                  onHide={modalClose}
                  data={this.state.data}
                />
                {(this.state.code === request.originCode &&
                  request.departureAirportResponse === "true") ||
                request.departureAirportResponse === "false" ||
                ((this.state.code === request.destinationCode &&
                  request.destinationAirportResponse === "true") ||
                  request.destinationAirportResponse === "false") ? (
                  <Button
                    className="col-8 col-xs-8 col-sm-8 col-md-4 col-lg-3 m-1"
                    variant="success"
                    value="true"
                    onClick={() =>
                      this.setState(
                        {
                          id: request._id,
                          destinationAirportCode: request.destinationCode,
                          departureAirportCode: request.originCode
                        },
                        function() {
                          this.closeRequests();
                        }
                      )
                    }
                  >
                    Close Request
                  </Button>
                ) : (this.state.code === request.originCode &&
                    request.departureAirportResponse === "null") ||
                  (this.state.code === request.destinationCode &&
                    request.destinationAirportResponse === "null") ? (
                  <>
                    <Button
                      className="col-8 col-xs-8 col-sm-8 col-md-4 col-lg-3 m-1"
                      variant="success"
                      value="true"
                      onClick={() =>
                        this.setState(
                          {
                            id: request._id,
                            response: "true",
                            destinationAirportCode: request.destinationCode,
                            departureAirportCode: request.originCode
                          },
                          function() {
                            this.performAction();
                          }
                        )
                      }
                    >
                      Accept
                    </Button>
                    <Button
                      className="col-8 col-xs-8 col-sm-8 col-md-4 col-lg-3 m-1"
                      variant="danger"
                      value="false"
                      onClick={() =>
                        this.setState(
                          {
                            id: request._id,
                            response: "false",
                            destinationAirportCode: request.destinationCode,
                            departureAirportCode: request.originCode
                          },
                          function() {
                            this.performAction();
                          }
                        )
                      }
                    >
                      Deny
                    </Button>
                  </>
                ) : null}
              </Card.Body>
              <Card.Footer className="text-muted text-center">
                <b>Raised On:</b>{" "}
                {request.date.slice(8, 10) +
                  "-" +
                  request.date.slice(5, 7) +
                  "-" +
                  request.date.slice(0, 4)}{" "}
              </Card.Footer>
            </Card>
          ))
        ) : (
          <Card className="my-3">
            <Card.Header className="text-center">No requests</Card.Header>
          </Card>
        )}
      </div>
    );
  }
}

export default OpenRequests;
