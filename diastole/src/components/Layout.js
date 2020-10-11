import React from 'react'
import {Box} from '@material-ui/core'

// redux
import { connect } from 'react-redux';

import PrimarySearchBar from './Bar';

function Layout({ children, user }) {
  return (
    <>
      
      <Box display={'flex'} height={'100%'}>
        <div className = "layout-bar">
          {user && <PrimarySearchBar />}
        </div>
        <div className = "layout-children">
          {children}
        </div>
      </Box>
      
    </>
  )
}

const mapStateToProps = (state, props) => ({
  ...props,
  user: state.user
});

export default connect(mapStateToProps)(Layout)
