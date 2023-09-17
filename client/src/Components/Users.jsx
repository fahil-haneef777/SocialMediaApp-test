import React from 'react'
import { Button, Container, Row, Col } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import axios from 'axios'
import { useEffect, useState } from 'react';

function Users(props) {
  const [users, setusers] = useState([])
  const [newuser, setnewuser] = useState({
    first_name: '',
    last_name: '',
    email: '',
    avatar: ''
  })

  useEffect(() => {
    axios
      .get('http://localhost:3000/Users')
      .then((res) => { setusers(res.data.data) })
      .catch((err) => console.log(err))
  })

  const handleSubmit=()=>{
    axios
    .post('http://localhost:3000/Users',newuser)
    .then((res) => { console.log('users added') })
    .catch((err) => console.log(err))

  }

  return (
    <>
      <Container>
        <h1>Users</h1>
        <Row>
          {users.map((user,index) => (
            <Col md={4} key={index} >
              <Card style={{ width: '18rem', marginTop: '10px' }}>
                <Card.Img variant="top" src={user.avatar} style={{ height: '200px', width: '200px', borderRadius: '100%', margin: '5px auto' }} />
                <Card.Body>
                  <Card.Title>{user.first_name} {user.last_name}</Card.Title>
                  <Card.Text>
                    {user.email}
                  </Card.Text>
                  <Button variant="dark">Send request</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}



        </Row>
        <hr />
        <h3 style={{ marginTop: '50px' }}>Add new user</h3>

        <input type='text'
         placeholder='First name'
         value={newuser.first_name}
         onInput={(e)=>setnewuser({
          ...newuser,
          first_name:e.target.value
         })}
          /><br /><br />
        <input type='text'
         placeholder='Last name'
         value={newuser.last_name_name}
         onInput={(e)=>setnewuser({
          ...newuser,
          last_name:e.target.value
         })}
         /><br /><br />
        <input type='email'
         placeholder=' Email'
          value={newuser.email} 
          onInput={(e)=>setnewuser({
            ...newuser,
            email:e.target.value
           })}
          /><br /><br />
        <input type='text'
         placeholder='Avatar URL'
          value={newuser.avatar} 
          onInput={(e)=>setnewuser({
            ...newuser,
            avatar:e.target.value
           })}
          /><br /><br />
        <Button variant='dark' onClick={handleSubmit}>Submit</Button>

      </Container>




    </>
  )
}

export default Users