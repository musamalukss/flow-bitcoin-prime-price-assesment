
import './App.scss';
import { Suspense,lazy } from 'react';


const Home = lazy(()=> import ('./components/Home'))

function App() {
  return (
    <div className="container">
      <Suspense fallback={<h1>Loading User</h1>}>
        <Home />
      </Suspense>
    </div>
  );
}

export default App;
