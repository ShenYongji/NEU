import { useState } from 'react';
import './App.css';
import { MainTabs } from './MainTabs';
import { User } from './User';
import { Home} from './Home';
import { Add } from './Add';

function App() {
  const [CurrentPage, setCurrentPage] = useState('home')

  
  let content;
  switch (CurrentPage) {
    case 'home':
      content = <Home />
      break;
    case 'add':
      content = <Add setCurrentPage={setCurrentPage} />
      break;
    case 'user':
      content = <User />
      break;
    default:
      content = <Home/>
      break;
  }
  return (
    <div className="App">
      <div className='main'>
        {content}
      </div>
      <div className = 'nav'>
        <MainTabs setCurrentPage={setCurrentPage}/>
      </div>
    </div>
  );
}

export default App;
