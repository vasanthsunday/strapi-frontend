import React,  { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import {  Navigate } from "react-router-dom";
import { pageDesignerAction } from "../../pets/actions";
import PetService from "../../pets/petsService";
import {Row,Col} from "reactstrap";
  import Blog from "../../components/dashboard/Blog";
  import bg1 from "../../assets/images/bg/brown_1.jpg";
  import bg2 from "../../assets/images/bg/blue-background.jpg";
  import bg3 from "../../assets/images/bg/one-page-wonder.medium_1_.jpg";
  import bg4 from "../../assets/images/bg/bg4.jpg";


  const BlogData = [
	{
	  image: bg1,
	  title: "Brown",
	  subtitle: "",
	  description:
		"",
	  btnbg: "primary",
	  url: "/pagedesigner"
	},
	{
	  image: bg2,
	  title: "Blue Rocks",
	  subtitle: "",
	  description:
		"",
	  btnbg: "primary",
	  url: "/pagedesigner"
	},
	{
	  image: bg3,
	  title: "One Page Wonder",
	  subtitle: "",
	  description:
		"",
	  btnbg: "primary",
	  url: "/pagedesigner"
	},
	{
	  image: bg4,
	  title: "Christmas Party",
	  subtitle: "",
	  description:
		"",
	  btnbg: "primary",
	  url: "/pagedesigner"
	},
  ];
  
  const TemplateSelection = () => {
	return (
	  <div>
		
		<h5 className="mb-3">Template Selection</h5>
		<Row>
		  {BlogData.map((blg, index) => (
			<Col sm="6" lg="6" xl="3" key={index}>
			  <Blog
				image={blg.image}
				title={blg.title}
				subtitle={blg.subtitle}
				text={blg.description}
				color={blg.btnbg}
			  />
			</Col>
		  ))}
		</Row>
		
	  </div>
	);
  };
  
  export default TemplateSelection;
  