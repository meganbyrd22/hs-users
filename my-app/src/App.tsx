import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import UserList from "./UserList"
import { User } from "./types"



function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(()=> {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try{
      const response = await fetch('https://dummyjson.com/users');
      const data = await response.json();

      console.log('Data from API:', data)

      if (Array.isArray(data.users)){
        const mappedUsers: User[] = data.users.map((userData: any) => ({
          id: userData.id.toString(),
          image: userData.image,
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          dob: userData.birthDate,
          gender: userData.gender,
        }));
        const twentyUsers = mappedUsers.slice(0,20);
        setUsers(twentyUsers);
        console.log(mappedUsers)
      } else {
        console.log("Invalid data")
      }
    } catch (error) {
      console.log("Error, couldn't get users.", error)
    }
  };

  const selectUser = (user: User) => {
    setSelectedUser(user);
  };

  
  
  
  return (
    <div className="App">
      {/*<header className="App-header">
          TABLE HEADER
          </header>*/}
      <main>
      <div className="h-24 border-2 border-red text-lg m-6">Welcome to HealthStream User Management!</div>
      <div className="m-6 font-bold text-xl">Users</div>
      <div className='border-2 m-6'>Table Options, add buttons</div>
      <section className="bg-trueGray-100 flex flex-col m-6 border-2 h-full">
        <div className="bg-white h-96 border-2">
          <div className="border-2 font-bold p-2">List of Users
             
          </div>
          <UserList users={users} selectUser={selectUser} />
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
