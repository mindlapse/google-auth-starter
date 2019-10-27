import React from 'react'
import styled from 'styled-components'
import layout from './style/layout'
import color from './style/colors'

const SideBar = styled.div`
    position:fixed;
    width:${layout.SIDEBAR_WIDTH};
    height:100%;
    background-color:${color.SIDE_BAR};
`


export default () => {

    return (
        <SideBar />
    )
}