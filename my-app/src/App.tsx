import React from 'react';
import logo from './logo.svg';
import UserList from "./UserList"
import { User } from "./types"



function App() {
  return (
    <div className="App">
      {/*<header className="App-header">
          TABLE HEADER
          </header>*/}
      <main>
      <div className="h-24 border-2 border-red text-lg m-6">Welcome to HealthStream User Management!</div>
      <div className="m-6 font-bold text-xl">Users</div>
      <div className='border-2 m-6'>Table Options, add buttons</div>
      <section className="bg-trueGray-100 flex flex-col m-6 border-2">
        <div className="bg-white h-96 border-2">
          <div className="border-2 font-bold">List of Users 
          </div>
          
          <div className="border-2 flex">User Element(s)
            <div>lil icon</div>
            <div>Actual Element</div>
          </div>
        </div>

        



      </section>

      </main>
    </div>
  );
}

export default App;
