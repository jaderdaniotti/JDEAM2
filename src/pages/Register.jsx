import React, { useState } from "react";
import { ConfirmSchema, getErrors, getFieldError } from "../lib/validationForm.js";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});
  const [formState, setFormState] = useState({
    email: "",
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    confirmPassword: ""
  });

  const onSubmit = async (event) => {
    event.preventDefault();
    setFormSubmitted(true);
    const { error, data } = ConfirmSchema.safeParse(formState);
    if (error) {
      const errors = getErrors(error);
      setFormErrors(errors);
      //console.log(errors);
    } else {
      const result = await signUp(data);
      if (result.error) {
        //console.log("Signing up error 👎🏻!");
      } else {
        //console.log("Signed up 👍🏻!");
        await new Promise((resolve) => setTimeout(resolve, 1000));
        navigate("/");
      }
    }
  };

  const onBlur = (property) => () => {
    const schemaFields = ['email', 'firstName', 'lastName', 'username', 'password'];
    
    if (schemaFields.includes(property)) {
      const message = getFieldError(property, formState[property]);
      setFormErrors(prev => ({
        ...prev,
        [property]: message
      }));
    } else if (property === 'confirmPassword') {
      const message = formState.password !== formState.confirmPassword 
        ? "Le password non coincidono" 
        : "";
      setFormErrors(prev => ({
        ...prev,
        [property]: message
      }));
    }
    
    setTouchedFields(prev => ({
      ...prev,
      [property]: true
    }));
  };

  const isInvalid = (property) => {
    if (formSubmitted || touchedFields[property]) {
      return !!formErrors[property];
    }
    return undefined;
  };

  const setField = (property, valueSelector) => (event) => {
    setFormState(prev => ({
      ...prev,
      [property]: valueSelector ? valueSelector(event) : event.target.value
    }));
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-chiaro text-scuro">
      <div className="bg-chiaro p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center">Registrati</h2>
        <form className="flex flex-col gap-4" onSubmit={onSubmit}>
          {/* Email */}
          <div>
            <input 
              type="email" 
              placeholder="Email" 
              value={formState.email}
              onChange={setField("email")}
              onBlur={onBlur("email")}
              className={`px-4 py-3 rounded-lg border w-full focus:outline-none ${
                isInvalid("email") ? 'border-red-500' : 'border-scuro-2'
              }`} 
            />
            {formErrors.email && <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>}
          </div>
          
          {/* Nome e Cognome */}
          <div className="flex gap-2">
            <div className="w-1/2">
              <input 
                type="text" 
                placeholder="Nome" 
                value={formState.firstName}
                onChange={setField("firstName")}
                onBlur={onBlur("firstName")}
                className={`px-4 py-3 rounded-lg border w-full focus:outline-none ${
                  isInvalid("firstName") ? 'border-red-500' : 'border-scuro-2'
                }`} 
              />
              {formErrors.firstName && <p className="text-red-500 text-sm mt-1">{formErrors.firstName}</p>}
            </div>
            <div className="w-1/2">
              <input 
                type="text" 
                placeholder="Cognome" 
                value={formState.lastName}
                onChange={setField("lastName")}
                onBlur={onBlur("lastName")}
                className={`px-4 py-3 rounded-lg border w-full focus:outline-none ${
                  isInvalid("lastName") ? 'border-red-500' : 'border-scuro-2'
                }`} 
              />
              {formErrors.lastName && <p className="text-red-500 text-sm mt-1">{formErrors.lastName}</p>}
            </div>
          </div>
          
          {/* Username */}
          <div>
            <input 
              type="text" 
              placeholder="Username" 
              value={formState.username}
              onChange={setField("username")}
              onBlur={onBlur("username")}
              className={`px-4 py-3 rounded-lg border w-full focus:outline-none ${
                isInvalid("username") ? 'border-red-500' : 'border-scuro-2'
              }`} 
            />
            {formErrors.username && <p className="text-red-500 text-sm mt-1">{formErrors.username}</p>}
          </div>
          
          {/* Password */}
          <div>
            <input 
              type="password" 
              placeholder="Password" 
              value={formState.password}
              onChange={setField("password")}
              onBlur={onBlur("password")}
              className={`px-4 py-3 rounded-lg border w-full focus:outline-none ${
                isInvalid("password") ? 'border-red-500' : 'border-scuro-2'
              }`} 
            />
            {formErrors.password && <p className="text-red-500 text-sm mt-1">{formErrors.password}</p>}
          </div>
          
          {/* Conferma Password */}
          <div>
            <input 
              type="password" 
              placeholder="Conferma Password" 
              value={formState.confirmPassword}
              onChange={setField("confirmPassword")}
              onBlur={onBlur("confirmPassword")}
              className={`px-4 py-3 rounded-lg border w-full focus:outline-none ${
                isInvalid("confirmPassword") ? 'border-red-500' : 'border-scuro-2'
              }`} 
            />
            {formErrors.confirmPassword && <p className="text-red-500 text-sm mt-1">{formErrors.confirmPassword}</p>}
          </div>
          
          <button type="submit" className="bg-chiaro border-scuro border-2 text-scuro w-max mx-auto px-10 py-2 rounded-md mt-2">
            <p>Registrati</p>
          </button>
        </form>
        <p className="mt-4 text-center text-sm">Hai già un account? <a href="/login" className="text-scuro font-semibold ">Accedi</a></p>
      </div>
    </section>
  );
}
