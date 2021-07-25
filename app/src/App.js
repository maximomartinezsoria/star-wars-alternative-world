import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Characters from './containers/Characters'
import Space from './containers/Space'

export default function App() {
  return (
    <main>
      <Router>
        <Switch>
          <Route exact path="/" component={Space} />
          <Route path="/characters" component={Characters} />
        </Switch>
      </Router>
    </main>
  )
}
