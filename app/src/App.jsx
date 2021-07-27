import { useContext } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import Characters from './containers/Characters'
import Planets from './containers/Planets'
import Login from './containers/Login'
import GlobalStyles from './styles/GlobalStyles'
import Typography from './styles/Typography'
import 'normalize.css'
import { Store } from './store'

export default function App() {
  const { isAuth } = useContext(Store)

  return (
    <>
      <GlobalStyles />
      <Typography />
      <Router>
        <Switch>
          {!isAuth && <Route path="/login" component={Login} />}
          {!isAuth && <Redirect to="/login" />}
          <Route exact path={['/', '/planets/*']} component={Planets} />
          <Route path="/characters" component={Characters} />
        </Switch>
      </Router>
    </>
  )
}
