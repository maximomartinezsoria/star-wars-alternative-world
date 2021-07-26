import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Characters from './containers/Characters'
import Planets from './containers/Planets'
import GlobalStyles from './styles/GlobalStyles'
import Typography from './styles/Typography'
import 'normalize.css'

export default function App() {
  return (
    <>
      <GlobalStyles />
      <Typography />
      <Router>
        <Switch>
          <Route exact path="/" component={Planets} />
          <Route path="/characters" component={Characters} />
        </Switch>
      </Router>
    </>
  )
}
