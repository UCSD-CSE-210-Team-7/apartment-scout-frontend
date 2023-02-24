import React, { useState } from "react";

import Button from "react-bootstrap/Button";
import userImg from "../img/user.jpg";
import Form from "react-bootstrap/Form";
import "../styles/profile-styles.scss";

const Profile = ({ auth }) => {
  function getCurrentUser() {
    let user = {
      name: "Default Name",
      email: "email@email.com",
      imageUrl: "http://placehold.it/150x150",
    };
    return user;
  }

  const [editMode, setEditMode] = useState(false);

  function handleEditButtonClick() {
    setEditMode(!editMode);
  }

  return (
    <div className="row">
      <div className="col-3 left-half">
        <div className="image-container">
          <img src={userImg} className="img-thumbnail" />
        </div>
        <Button variant="info" className="upload-photo-button">
          Upload
        </Button>{" "}
      </div>
      <div className="col-9 right-half" style={{ backgroundColor: "gray" }}>
        <div className="personl-info-header-section">
          <h3 className="personal-info-header">Personal Information</h3>
          <Button
            variant="primary"
            type="edit"
            onClick={handleEditButtonClick}
            disabled={editMode}
            className="edit-button"
          >
            Edit
          </Button>
        </div>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter Name"
              readOnly={!editMode}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              readOnly={!editMode}
              name="email"
            />
            <Form.Control.Feedback type="invalid">Invalid email address</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPhone">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="phone"
              placeholder="Enter phone number"
              readOnly={!editMode}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              minLength={6}
              isInvalid={false} // assume always valid
              readOnly={!editMode}
            />
            <Form.Control.Feedback type="invalid">
              Invalid password
            </Form.Control.Feedback>
            <Form.Text className="text-muted">
              Password should have at least 6 characters
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Re-enter password</Form.Label>
            <Form.Control
              type="re-password"
              placeholder="Password"
              name="re-password"
              minLength={6}
              isInvalid={false} // assume always valid
              readOnly={!editMode}
            />
            <Form.Control.Feedback type="invalid">
              Invalid password
            </Form.Control.Feedback>
            <Form.Text className="text-muted">
              Password should have at least 6 characters
            </Form.Text>
          </Form.Group>
        </Form>
        <Button
          variant="primary"
          type="edit"
          onClick={handleEditButtonClick}
          disabled={!editMode}
        >
          Save
        </Button>
      </div>
    </div>
  );

  // <div className="row">
  //   <div className="col-12">
  // <div className="card">
  //   <div className="card-body">
  //     <div className="card-title mb-4">
  //       <div className="d-flex justify-content-start">
  //         <div className="image-container">
  //           <img
  //             src={getCurrentUser().imageUrl}
  //             style={{
  //               width: 150,
  //               height: 150,
  //               objectFit: 'cover',
  //             }}
  //             className="img-thumbnail"
  //           />
  //         </div>
  //         <div className="userData ml-3">
  //           <h2>{getCurrentUser().name}</h2>
  //           <h6>{getCurrentUser().email}</h6>
  //           <h6>Customer info</h6>
  //         </div>
  //       </div>
  //     </div>

  //         <div className="row">
  //           <div className="col-12">
  //   <Tabs defaultActiveKey="info" id="uncontrolled-tab-example">
  //     <Tab eventKey="info" title="Basic info">
  //       <div className="mt-4">
  //         <div className="row">
  //           <div className="col-sm-3 col-md-2 col-5">
  //             <label className="item-label">Full Name</label>
  //           </div>
  //           <div className="col-md-8 col-6">Lorem Ipsum</div>
  //         </div>
  //         <hr />

  //                   <div className="row">
  //                     <div className="col-sm-3 col-md-2 col-5">
  //                       <label className="item-label">Birth Date</label>
  //                     </div>
  //                     <div className="col-md-8 col-6">March 22, 1983.</div>
  //                   </div>
  //                   <hr />

  //                   <div className="row">
  //                     <div className="col-sm-3 col-md-2 col-5">
  //                       <label className="item-label">Lorem Ipsum</label>
  //                     </div>
  //                     <div className="col-md-8 col-6">Lorem Ipsum</div>
  //                   </div>
  //                   <hr />
  //                   <div className="row">
  //                     <div className="col-sm-3 col-md-2 col-5">
  //                       <label className="item-label">Lorem Ipsum</label>
  //                     </div>
  //                     <div className="col-md-8 col-6">Lorem Ipsum</div>
  //                   </div>
  //                   <hr />
  //                   <div className="row">
  //                     <div className="col-sm-3 col-md-2 col-5">
  //                       <label className="item-label">Lorem Ipsum</label>
  //                     </div>
  //                     <div className="col-md-8 col-6">Lorem Ipsum</div>
  //                   </div>
  //                   <hr />
  //                 </div>
  //               </Tab>
  //               <Tab eventKey="additional" title="Additional info">
  //                 <div className="mt-4">
  //                   Dolorem ipsa ea voluptatem. Qui voluptatem totam velit rem
  //                   dolores. Esse delectus eius quidem et eveniet.Dolorem ipsa
  //                   ea voluptatem. Qui voluptatem totam velit rem dolores.
  //                   Esse delectus eius quidem et eveniet.
  //                 </div>
  //               </Tab>
  //             </Tabs>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // </div>
  //   );
};

export default Profile;
