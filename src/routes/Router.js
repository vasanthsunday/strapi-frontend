import { lazy } from "react";
import { Navigate } from "react-router-dom";


/****Layouts*****/
const FullLayout = lazy(() => import("../layouts/FullLayout.js"));

/***** Pages ****/

const Starter = lazy(() => import("../views/Starter.js"));
const About = lazy(() => import("../views/About.js"));
const Alerts = lazy(() => import("../views/ui/Alerts"));
const Badges = lazy(() => import("../views/ui/Badges"));
const Buttons = lazy(() => import("../views/ui/Buttons"));
const Cards = lazy(() => import("../views/ui/Cards"));
const Grid = lazy(() => import("../views/ui/Grid"));
const Tables = lazy(() => import("../views/ui/Tables"));
const Forms = lazy(() => import("../views/ui/Forms"));
const Breadcrumbs = lazy(() => import("../views/ui/Breadcrumbs"));

const Pets = lazy(() => import("../views/ui/Pets"));
const AddPet = lazy(() => import("../views/ui/AddPet"));
const EditPet = lazy(() => import("../views/ui/EditPet"));

const PageDesigner = lazy(() => import("../views/ui/PageDesigner"));


const TemplateSelection = lazy(() => import("../views/ui/TemplateSelection"));
/*****Routes******/

const ThemeRoutes = [
  {
    path: "/",
    element: <FullLayout />,
    children: [
      { path: "/", element: <Navigate to="/starter" /> },

      { path: "/mediaitems", exact: true, element: <Starter /> },
      { path: "/createnew", exact: true, element: <About /> },
      { path: "/search", exact: true, element: <Alerts /> },
      { path: "/pet", exact: true, element: <Pets /> },
      { path: "/add-pet", exact: true, element: <AddPet /> },
      { path: "/edit-pet/:id", exact: true, element: <EditPet /> },
      { path: "/templateselection", exact: true, element: <TemplateSelection /> },
      { path: "/pagedesigner", exact: true, element: <PageDesigner /> },

      { path: "/starter", exact: true, element: <Starter /> },
      { path: "/about", exact: true, element: <About /> },
      { path: "/alerts", exact: true, element: <Alerts /> },
      { path: "/badges", exact: true, element: <Badges /> },
      { path: "/buttons", exact: true, element: <Buttons /> },
      { path: "/cards", exact: true, element: <Cards /> },
      { path: "/grid", exact: true, element: <Grid /> },
      { path: "/table", exact: true, element: <Tables /> },
      { path: "/forms", exact: true, element: <Forms /> },
      { path: "/breadcrumbs", exact: true, element: <Breadcrumbs /> },
    ],
  },
];

export default ThemeRoutes;
