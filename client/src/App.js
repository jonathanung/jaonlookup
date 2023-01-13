import {Routes, Route} from 'react-router-dom'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Main from './screens/main';
import Profile from './screens/profile';


function App() {
  return (
    <div className="App">
      <Routes>
      <Route path="/profile" element={<Profile/>} />
      <Route path="/" element={<Main/>} />
      </Routes>
      </div>
  );
}

export default App;
