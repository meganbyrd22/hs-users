import React from "react"
import { User } from "./types"

interface UserListProps {
    users: User[];
    selectUser: (user: User) => void;
}



function UserList({ users, selectUser }: UserListProps){
    console.log('Users', users);
    return (
        <ul>
            {users.map((user) => (
                <li key={user.id} onClick={() => selectUser(user)} className="cursor-pointer">
                    <div className="m-2 flex">
                        <img src={user.image} alt={`${user.firstName} ${user.lastName}`} className="m-2 w-8 h-8 rounded-full" />
                            <div className="grid grid-cols-2 m-2 w-2/3">
                                <div className="text-xl font-bold"> {user.firstName} {user.lastName}</div>
                                <div className="flex justify-center italic text-md m-2 border-2 rounded-lg w-60 p-1 text-white bg-blue-500 hover:bg-sky-400"> {user.email} </div>
                            </div>
                    </div>
                </li>
      ))}
    </ul>
    );
}

export default UserList;
