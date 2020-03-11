import React from 'react'
import { Tab, TabItem } from 'bonde-styleguide'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

const Tabs = styled(Tab)`
  position: absolute;
  bottom: 0;
`

const PageTabs = ({ tabs, selectedTab }) => {
  return (
    <Tabs>
      {tabs.map(({ name, to }, i) => (
        <NavLink to={to} key={`page-tabs-${i}`}>
          <TabItem active={selectedTab === name}>
            {name}
          </TabItem>
        </NavLink>
      ))}
  </Tabs>
  )
}

export default PageTabs