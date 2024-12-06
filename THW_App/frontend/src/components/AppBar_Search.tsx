import React, { useState, useEffect } from 'react';
import { Navbar, Container, Popover, OverlayTrigger } from 'react-bootstrap';
import api from '../services/api';

export default function SearchAppBar() {
  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    api.get(`/users`)
    .then(response => {
      setUser(response.data);
    })
    .catch(error => {
      console.error('No User given:', error);
    });
  }, []);

  const userInitials = user ? `${user.prename[0]}${user.name[0]}` : '';

  const userPopover = (
    <Popover id="user-popover">
      <Popover.Header as="h3">Benutzerinformationen</Popover.Header>
      <Popover.Body>
        {user && (
          <>
            <p><strong>Name:</strong> {user.prename} {user.name}</p>
            <p><strong>Rolle:</strong> {user.role}</p>
          </>
        )}
      </Popover.Body>
    </Popover>
  );

  return (
    <Navbar variant="light" expand="lg" fixed="top" className="w-100" style={{ backgroundColor: '#254aa5' }}>
      <Container fluid className="d-flex justify-content-between align-items-center">
        <img 
          src="/logo_light.svg"
          alt="App Logo"
          style={{
            height: '100%',
            width: 'auto',
            maxHeight: '40px',
          }}
        />
        {user && (
          <OverlayTrigger
            trigger="click"
            placement="bottom"
            overlay={userPopover}
            rootClose
          >
            <div 
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: '#ffffff',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer',
                color: '#254aa5',
                fontWeight: 'bold'
              }}
            >
              {userInitials}
            </div>
          </OverlayTrigger>
        )}
      </Container>
    </Navbar>
  );
}
