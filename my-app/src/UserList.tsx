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
                    <img src={user.image} alt={`${user.firstName} ${user.lastName}`} className="w-8 h-8 rounded-full mr-2" />
                    {user.firstName} {user.lastName} - {user.email}
                </li>
      ))}
    </ul>
    );
}

export default UserList;
