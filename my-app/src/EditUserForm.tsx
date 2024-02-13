import React, { useState} from "react"
import { User } from "./types";
import Toast from "./Toast"

interface EditFormProps {
    user: User;
    onSubmit: (updatedUser: User) => void;
    onClose: () => void;
    mutationStatus: string | null;
    setMutationStatus: (status: string | null) => void;
    isLoading: boolean;
}

    
function validateValues(updatedUser: User){
const errors: Partial<User> = {};
const isValidEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(email)
    };

const validStates = [
    "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", 
        "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", 
        "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", 
        "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", 
        "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
];

const validGenders = ["male", "female"]

if (!updatedUser.firstName) {
    errors.firstName = "Required"
}

    if (!updatedUser.lastName) {
    errors.lastName = "Required"
}

    if (!updatedUser.email) {
    errors.email = "Email is required"
}else if (!isValidEmail(updatedUser.email)) {
    errors.email ="Email format incorrect"
}

    if (!updatedUser.dob) {
    errors.dob = "Required";
} else {
    const dobDate = new Date(updatedUser.dob);
    if (isNaN(dobDate.getTime()) || dobDate <new Date('1900-01-01') || dobDate > new Date('2001-12-31')){
        errors.dob = "Invalid response";
    }
}

if(!validGenders.includes(updatedUser.gender)){
    errors.gender = "Required"
}

if(!validStates.includes(updatedUser.state)){
    errors.state = "Required"
}
    
return errors;
}


function EditUserForm({ user, onSubmit, onClose}: EditFormProps) {
   const [updatedUser, setUpdatedUser] = useState<User>({...user});
   const [mutationStatus, setMutationStatus] = useState<string | null>(null);
   const [errors, setErrors] = useState<Partial<User>>({});
   const [isLoading, setIsLoading] = useState<boolean>(false);

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
    
    const validationErrors = validateValues(updatedUser);
    setErrors(validationErrors);

    if(Object.keys(validationErrors).length === 0){
        setIsLoading(true);
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
            setMutationStatus("Failed");
        } finally {
            setIsLoading(false);
        }
        }
        return errors;
};


