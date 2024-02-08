import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import UserList from "./UserList"
import { User } from "./types"
import EditUserForm  from "./EditUserForm"



function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

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
    setIsModalOpen(true);
    console.log(selectedUser)
  };

  const handleSubmit = (updatedUser: User) => {
    console.log("Form submitted.", updatedUser)
  }

  const handleCloseEditForm = () => {
    setSelectedUser(null);
    setIsModalOpen(false);
  }
  
  
  
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
        
        <div className="bg-white h-full border-2">
          <div className="font-bold p-2">List of Users
             
          </div>
          <UserList users={users} selectUser={selectUser}/>
        </div>
      </section>
      {isModalOpen && selectedUser && (
        <EditUserForm user={selectedUser} onClose={handleCloseEditForm} onSubmit={handleSubmit}/>
      )}
      </main>
    </div>
  );
}

export default App;
