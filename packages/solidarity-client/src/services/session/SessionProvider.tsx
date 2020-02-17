import React from 'react'
import { FullPageLoading } from 'bonde-styleguide'
import SessionStorage from './SessionStorage'

/*
 * Responsible to control session used on cross-storage
 **/

interface SessionProviderState {
  signing: boolean;
  authenticated: boolean;
  token?: string;
}

class SessionProvider extends React.Component {

  storage: SessionStorage;
  state: SessionProviderState;

  constructor (props: any) {
    super(props)
    this.state = { signing: true, authenticated: false }
    this.storage = new SessionStorage()
  }

  componentDidMount () {
    this.fetchSession()
  }

  fetchSession () {
    this.storage
      .getAsyncToken()
      .then((token: string) => {
        if (!token) throw Error('unauthorized')

        this.setState({ signing: false, authenticated: true, token })
        return Promise.resolve()
      })
      .catch((err) => {
        // TODO: change url admin-canary
        if (err && err.message === 'unauthorized') {
          const loginUrl = process.env.REACT_APP_LOGIN_URL || 'http://admin-canary.bonde.devel:5002/auth/login'
          window.location.href = `${loginUrl}?next=${window.location.href}`
          this.setState({ signing: false, authenticated: false })
        } else {
          // reload fetchSession when error not authorized
          console.log('err', err.message)
          this.fetchSession()
        }
      })
  }

  render () {
    return !this.state.signing
      ? this.props.children
      : <FullPageLoading message='Carregando dados de usuário' />
  }
}

export default SessionProvider