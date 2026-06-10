import logo from './logo.svg';
import './App.css';
// import IssueAdd from './Components/IssueAdd';
import IssueList from './Components/IssueList';
// import IssueFilter from './Components/IssueFilter';
import IssueTable from './Components/IssueTable';

function App() {
  return (
    <div className="App">
         <h1>Issue list</h1>
        <IssueList/>
         <h1>Issue Table</h1>
         <IssueTable/>
    </div>
  );
}

export default App;
