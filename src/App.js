import './App.css';
import AddNewEmployee from "./Components/AddNewEmployee";
import {BrowserRouter as Router, Route} from 'react-router-dom'
import ViewAll from "./Components/ViewAll";
import UpdateEmployee from "./Components/UpdateEmployee";

function App() {
    return (
        <Router>
            <div className="main">
                <h2 className="main-header">3RIVE Employee Handler</h2>
                <div>
                    <Route exact path='/' component={AddNewEmployee}/>
                </div>
                <div style={{marginTop: 20}}>
                    <Route exact path='/read' component={ViewAll}/>
                </div>

                <Route path='/update' component={UpdateEmployee}/>
            </div>
        </Router>
    );
}

export default App;
