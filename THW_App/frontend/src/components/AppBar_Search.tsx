import React from 'react';
import { Navbar, Container } from 'react-bootstrap';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

export default function SearchAppBar() {
  return (
    <Navbar variant="light" expand="lg" fixed="top" className="w-100" style={{ backgroundColor: '#254aa5' }}>
      <Container fluid>
          <IconButton
            style={{ color: 'white', paddingLeft: '10px' }}
            size="large"
            edge="start"
            color="default"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <img 
            src="/logo_light.svg"
            alt="App Logo"
            style={{
              height: '100%',
              width: 'auto',
              maxHeight: '40px',
              marginRight: 'auto',
            }}
          />
      </Container>
    </Navbar>
  );
}
