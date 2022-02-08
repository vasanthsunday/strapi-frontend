import React, { Component } from "react";
import { connect } from "react-redux";
import {  Navigate } from "react-router-dom";
import { Card, CardBody, CardTitle, CardSubtitle,   Row, Col,Label, Form,FormGroup} from "reactstrap";
import Select from 'react-select';
import { createPet } from "../../pets/actions";
import PetService from "../../pets/petsService";

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
      foods:"",
      selectedfoodarray: [],
      allfoods: "",
      allfoodsarray: []      
    };
  }

  componentDidMount() { 
    this.getAllFoods();
  }

  getAllFoods() {  
    PetService.getAllFoods().then((response) => {
      this.setState({
        allfoods: response.data.data,        
      }
       , this.transformIntoArray
      );
    });
  }

  transformIntoArray() {
    console.log('EditPet - transformAllFoodsIntoArray');  
    var tempfoodoptions = [];
    if (this.state.allfoods) {
      for (var i = 0; i < this.state.allfoods.length; i++) {
        var tempfoodobj = {};
        tempfoodobj.value = this.state.allfoods[i].id;
        tempfoodobj.label = this.state.allfoods[i].attributes.foodname;
        tempfoodoptions.push(tempfoodobj);
        this.setState({
          allfoodsarray: tempfoodoptions
        }, console.log(this.state.allfoods));
      }
    }


  }

  handleChange = (selectedfoodarray) => {
    this.setState({ selectedfoodarray }, () =>
      console.log(`Option selected:`, this.state.selectedfoodarray)
    );
    // var tempselectedfoodarray = this.state.selectedfoodarray;
    // this.setState(function (prevState) {
    //   return {
    //     currentPet: {
    //       ...prevState.currentPet,
    //       selectedfoodarray: tempselectedfoodarray,
    //     },
    //   };
    // });
  };
  
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

  savePet(e) {
    e.preventDefault();
    console.log('AddPet - savePet-', this.state.selectedfoodarray);
    const { name, animal, breed, location, age, sex,selectedfoodarray } = this.state;
    this.props.createPet(name, animal, breed, location, age, sex, selectedfoodarray).then(() => {
      this.setState({
        redirect: true,
      });
    });
  }

  render() {
    const { redirect } = this.state;
    const { allfoodsarray } = this.state;
    const { selectedfoodarray } = this.state;

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
                    <Label for="petFoods">Select Multiple Pet Food</Label>
                    <Select
                      id="petFoods"
                      isMulti
                      value={selectedfoodarray}
                      onChange={this.handleChange}
                      options={allfoodsarray}
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
