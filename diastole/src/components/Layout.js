import React from 'react'

// redux
import { connect } from 'react-redux';

import PrimarySearchBar from './Bar';

function Layout({ children, user }) {
  return (
    <>
      {user && <PrimarySearchBar />}
      {children}
    </>
  )
}

const mapStateToProps = (state, props) => ({
  ...props,
  user: state.user
});

export default connect(mapStateToProps)(Layout)
