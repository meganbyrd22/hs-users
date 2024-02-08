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
                    <div className="grid grid-cols-4 m-2">
                        <div className="flex gap-4">
                       <img src={user.image} alt={`${user.firstName} ${user.lastName}`} className="m-2 w-8 h-8 rounded-full" />
                            <div>
                                <div className="text-xl"> {user.firstName} {user.lastName}</div>
                                <div className="italic text-md"> {user.email} </div>
                            </div>
                       </div>
                       <div className="text-xl m-2">{user.dob} </div>
                       <div className="text-xl m-2">{user.gender}</div>
                    </div>
                </li>
      ))}
    </ul>
    );
}

export default UserList;
