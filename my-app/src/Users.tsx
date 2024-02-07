import React from "react"
import { User } from "./types"

interface UserListProps {
    users: User[];
    selectUser: (user: User) => void;
}

function UserList({ users, selectUser }: UserListProps){
    return (
        <ul>
            {users.map((user) => (
                <li key={user.id} onClick={() => selectUser(user)} className="cursor-pointer">
                    <img src={user.avatar} alt={`${user.firstName} ${user.lastName}`} className="w-8 h-8 rounded-full mr-2" />
                    {user.firstName} {user.lastName} - {user.email}
                </li>
      ))}
    </ul>
    );
}

export default UserList;
