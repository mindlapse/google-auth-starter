import React from 'react'
import { useDispatch } from 'react-redux'
import user from '../redux/state/user'
import styled from 'styled-components'

const SignOut = styled.div`
    margin-right:1em;
    cursor:pointer;
`

export default () => {
    const dispatch = useDispatch()
    

    return (
        <SignOut onClick={() => dispatch(user.actions.signOut())}>Sign Out</SignOut>
    )
}

