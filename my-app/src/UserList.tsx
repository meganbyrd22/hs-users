import React from "react"
import { User } from "./types"

interface UserListProps {
    users: User[];
    selectUser: (user: User) => void;
}

function updateBirthdayFormat(dateString: string): string {
    const date = new Date(dateString);
    const month = date.toLocaleString('default', { month: 'long'});
    const day = date.getDate();
    return `${month}: ${day}`;
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
                       <div className="text-xl m-2">{updateBirthdayFormat(user.dob)} </div>
                       <div className="text-xl m-2">{user.gender.charAt(0).toUpperCase() + user.gender.slice(1)}</div>
                    </div>
                </li>
      ))}
    </ul>
    );
}

export default UserList;
