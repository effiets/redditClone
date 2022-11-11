
import './App.css';

import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Subreddits from './components/Subreddits/Subreddits';


function App() {


  return (
    <div className="App">
      <Header />
      <div className='home-content'>
      <Home />
      <aside>
        <Subreddits />
      </aside>
</div>
    </div>
  );
}

export default App;
