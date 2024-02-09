import React, { useState } from "react"
import { User } from "./types"

interface EditFormProps {
    user: User;
    onSubmit: (updatedUser: User) => void;
    onClose: () => void;
    mutationStatus: string | null;
    setMutationStatus: (status: string | null) => void;
}

function EditUserForm({ user, onSubmit, onClose}: EditFormProps) {
   const  [updatedUser, setUpdatedUser] = useState<User>({...user});
   const [mutationStatus, setMutationStatus] = useState<string | null>(null);

   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type} = e.target;
    const isChecked = (e.target as HTMLInputElement).type === "checkbox"
    
    setUpdatedUser(prevUser => ({
        ...prevUser,
        [name]: type === "checkbox" ? isChecked : value
    }))
   
   };

   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
        const response = await fetch('https://dummyjson.com/users', {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedUser)
        });

        if (response.ok) {
            setMutationStatus("Success");
            onSubmit(updatedUser)
        } else {
            setMutationStatus("Failed");
        }
    } catch (error) {
        console.log("Sorry, this API does not allow writes!", error);
        setMutationStatus("Failed")
    }
   };


return (
    <div className= "flex fixed justify-center items-center inset-0 bg-black bg-opacity-50">
            <form onSubmit={handleSubmit} className="h-2/4 w-2/5 border-4 border-red rounded-lg p-2 bg-white text-xxl flex flex-col">
                <h1 className="font-bold text-3xl p-2">Edit User</h1>
                <div className="grid grid-cols-1 gap-2">
                    <div className="flex">
                        <label className="m-2">
                            First Name: 
                            <input className="border-2 rounded-lg text-sm p-2 w-60 ml-2 italic"
                                type="text" 
                                name="firstName" 
                                value={updatedUser.firstName} 
                                onChange={handleChange} 
                            />
                        </label>

                        <label className="m-2">
                            Last Name: 
                            <input className="border-2 rounded-lg text-sm p-2 w-60 ml-2 italic"
                                type="text" 
                                name="lastName" 
                                value={updatedUser.lastName} 
                                onChange={handleChange} 
                            />
                        </label>
                    </div>
                    <div className="grid grid-cols-2">
                    <label className="m-2">
                        Email: 
                        <input className="border-2 rounded-lg text-sm p-2 w-60 ml-12 italic"
                            type="text" 
                            name="email" 
                            value={updatedUser.email} 
                            onChange={handleChange} 
                        />
                    </label>
                    </div>
                    <div className="w-full h-6 bg-black bg-opacity-25 rounded-lg"></div>
                    <div className="mt-4">
                        <label className="m-2">
                            Birthday: 
                            <input className="border-2 rounded-lg text-sm p-2 w-60 ml-7 italic"
                                type="date" 
                                name="dob" 
                                value={updatedUser.dob} 
                                onChange={handleChange} 
                            />
                        </label>
                        

                        <label className="m-2">
                            Gender
                            <select className="border-2 rounded-lg text-sm p-2 w-60 ml-2 italic"
                                name="gender" 
                                value={updatedUser.gender} 
                                onChange={handleChange}>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>  
                            </select>
                        </label>
                    </div>
                    <div className="mt-4">
                        <label className="m-2">
                            State: 
                            <input className="border-2 rounded-lg text-sm p-2 w-60 ml-12 italic"
                                type="text" 
                                name="state" 
                                value={updatedUser.state} 
                                onChange={handleChange} 
                            />
                        </label>
                    </div>
                    

            </div>
            <div className="flex justify-center">
                <button className="mt-16 p-2 border-2 rounded-full text-sm w-24"type="submit">Submit</button>
                <button className="mt-16 p-2 border-2 rounded-full text-sm w-24"type="button" onClick={onClose}>Close</button>
            </div>
             {mutationStatus && (
                <div className="bg-white text-4xl">
                    Mutation Status: {mutationStatus === "Success" ? "Mutation successful" : "Mutation failed"}
                </div>
            )}
            </form>
           
    </div>
    )

    }


export default EditUserForm
