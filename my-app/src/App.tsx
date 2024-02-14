import React, {useState, useEffect} from 'react';
import logo from './Logo.png';
import UserList from "./UserList"
import { User } from "./types"
import EditUserForm  from "./EditUserForm"
import Toast from "./Toast"


function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [mutationStatus, setMutationStatus] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(()=> {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setIsLoading(true);
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
        setIsLoading(false);
        console.log(mappedUsers)
      } else {
        console.log("Invalid data")
      }
    } catch (error) {
      console.log("Error, couldn't get users.", error)
      
    } finally {
      setIsLoading(false);
    }
  };

  const selectUser = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
    console.log(selectedUser)
  };

  const handleSubmit = (updatedUser: User) => {
    setIsLoading(true);
    console.log("Form submitted.", updatedUser);
    setMutationStatus("Data updated!");
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
      <div className="flex">
        <div className="w-2/4 text-4xl m-6">Welcome to HealthStream User Management!</div>
        <div><img src={logo} alt="HS logo" className='h-28 w-28 fixed top-6 right-6'/></div>
      </div>
      <div className="ml-6 font-bold text-2xl text-blue-800">User Dashboard</div>
      <div className='ml-6 text-md italic'>Select a user to make changes</div>
      <section className="bg-trueGray-100 flex flex-col m-6 border-2 border-none h-full">
        
        <div className="bg-trueGray-400 h-full border-1">
          <div className='bg-slate-100'>
          <div className="grid grid-cols-2 h-12 w-2/3">
            <div className="font-bold text-xl m-2 text-gray-400">Name</div>
            <div className="font-bold text-xl m-2 ml-16 text-gray-400">Email</div>
          </div>
          <hr className="h-1 bg-amber-300 "></hr>
          </div>
          <UserList users={users} selectUser={selectUser}/>
        </div>
      </section>
      
      {isModalOpen && selectedUser && (
        <EditUserForm 
            user={selectedUser} 
            onClose={handleCloseEditForm} 
            onSubmit={handleSubmit}
            mutationStatus={mutationStatus}
            setMutationStatus={setMutationStatus}
            isLoading={isLoading}
            />
      )}

      {isLoading && (<Toast message={"Data loading..."} onClose={() => setIsLoading(false)} />)}

      {!isLoading && mutationStatus && (
        <Toast message={mutationStatus} onClose={() => setMutationStatus(null)}/>
      )}

      </main>
    </div>
  );
}

export default App;
