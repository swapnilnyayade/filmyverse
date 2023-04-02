import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function BasicMenu({userName}) {

  const navigate = useNavigate()  
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    localStorage.clear()
    navigate('/')
    window.location.reload()
  };

  return (
    <div className='text-lg '>
      <Button  
        variant='outlined'
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <span className='usrbtn'>{userName}</span>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      > 
      <Link to={'/addmovie'}><MenuItem onClick={handleClose}>Add New</MenuItem> </Link>
      <Link to={'/profile'}><MenuItem onClick={handleClose}>Profile</MenuItem> </Link>
        <MenuItem onClick={logout}>Logout</MenuItem>
      </Menu>
    </div>
  );


}