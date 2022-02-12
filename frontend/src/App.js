import './App.css';
import MeetingsList from './components/MeetingsList/MeetingsList';
import CreateMeeting from './components/CreateMeeting/CreateMeeting';
import MeetingPage from './components/MeetingPage/MeetingPage';
import {
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
    <Switch>
      <Route exact path="/">
        <div className="home">
          <CreateMeeting></CreateMeeting>
          <MeetingsList></MeetingsList>
        </div>
      </Route>
      <Route path="/meeting/:id"><MeetingPage></MeetingPage></Route>
    </Switch>
    
  );
}

export default App;
