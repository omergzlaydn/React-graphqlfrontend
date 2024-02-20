import React from 'react';
import CountryList from './components/CountryList';

const App: React.FC = () => {
  return (
    <div className="App">
      <header>
        <h1>GraphQL Countries</h1>
      </header>
      <main>
        <CountryList />
      </main>
    </div>
  );
};

export default App;
