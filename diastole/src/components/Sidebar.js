import React, { useState } from 'react'; 



import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from '../actions/authActions';

import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import HomeIcon from '@material-ui/icons/Home';
import MoreIcon from '@material-ui/icons/MoreVert';
import InfoIcon from '@material-ui/icons/InfoOutlined'
import Map from '@material-ui/icons/MapSharp'
import ExitToApp from '@material-ui/icons/ExitToApp'

import Logo from './../assets/logo.svg'; 

const SideBar = ({ logout }) => {
    const createLink = (icon, name, route, action) => ({ icon, name, route, action })

    const links = [
        createLink(HomeIcon, 'Home', '/'),
        createLink(AccountCircle, 'Perfil', '/profile'),
        createLink(Map, 'Seguidor', '/tracker'),
        createLink(ExitToApp, 'Logout', '', logout),
      ]

    const [activeIcon, setActiveIcon] = useState(); 
    return (
        <div className = "side-bar">
            <div clssName = "icons-bar">
            <img className = "logo" src = {Logo} /> 
                {
              links.map(({ icon: Icon, name, route, action }, index) => (
                    <div className = {index <= links.length - 2 ? "icon-container-menu" : "icon-container-menu last"}> 
                        <span class = "line-icon-decorator" /> 
                        <IconButton className="icon-side-menu" color="secondary" key={name} component={Link} to={route} onClick={() => action && action()}>
                            <Badge color="white">
                                <Icon />
                            </Badge>
                        </IconButton>
                    </div>
              ))
            }
        </div>
        </div>
    ) 
}

export default SideBar; 