import React from 'react'
import styled from 'styled-components'
import { Auth } from 'aws-amplify'
import color from './style/colors'

const GoogleSignIn = styled.div`
    display: inline-block;
    background: white;
    color: ${color.TEXT};
    width: 190px;
    border-radius: 5px;
    border: thin solid ${color.BORDER};
    box-shadow: 1px 1px 1px ${color.SHADOW};
    white-space: nowrap;

    &:hover {
        cursor: pointer;
    }
`

const Icon = styled.div`
    background: url('/img/g.png') transparent 5px 50% no-repeat;
    display: inline-block;
    vertical-align: middle;
    width: 42px;
    height: 42px;
`

const ButtonText = styled.span`
    display: inline-block;
    vertical-align: middle;
    padding-left: 42px;
    padding-right: 42px;
    font-size: 14px;
    font-weight: bold;
    font-family: 'Roboto', sans-serif;
`

  export default () => {
      
    const onClick = () => Auth.federatedSignIn({provider: 'Google'})

    return (
        <GoogleSignIn onClick={onClick}>
            <Icon />
            <ButtonText>Google</ButtonText>
        </GoogleSignIn>
    )
  }