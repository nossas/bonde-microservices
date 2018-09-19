import React from 'react'
import { Text, Title, Flexbox2 as Flexbox, Spacing } from 'bonde-styleguide'
import SearchForm from './components/SearchForm'

const styles = {
  panel: {
    backgroundColor: 'white',
    padding: '50px 30px',
    maxWidth: '400px'
  }
}

const Panel = ({ children }) => (
  <div style={styles.panel}>
    {children}
  </div>
)

class Search extends React.Component {
  
  render () {
    return (
      <Flexbox horizontal middle>
        <Panel>
          <Spacing margin={{ bottom: 15 }}>
            <Title.H2 align='center'>Novo Match</Title.H2>
          </Spacing>
          <Spacing margin={{ bottom: 35 }}>
          <Text align='center'>Insira os dados da pessoa e o tipo de atendimento que você deseja buscar:</Text>
          </Spacing>
          <SearchForm />  
        </Panel>
      </Flexbox>
    )
  }
}

export default Search
