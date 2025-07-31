import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [formState, setFormState] = useState({
    email: "",
    password: ""
  });
  const [formErrors, setFormErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setFormErrors({});

    // Basic validation
    const errors = {};
    if (!formState.email) errors.email = "Email è richiesta";
    if (!formState.password) errors.password = "Password è richiesta";

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setIsLoading(false);
      return;
    }

    try {
      const result = await signIn(formState.email, formState.password);

      if (result.error) {
        console.error("Login error:", result.error);
        setFormErrors({ general: result.error.message });
      } else {
        //console.log("Login successful:", result.data);
        //console.log("Login completato con successo! 👍🏻");
        navigate("/");
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      //console.log("Errore inaspettato durante il login");
      setFormErrors({ general: "Errore inaspettato durante il login" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-chiaro text-scuro">
      <div className="bg-chiaro p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center">Accedi</h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <input 
              type="email" 
              name="email"
              placeholder="Email" 
              value={formState.email}
              onChange={handleChange}
              className={`px-4 py-3 rounded-lg border w-full focus:outline-none focus:border-chiaro ${
                formErrors.email ? 'border-red-500' : 'border-scuro-2'
              }`} 
            />
            {formErrors.email && <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>}
          </div>
          
          <div>
            <input 
              type="password" 
              name="password"
              placeholder="Password" 
              value={formState.password}
              onChange={handleChange}
              className={`px-4 py-3 rounded-lg border w-full focus:outline-none focus:border-chiaro ${
                formErrors.password ? 'border-red-500' : 'border-scuro-2'
              }`} 
            />
            {formErrors.password && <p className="text-red-500 text-sm mt-1">{formErrors.password}</p>}
          </div>

          {formErrors.general && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {formErrors.general}
            </div>
          )}
          
          <button 
            type="submit" 
            disabled={isLoading}
            className="bg-chiaro border-scuro border-2 text-scuro w-max mx-auto px-10 py-2 rounded-md mt-2 disabled:opacity-50"
          >
            <p>{isLoading ? "Caricamento..." : "Login"}</p>
          </button>
        </form>
        <p className="mt-4 text-center text-sm">Non hai un account? <a href="/register" className="text-scuro font-semibold">Registrati</a></p>
      </div>
    </section>
  );
} 