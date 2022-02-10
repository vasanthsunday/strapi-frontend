import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Card, CardBody, CardTitle, CardSubtitle, Table, Button, Row, Col, } from "reactstrap";
import { retrievePets, deletePet } from "../../pets/actions";

class PetList extends Component {
  componentDidMount() {
    this.props.retrievePets();
  }

  removePet = (id) => {
    this.props.deletePet(id).then(() => {
      this.props.retrievePets();
    });
  };

  render() {
    const { pets } = this.props;
    
    let imageslist = [];
    console.log('pets.js-render-',pets);
    if(pets.length>0)
    {
      for(let k=0; k < pets.length; k++)
      {
        var pet = pets[k];
        var headerimageurl = "";    
        console.log('each pet',k,pet);
        
        //const {headerimage: {data}}  = pet.attributes;
        const {headerimage}  = pet.attributes;
        console.log('headerimage',headerimage);

        if(headerimage && headerimage.data  !== null )
        {
          console.log('inside null check');
            const {data}  = headerimage;
            
            if(data)
            {
              console.log('data',data );
              if (data.attributes)
              {
                const {attributes:{formats: {thumbnail: {url}}}} = data;
                headerimageurl = 'http://localhost:1337' + url;
                imageslist.push(headerimageurl);
                console.log('render - headerimageurl', headerimageurl);
                imageslist[k] = headerimageurl;
              }
              else{
                imageslist[k] = "";
              }
            }
            else
            {
                imageslist[k] = "";
            }  
        }
        else
        {
          imageslist[k] = "";
        } 
      }
      console.log('imageslist',imageslist);
  }
   

    return (
      <Row>
        <Col lg="12">
          <div className="list row">
            <Card>
              <CardBody>
                <CardTitle tag="h5">Pet Listing</CardTitle>
                <CardSubtitle className="mb-2 text-muted" tag="h6">
                  Overview of the pets &nbsp; &nbsp;
                  <Button className="btn" outline color="info">
                    <Link to={`/add-pet`} style={{ textDecoration: 'none' }}>Create New
                    </Link>
                  </Button>

                </CardSubtitle>
                <Table className="no-wrap mt-3 align-middle" responsive borderless>
                  <thead>
                    <tr>
                    <th>Id</th>
                    <th>Image</th>
                      <th>Name</th>
                      <th>Animal</th>
                      <th>Breed</th>
                      <th>Location</th>
                      <th>Age</th>
                      <th>Sex</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pets &&
                      pets.map(
                        ({ id, attributes }, i) => (

                          <tr key={i} className="border-top">
                            <td>{id}</td>
                            <td>{ imageslist[i] && <img  src={imageslist[i]} alt="Header Image" width="50" height="50" />}    </td> 
                            <td>{attributes.name}</td>
                            <td>{attributes.animal}</td>
                            <td>{attributes.breed}</td>
                            <td>{attributes.location}</td>
                            <td>{attributes.age}</td>
                            <td>{attributes.sex}</td>
                            <td>
                              <div className="button-group">
                                <Button className="btn" outline color="info">
                                  <Link to={`/edit-pet/${id}`} style={{ textDecoration: 'none' }}>Edit
                                  </Link>
                                </Button>
                                <Button onClick={() => this.removePet(id)} outline className="btn" color="danger">
                                  Delete
                                </Button>
                              </div>
                            </td>
                          </tr>
                        )
                      )}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </div>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    pets: state.pets,
  };
};

export default connect(mapStateToProps, { retrievePets, deletePet })(PetList);