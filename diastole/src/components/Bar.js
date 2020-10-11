import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from '../actions/authActions';

import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import HomeIcon from '@material-ui/icons/Home';
import ListIcon from '@material-ui/icons/List';
import MapIcon from '@material-ui/icons/Map'
import ExitToApp from '@material-ui/icons/ExitToApp'

import SideBar from './Sidebar'; 

const useStyles = makeStyles((theme) => ({
  palette: {
    primary: {
      main: '#00d4ff',
    },
    secondary: {
      light: '#0066ff',
      main: '#00d4ff',
      contrastText: '#ffcc00',
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

const createLink = (icon, name, route, action) => ({ icon, name, route, action })

const PrimarySearchAppBar = ({ logout }) => {
  const classes = useStyles();
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const links = [
    createLink(HomeIcon, 'Home', '/'),
    createLink(MapIcon, 'Mapa', '/map'),
    createLink(ListIcon, 'Lista de beneficiarios', '/lista-beneficiarios'),
    createLink(ExitToApp, 'Logout', '', logout),
  ]

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {links.map(({ icon: Icon, name, route, action }) => (
        <MenuItem key={name} component={Link} to={route} onClick={() => action && action()}>
          <IconButton color="inherit" >
            <Badge color="secondary">
              <Icon />
            </Badge>
          </IconButton>
          <p>{name}</p>
        </MenuItem>
      ))
      }
    </Menu>
  );

  return (
    <div className={classes.grow}>


    <SideBar logout = {logout}/> 

      
      {renderMobileMenu}
    </div>
  );
}


const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    logout: authActions.logout
  },
  dispatch,
);

export default connect(null, mapDispatchToProps)(PrimarySearchAppBar);
