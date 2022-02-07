import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { Card, CardBody, CardTitle, CardSubtitle, Table, Button, Row, Col, Form,FormGroup} from "reactstrap";
import { createPet } from "../../pets/actions";

class AddPet extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeAnimal = this.onChangeAnimal.bind(this);
    this.onChangeBreed = this.onChangeBreed.bind(this);
    this.onChangeLocation = this.onChangeLocation.bind(this);
    this.onChangeAge = this.onChangeAge.bind(this);
    this.onChangeSex = this.onChangeSex.bind(this);
    this.savePet = this.savePet.bind(this);

    this.state = {
      name: "",
      animal: "",
      breed: "",
      location: "",
      age: "",
      sex: "",
      redirect: false,
    };
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value,
    });
  }

  onChangeAnimal(e) {
    this.setState({
      animal: e.target.value,
    });
  }

  onChangeBreed(e) {
    this.setState({
      breed: e.target.value,
    });
  }

  onChangeLocation(e) {
    this.setState({
      location: e.target.value,
    });
  }

  onChangeAge(e) {
    this.setState({
      age: e.target.value,
    });
  }

  onChangeSex(e) {
    this.setState({
      sex: e.target.value,
    });
  }

  savePet() {
    const { name, animal, breed, location, age, sex } = this.state;
    this.props.createPet(name, animal, breed, location, age, sex).then(() => {
      this.setState({
        redirect: true,
      });
    });
  }

  render() {
    const { redirect } = this.state;
    if (redirect) {
      return <Navigate to="/pet" />;
    }

    return (
      <Row>
        <Col lg="12">
          <div className="list row">
            <Card>
              <CardBody>
                <CardTitle tag="h5" >Create New</CardTitle>
                <CardSubtitle className="mb-2 text-muted" tag="h6">
                  Create a new pet here
                </CardSubtitle>

                <Form>

                  <FormGroup>
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      required
                      value={this.state.name}
                      onChange={this.onChangeName}
                      name="name"
                    />
                  </FormGroup>


                  <FormGroup>
                    <label htmlFor="animal">Animal</label>
                    <input
                      type="text"
                      className="form-control"
                      id="animal"
                      required
                      value={this.state.animal}
                      onChange={this.onChangeAnimal}
                      name="animal"
                    />
                  </FormGroup>

                  <FormGroup>
                    <label htmlFor="breed">Breed</label>
                    <input
                      type="text"
                      className="form-control"
                      id="breed"
                      required
                      value={this.state.breed}
                      onChange={this.onChangeBreed}
                      name="breed"
                    />
                  </FormGroup>

                  <FormGroup>
                    <label htmlFor="location">Location</label>
                    <input
                      type="text"
                      className="form-control"
                      id="location"
                      required
                      value={this.state.location}
                      onChange={this.onChangeLocation}
                      name="location"
                    />
                  </FormGroup>

                  <FormGroup>
                    <label htmlFor="age">Age</label>
                    <input
                      type="text"
                      className="form-control"
                      id="age"
                      required
                      value={this.state.age}
                      onChange={this.onChangeAge}
                      name="age"
                    />
                  </FormGroup>

                  <FormGroup>
                    <label htmlFor="sex">Sex</label>
                    <input
                      type="text"
                      className="form-control"
                      id="sex"
                      required
                      value={this.state.sex}
                      onChange={this.onChangeSex}
                      name="sex"
                    />
                  </FormGroup>

                  <FormGroup>
                    <button onClick={this.savePet} className="btn btn-success">
                      Create New
                    </button>
                  </FormGroup>

                </Form>
              </CardBody>
            </Card>
          </div>
        </Col>
      </Row >
    );
  }
}
export default connect(null, { createPet })(AddPet);
