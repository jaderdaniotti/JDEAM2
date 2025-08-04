import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

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
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-50 to-neutral-100">
      <div className="bg-white p-8 rounded-2xl shadow-soft w-full max-w-md border border-neutral-200">
        <h2 className="text-3xl font-display font-bold mb-6 text-center text-neutral-900">Accedi</h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <input 
              type="email" 
              name="email"
              placeholder="Email" 
              value={formState.email}
              onChange={handleChange}
              className={`px-4 py-3 rounded-xl border w-full focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all duration-200 ${
                formErrors.email ? 'border-error-500' : 'border-neutral-300'
              }`} 
            />
            {formErrors.email && <p className="text-error-500 text-sm mt-1">{formErrors.email}</p>}
          </div>
          
          <div>
            <input 
              type="password" 
              name="password"
              placeholder="Password" 
              value={formState.password}
              onChange={handleChange}
              className={`px-4 py-3 rounded-xl border w-full focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all duration-200 ${
                formErrors.password ? 'border-error-500' : 'border-neutral-300'
              }`} 
            />
            {formErrors.password && <p className="text-error-500 text-sm mt-1">{formErrors.password}</p>}
          </div>

          {formErrors.general && (
            <div className="bg-error-50 border border-error-400 text-error-700 px-4 py-3 rounded-xl">
              {formErrors.general}
            </div>
          )}
          
          <button 
            type="submit" 
            disabled={isLoading}
            className="bg-primary-600 border-2 font-semibold w-max mx-auto px-10 py-3 rounded-xl hover:bg-primary-700 transition-all duration-300 hover:shadow-lg disabled:opacity-50"
          >
            {isLoading ? "Caricamento..." : "Login"}
          </button>
        </form>
        <p className="mt-4 text-center  text-sm text-neutral-600">Non hai un account? 
          <Link to="/register" className="text-primary-600 ml-1 font-semibold hover:text-primary-700">Registrati</Link>
          </p>
      </div>
    </section>
  );
} 