return (
    <div className= "flex  flex-col fixed justify-center items-center inset-0 bg-black bg-opacity-50">
            <form onSubmit={handleSubmit} className="w-full md:w-2/5 lg:w-1/3 border-4 border-red rounded-lg p-2 bg-white text-xxl flex flex-col">
                <h1 className="font-bold text-3xl p-2">Edit User</h1>
                <div className="grid grid-cols-1 gap-2">
                    <div className="flex">
                        <label className="m-2">
                            First Name: 
                            <input className="border-2 rounded-lg text-sm p-2 w-60 italic"
                                type="text" 
                                name="firstName" 
                                value={updatedUser.firstName} 
                                onChange={handleChange} 
                            />
                            {errors.firstName && <div className="text-xs italic">{errors.firstName}</div>}
                        </label>

                        <label className="m-2">
                            Last Name: 
                            <input className="border-2 rounded-lg text-sm p-2 w-60  italic"
                                type="text" 
                                name="lastName" 
                                value={updatedUser.lastName} 
                                onChange={handleChange} 
                            />
                            {errors.lastName && <div className="text-xs italic">{errors.lastName}</div>}
                        </label>
                    </div>
                    <div className="grid grid-cols-1">
                    <label className="flex flex-col m-2">
                        Email: 
                        <input className="border-2 rounded-lg text-sm p-2 w-60 italic"
                            type="text" 
                            name="email" 
                            value={updatedUser.email} 
                            onChange={handleChange} 
                        />
                        {errors.email && <div className="text-xs italic">{errors.email}</div>}
                    </label>
                    </div>
                    <div className="w-full h-6 bg-black bg-opacity-25 rounded-lg"></div>
                    <div className="mt-4 grid grid-cols-2">
                        <label className="m-2">
                            Birthday: 
                            <input className="border-2 rounded-lg text-sm p-2 w-40 ml-7 italic"
                                type="date" 
                                name="dob" 
                                value={updatedUser.dob} 
                                onChange={handleChange} 
                            />
                            {errors.dob && <div className="text-xs italic">{errors.dob}</div>}
                        </label>
                        

                        <label className="m-2">
                            Gender
                            <select className="border-2 rounded-lg text-sm p-2 w-40 ml-2 italic"
                                name="gender" 
                                value={updatedUser.gender} 
                                onChange={handleChange}>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>  
                            </select>
                            {errors.gender && <div className="text-xs italic w-48">{errors.gender}</div>}
                        </label>
                    </div>
                    <div className="mt-4">
                        <label className="m-2">
                            State: 
                            <select className="border-2 rounded-lg text-sm p-2 w-60 ml-12 italic"
                                name="state" 
                                value={updatedUser.state} 
                                onChange={handleChange}>
                                    <option value="">Select State</option>
                                    <option value="AL">Alabama</option>
                                    <option value="AK">Alaska</option>
                                    <option value="AZ">Arizona</option>
                                    <option value="AR">Arkansas</option>
                                    <option value="CA">California</option>
                                    <option value="CO">Colorado</option>
                                    <option value="CT">Connecticut</option>
                                    <option value="DE">Delaware</option>
                                    <option value="FL">Florida</option>
                                    <option value="GA">Georgia</option>
                                    <option value="HI">Hawaii</option>
                                    <option value="ID">Idaho</option>
                                    <option value="IL">Illinois</option>
                                    <option value="IN">Indiana</option>
                                    <option value="IA">Iowa</option>
                                    <option value="KS">Kansas</option>
                                    <option value="KY">Kentucky</option>
                                    <option value="LA">Louisiana</option>
                                    <option value="ME">Maine</option>
                                    <option value="MD">Maryland</option>
                                    <option value="MA">Massachusetts</option>
                                    <option value="MI">Michigan</option>
                                    <option value="MN">Minnesota</option>
                                    <option value="MS">Mississippi</option>
                                    <option value="MO">Missouri</option>
                                    <option value="MT">Montana</option>
                                    <option value="NE">Nebraska</option>
                                    <option value="NV">Nevada</option>
                                    <option value="NH">New Hampshire</option>
                                    <option value="NJ">New Jersey</option>
                                    <option value="NM">New Mexico</option>
                                    <option value="NY">New York</option>
                                    <option value="NC">North Carolina</option>
                                    <option value="ND">North Dakota</option>
                                    <option value="OH">Ohio</option>
                                    <option value="OK">Oklahoma</option>
                                    <option value="OR">Oregon</option>
                                    <option value="PA">Pennsylvania</option>
                                    <option value="RI">Rhode Island</option>
                                    <option value="SC">South Carolina</option>
                                    <option value="SD">South Dakota</option>
                                    <option value="TN">Tennessee</option>
                                    <option value="TX">Texas</option>
                                    <option value="UT">Utah</option>
                                    <option value="VT">Vermont</option>
                                    <option value="VA">Virginia</option>
                                    <option value="WA">Washington</option>
                                    <option value="WV">West Virginia</option>
                                    <option value="WI">Wisconsin</option>
                                    <option value="WY">Wyoming</option> 
                            </select>
                            
                        </label>
                        {errors.state && <div className="text-xs italic ml-2">{errors.state}</div>}
                    </div>
                    

            </div>
            <div className="flex flex-col items-center">
                <button className="mt-12 p-2 border-2 rounded-full text-sm w-24 hover:bg-gray-200"type="submit">Submit</button>
                <button className="mt-6 p-2 border-2 rounded-full text-xs w-16 hover:bg-gray-200"type="button" onClick={onClose}>Close</button>
            </div>
             
            </form>
            {isLoading && Object.keys(errors).length === 0 && (<Toast message={"Data loading..."} onClose={() => setIsLoading(false)} />)}

           {mutationStatus && (
                <div className="flex m-12 p-4 bg-white text-3xl border-2 rounded-full">
                    Mutation Status: {mutationStatus === "Success" ? "Mutation successful" : "Mutation failed - this API only allows reads!"}
                </div>
            )}
    </div>
    );
}


export default EditUserForm;
