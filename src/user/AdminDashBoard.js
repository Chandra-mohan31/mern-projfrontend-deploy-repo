import React from 'react';

import Base from "../core/Base";
import {isAuthenticated} from "../auth/helper/index";
import { Link } from 'react-router-dom';

const AdminDashboard = () => {

    const {user:{name,email,role}} = isAuthenticated();

    const adminLeftSide = () => {
        return (
            <div className="card">
                <h4 className="card-header bg-dark text-white">Admin Nav</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link to="/admin/create/category" className="nav-link text-success">
                            Create Category
                        </Link>
                    </li>
                    {/* TODO: manage category here*/}
                    <li className="list-group-item">
                        <Link to="/admin/categories" className="nav-link text-success">
                            Manage Categories
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="/admin/create/product" className="nav-link text-success">
                            Create Products
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="/admin/products" className="nav-link text-success">
                            Mange Products
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="/admin/orders" className="nav-link text-success">
                            Mange Orders
                        </Link>
                    </li>
                </ul>
            </div>
        )

    }
    //TODO: try to have info like graph showing the sales and other activities in the site;

    const adminRightSide = () => {
        return (
          <div className="card mb-4">
            <h4 className="card-header">Admin Information</h4>
            <ul className="list-group">
              <li className="list-group-item">
                <span className="badge bg-success mr-2">Name:</span> {name}
              </li>
              <li className="list-group-item">
                <span className="badge bg-success mr-2">Email:</span> {email}
              </li>
    
              <li className="list-group-item">
                <span className="badge bg-danger">Admin Area</span>
              </li>
            </ul>
          </div>
        );
      };

    return (
        <Base title="Welcome Admin" description="Mange your Products here" className="container bg-success p-4" footerstyle={{positon:"absolute",bottom: 0,right: 0,left: 0}} >
        <div className="row">
        <div className="col-3">
        {adminLeftSide()}
        </div>
        <div className="col-9">
            {adminRightSide()}
        </div>
        </div>
        
            
            
        </Base>
    )
}

export default AdminDashboard;
