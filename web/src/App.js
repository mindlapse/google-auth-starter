import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux'

import Amplify, { Hub } from 'aws-amplify';
import awsconfig from './aws-exports';
import user from './redux/state/user'
import Nav from './comp/Nav'
import SideBar from './comp/SideBar'
import styled from 'styled-components'
import GoogleSignInButton from './comp/GoogleSignInButton';
import layout from './comp/style/layout';

Amplify.configure(awsconfig);


const Main = styled.div`
  padding:1em;
  padding-left: calc(${layout.SIDEBAR_WIDTH} + 1em);
`
const SubNav = styled.div`
  margin-top:3em;
`



export default () => {

  const dispatch = useDispatch()

  useEffect(() => {
    Hub.listen('auth', (data) => {
      if (data.payload.event == "signIn") {
        dispatch(user.actions.setAuthenticationInfo())
      }
    })

    dispatch(user.actions.setAuthenticationInfo())
  }, [])

  
  return (
    <>
      <Nav />
      <SubNav>
        <SideBar />
        <Main>
          <GoogleSignInButton />
        </Main>
      </SubNav>

    </>
  );
}
