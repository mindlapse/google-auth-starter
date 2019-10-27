import React from 'react'
import styled from 'styled-components'
import user from '../redux/state/user'
import SignOut from './SignOut'
import color from './style/colors'

const Nav = styled.nav`
    position:fixed;
    background-color: ${color.HEADER_BAR};
    border-bottom: 1px solid ${color.BORDER};
    height:3em;
    width:100%;
    top:0em;
    display:flex;
    justify-content:space-between;
    align-items:center;
    padding: 0em 0em;
    z-index:1;
`

const Name = styled.div`
    padding-left:1em;
`

export default () => {

    const person = user.state.useUser()
    const isLoggedIn = person.token != null

    return (
        <Nav>
            <Name>
                { person.name }
            </Name>

            { isLoggedIn ? 
                <SignOut /> : ""
            }
        </Nav>
    )
}