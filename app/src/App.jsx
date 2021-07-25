import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Characters from './containers/Characters'
import Space from './containers/Space'
import GlobalStyles from './styles/GlobalStyles'
import Typography from './styles/Typography'
import 'normalize.css'

export default function App() {
  return (
    <main>
      <GlobalStyles />
      <Typography />
      <Router>
        <Switch>
          <Route exact path="/" component={Space} />
          <Route path="/characters" component={Characters} />
        </Switch>
      </Router>
    </main>
  )
}
