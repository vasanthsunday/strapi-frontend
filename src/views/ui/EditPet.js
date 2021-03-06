import React, { Component } from "react";
import { connect } from "react-redux";
import {  Navigate } from "react-router-dom";
import { Card, CardBody, CardImg, CardTitle,Input, CardSubtitle,  Row, Col, Form, FormGroup, Label } from "reactstrap";
import { updatePet } from "../../pets/actions";
import PetService from "../../pets/petsService";
import Select from 'react-select';
import axios from "axios";


class EditPet extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeAnimal = this.onChangeAnimal.bind(this);
    this.onChangeBreed = this.onChangeBreed.bind(this);
    this.onChangeLocation = this.onChangeLocation.bind(this);
    this.onChangeAge = this.onChangeAge.bind(this);
    this.onChangeSex = this.onChangeSex.bind(this);
    this.updatePetMethod = this.updatePetMethod.bind(this);

    this.handleChange = this.handleChange.bind(this);
    this.getPet = this.getPet.bind(this);
    this.transformIntoArray = this.transformIntoArray.bind(this);
 

    this.state = {
      currentPet: {
        name: "",
        animal: "",
        breed: "",
        location: "",
        age: "",
        sex: "",
        foods: ""        
      },
      allfoods: "",
      allfoodsarray: [],
      redirect: false,
      selectedfoodarray: []
    };
  }

  handleChange = (selectedfoodarray) => {
    this.setState({ selectedfoodarray }, () =>
      console.log(`Option selected:`, this.state.selectedfoodarray)
    );
    var tempselectedfoodarray = this.state.selectedfoodarray;
    this.setState(function (prevState) {
      return {
        currentPet: {
          ...prevState.currentPet,
          selectedfoodarray: tempselectedfoodarray,
        },
      };
    });
  };

  componentDidMount() {
    var winlocation = window.location.hash;
    var id = winlocation.replace("#/edit-pet/", "");
    this.getPet(id);
  }

  getPet(id) {
    PetService.get(id).then((response) => {
      delete response.data.data.attributes.publishedAt;
      delete response.data.data.attributes.updatedAt;
      this.setState({
        currentPet: response.data.data.attributes,
        id: response.data.data.id,
      });
    },
    PetService.getAllFoods().then((response) => {
      this.setState({
        allfoods: response.data.data,        
      }
       , this.transformIntoArray
      );
    })
    );
  }


  transformIntoArray() {
    console.log('EditPet - transformAllFoodsIntoArray - this.state.allfoods', this.state.allfoods); 
    console.log('EditPet - transformAllFoodsIntoArray - this.state.currentPet.foods', this.state.currentPet.foods); 

    var tempfoodoptions = [];
    if (this.state.allfoods) {
      for (var i = 0; i < this.state.allfoods.length; i++) {
        var tempfoodobj = {};
        tempfoodobj.value = this.state.allfoods[i].id;
        tempfoodobj.label = this.state.allfoods[i].attributes.foodname;
        tempfoodoptions.push(tempfoodobj);
        this.setState({
          allfoodsarray: tempfoodoptions
        });
      }
    }

    var tempfoodCurrentPet = [];
    if (this.state.currentPet.foods.data) {
      for (var j = 0; j < this.state.currentPet.foods.data.length; j++) {
        var tempfoodobj2 = {};
        tempfoodobj2.value =  this.state.currentPet.foods.data[j].id;
        tempfoodobj2.label =  this.state.currentPet.foods.data[j].attributes.foodname;
        tempfoodCurrentPet.push(tempfoodobj2);
        this.setState({
          selectedfoodarray: tempfoodCurrentPet
        });
      }

      console.log('transformIntoArray() - this.state', this.state)
    }
  }

  updatePetMethod(e) {
    e.preventDefault();
    console.log('EditPet - updatePetMethod');
    console.log(window.location);       
    console.log('thisstate->',this.state);

    delete this.state.currentPet.headerimage;
    this.props
      .updatePet(this.state.id, this.state.currentPet, this.state.selectedfoodarray)
      .then(() => {
        this.setState({
          redirect: true,
        });
      });
  }

  onChangeName(e) {
    const name = e.target.value;
    this.setState(function (prevState) {
      return {
        currentPet: {
          ...prevState.currentPet,
          name: name,
        },
      };
    });
  }

  onChangeAnimal(e) {
    const animal = e.target.value;
    this.setState(function (prevState) {
      return {
        currentPet: {
          ...prevState.currentPet,
          animal: animal,
        },
      };
    });
  }

  onChangeBreed(e) {
    const breed = e.target.value;
    this.setState(function (prevState) {
      return {
        currentPet: {
          ...prevState.currentPet,
          breed: breed,
        },
      };
    });
  }

  onChangeLocation(e) {
    const location = e.target.value;
    this.setState(function (prevState) {
      return {
        currentPet: {
          ...prevState.currentPet,
          location: location,
        },
      };
    });
  }

  onChangeAge(e) {
    const age = e.target.value;
    this.setState(function (prevState) {
      return {
        currentPet: {
          ...prevState.currentPet,
          age: age,
        },
      };
    });
  }

  onChangeSex(e) {
    const sex = e.target.value;
    this.setState(function (prevState) {
      return {
        currentPet: {
          ...prevState.currentPet,
          sex: sex,
        },
      };
    });
  }
 

  render() {
    const { redirect, currentPet } = this.state;
    const { allfoodsarray } = this.state;
    const { selectedfoodarray } = this.state;    
    var headerimageurl = "";
    if (currentPet.headerimage) {
      const {headerimage: {data}}  = currentPet;
      console.log('data',data );
      if(data)
      {
        if (data.attributes)
        {
          const {attributes:{formats: {thumbnail: {url}}}} = data;
          headerimageurl = 'http://localhost:1337' + url;
          console.log('render - headerimageurl', headerimageurl);
        }
        else
        {
          console.log('no attributes');
        }
      }
    }

    
       
    
    //

    //console.log ('editpet - render',selectedfoodarray)
 
    if (redirect) {
      return <Navigate to="/pet" />;
    }

    return (
      <Row>
        <Col lg="12">
          <div className="list row">
            <Card>
              <CardBody>
                <CardTitle tag="h5" >Update</CardTitle>
                <CardSubtitle className="mb-2 text-muted" tag="h6">
                  Update a pet here
                </CardSubtitle>  

                <Form onSubmit={this.updatePetMethod} >

                <FormGroup>        
                  <div>
                <label htmlFor="headerimage">HeaderImage</label>        
                </div>
                   { headerimageurl && <img src={headerimageurl} alt="Header Image" />}                 
                  </FormGroup>

                  <FormGroup>
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      required
                      value={currentPet.name}
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
                      value={currentPet.animal}
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
                      value={currentPet.breed}
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
                      value={currentPet.location}
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
                      value={currentPet.age}
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
                      value={currentPet.sex}
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
                    <button className="btn btn-success">
                      Update
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

export default connect(null, { updatePet })(EditPet);
