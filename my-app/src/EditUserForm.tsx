import React, { useState } from "react"
import { User } from "./types"

interface EditFormProps {
    user: User;
    onSubmit: (updatedUser: User) => void;
    onClose: () => void;
}

function EditUserForm({ user, onSubmit, onClose}: EditFormProps) {
   const  [updatedUser, setUpdatedUser] = useState<User>({...user});

   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type} = e.target;
    const isChecked = (e.target as HTMLInputElement).type === "checkbox"
    
    setUpdatedUser(prevUser => ({
        ...prevUser,
        [name]: type === "checkbox" ? isChecked : value
    }))
   
   };

   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(updatedUser)
   };


return (
    <div className= "flex fixed justify-center items-center inset-0 bg-black bg-opacity-50">
            <form onSubmit={handleSubmit} className="h-96 w-96 border-4 border-red  bg-white text-xxl flex flex-col">
                <h1 className="font-bold text-xxl">Edit User</h1>
                <label>
                    First Name: 
                    <input 
                        type="text" 
                        name="firstName" 
                        value={updatedUser.firstName} 
                        onChange={handleChange} 
                    />
                </label>

                <label>
                    Last Name: 
                    <input 
                        type="text" 
                        name="lastName" 
                        value={updatedUser.lastName} 
                        onChange={handleChange} 
                    />
                </label>

                <label>
                    Email: 
                    <input 
                        type="text" 
                        name="email" 
                        value={updatedUser.email} 
                        onChange={handleChange} 
                    />
                </label>

                <label>
                    Date of Birth: 
                    <input 
                        type="date" 
                        name="dob" 
                        value={updatedUser.dob} 
                        onChange={handleChange} 
                    />
                </label>

                <label>
                    Gender
                    <select 
                        name="gender" 
                        value={updatedUser.gender} 
                        onChange={handleChange}>
                            <option value="male">Male</option>
                            <option value="female">Female</option>  
                    </select>
                </label>

            <label>
                    State of Residence: 
                    <input 
                        type="text" 
                        name="state" 
                        value={updatedUser.state} 
                        onChange={handleChange} 
                    />
                </label>

                <button type="button" onClick={onClose}>Close</button>


            </form>
    </div>
    )

    }


export default EditUserForm