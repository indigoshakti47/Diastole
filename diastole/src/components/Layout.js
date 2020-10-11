import React from 'react'

// redux
import { connect } from 'react-redux';

import PrimarySearchBar from './Bar';

function Layout({ children, user }) {
  return (
    <>
      
      <div style = {{ display: 'flex'}}>
        <div className = "layout-bar">
          {user && <PrimarySearchBar />}
        </div>
        <div className = "layout-children">
          {children}
        </div>
      </div>
      
    </>
  )
}

const mapStateToProps = (state, props) => ({
  ...props,
  user: state.user
});

export default connect(mapStateToProps)(Layout)
