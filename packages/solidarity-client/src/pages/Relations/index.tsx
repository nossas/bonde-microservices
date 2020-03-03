import React from 'react'
import ReactTable from 'react-table'
import styled from 'styled-components';
import FetchMatches from '../../graphql/FetchMatches'
import { Flexbox2 as Flexbox, Title } from 'bonde-styleguide'

import 'react-table/react-table.css'
import columns from './columns'

export const Wrap = styled.div`
  width: 90%;
  margin: 40px;
`

const Table: React.FC = () => {
  return (
    <FetchMatches>
      {(data) => {
        return data.length === 0 ? (
          <Flexbox middle>
            <Wrap>
              <Title.H4 margin={{ bottom: 30 }}>
                Não existem conexões realizadas nessa comunidade.
              </Title.H4>
            </Wrap>
          </Flexbox>
        ) : (
          <Flexbox middle>
            <Wrap>
              <ReactTable
                data={data}
                columns={columns}
                defaultPageSize={10}
                className="-striped -highlight"
              />
            </Wrap>
          </Flexbox>
        )
    }}
    </FetchMatches>
  )
}

export default Table