import React, {useState, useEffect} from "react";
import { useSelector } from "react-redux";
import {useNavigate} from "react-router-dom"
import { useLoginUserMutation } from "../lib/apis/authApi";
import { useGetCurrentUserMutation } from "../lib/apis/userApi";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

const LoginSignup = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const {user} = useSelector(state => state.userState);

  const [loginUser, {data, isSuccess, isError, error}] = useLoginUserMutation();
  const [getCurrentUser] = useGetCurrentUserMutation();

  const onLoginUser  = (event) => {
    event.preventDefault();

    if(!email || !password){
      return
    }

    loginUser({email, password});
  }


  useEffect(() => {
    if(user || isSuccess){
      navigate("/");
    }
  },  [user, isSuccess]);

  useEffect(() => {
    getCurrentUser();
  }, [])

  


  return (
    <Container style={{ marginTop: "100px" }}>
      <Row>
        <Col md={3} />
        <Col md={6}>
          <div className="mt-3 mb-5">
            <h1>Sign up to get started</h1>
          </div>

          {isError && <div className="mb-5 alert alert-danger" role="alert">
           {error?.data?.error || "something went wrong"}
          </div>}
          <Form onSubmit={onLoginUser}>
            <Form.Group className="mb-3">
              <Form.Control placeholder="Email" type="text" onChange={(event) => setEmail(event.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control placeholder="password" type="password" onChange={(event) => setPassword(event.target.value)} />
            </Form.Group>

            <Form.Group className="mt-3 mb-5">
              <Button style={{ width: "100%" }} type="submit">Sign up</Button>
            </Form.Group>
          </Form>
        </Col>
        <Col md={3} />
      </Row>
    </Container>
  );
};

export default LoginSignup;
