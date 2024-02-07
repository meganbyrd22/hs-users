import React from 'react';
import logo from './logo.svg';


function App() {
  return (
    <div className="App">
      {/*<header className="App-header">
          TABLE HEADER
          </header>*/}
      <main>
      <div className="h-24 border-2 border-red text-red">Header Spaceholder</div>
      <h1 className="flex h-44 w-96 mr-2 p-2 self-center font-bold text-indigo-400 text-4xl border-2 bg-white rounded-3xl">Hello!</h1>
      <section className='bg-trueGray-100 flex m-6'>
        <div className='bg-green'>TABLE</div>
        <div className='text-red'>Users</div>
        <div>Table Options, add buttons</div>
        <div className=""> {/*Table header*/} </div>
          <div className=""> {/*TABLE*/} </div>
            <div className=""> {/*Table lines */} </div>

        



      </section>

      </main>
    </div>
  );
}

export default App;
