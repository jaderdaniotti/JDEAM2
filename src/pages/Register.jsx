import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

// 🔹 Funzione per validare la password
const validatePassword = (password) => {
  const errors = [];
  if (password.length < 8) errors.push("La password deve avere almeno 8 caratteri");
  if (!/[A-Z]/.test(password)) errors.push("La password deve contenere almeno una lettera maiuscola");
  if (!/[a-z]/.test(password)) errors.push("La password deve contenere almeno una lettera minuscola");
  if (!/[0-9]/.test(password)) errors.push("La password deve contenere almeno un numero");
  if (!/[!@#$%^&*]/.test(password)) errors.push("La password deve contenere almeno un carattere speciale (!@#$%^&*)");
  return errors;
};

// 🔹 Funzione per validare l'email
const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email) ? [] : ["Formato email non valido"];
};

export default function Register() {
  const navigate = useNavigate();
  const { signUp } = useAuth();

  const [formState, setFormState] = useState({
    email: "",
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    confirmPassword: ""
  });

  const [formErrors, setFormErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [generalError, setGeneralError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // 🔹 Validazione in tempo reale
  const validateField = (property, value) => {
    let errors = [];

    switch (property) {
      case "email":
        errors = validateEmail(value);
        break;
      case "password":
        errors = validatePassword(value);
        break;
      case "confirmPassword":
        if (value !== formState.password) errors = ["Le password non coincidono"];
        break;
      case "firstName":
        if (!value.trim()) errors = ["Il nome è obbligatorio"];
        break;
      case "lastName":
        if (!value.trim()) errors = ["Il cognome è obbligatorio"];
        break;
      case "username":
        if (!value.trim()) errors = ["L'username è obbligatorio"];
        break;
      default:
        break;
    }

    setFormErrors(prev => ({
      ...prev,
      [property]: errors
    }));
  };

  // 🔹 Gestione input
  const setField = (property) => (event) => {
    const value = event.target.value;
    setFormState(prev => ({
      ...prev,
      [property]: value
    }));

    validateField(property, value);

    if (property === "password" || property === "confirmPassword") {
      validateField("confirmPassword", property === "password" ? formState.confirmPassword : value);
    }
  };

  // 🔹 Invio del form
  const onSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setGeneralError("");
    setSuccessMessage("");

    // Validazione manuale di tutti i campi
    const errors = {};
    errors.email = validateEmail(formState.email);
    errors.password = validatePassword(formState.password);
    errors.confirmPassword = formState.password !== formState.confirmPassword ? ["Le password non coincidono"] : [];
    errors.firstName = !formState.firstName.trim() ? ["Il nome è obbligatorio"] : [];
    errors.lastName = !formState.lastName.trim() ? ["Il cognome è obbligatorio"] : [];
    errors.username = !formState.username.trim() ? ["L'username è obbligatorio"] : [];

    // Se ci sono errori, fermiamo il submit
    if (Object.values(errors).some(errArray => errArray.length > 0)) {
      setFormErrors(errors);
      setIsLoading(false);
      return;
    }

    try {
      const result = await signUp(formState);
      if (result.error) {
        setGeneralError(result.error.message || "Errore durante la registrazione. Riprova.");
      } else {
        setSuccessMessage("Registrazione completata con successo! Verifica la tua email per confermare l'account.");
        setTimeout(() => navigate("/"), 2000);
      }
    } catch {
      setGeneralError("Errore inaspettato durante la registrazione. Riprova.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-50 to-neutral-100">
      <div className="bg-white p-8 rounded-2xl shadow-soft w-full max-w-md border border-neutral-200">
        <h2 className="text-3xl font-display font-bold mb-6 text-center text-neutral-900">Registrati</h2>

        {/* ✅ Messaggi di successo e di errore generale */}
        {successMessage && (
          <div className="bg-green-50 border border-green-400 text-green-700 px-4 py-3 rounded-xl mb-4">
            {successMessage}
          </div>
        )}
        {generalError && (
          <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded-xl mb-4">
            {generalError}
          </div>
        )}

        <form className="flex flex-col gap-4" onSubmit={onSubmit}>
          {/* Email */}
          <div>
            <input
              type="email"
              placeholder="Email"
              value={formState.email}
              onChange={setField("email")}
              className={`px-4 py-3 rounded-xl border w-full focus:outline-none ${
                formErrors.email?.length ? "border-red-500" : "border-neutral-300"
              }`}
            />
            {formErrors.email?.map((err, i) => <p key={i} className="text-red-600 text-sm mt-1">{err}</p>)}
          </div>

          {/* Nome e Cognome */}
          <div className="flex gap-2">
            <div className="w-1/2">
              <input
                type="text"
                placeholder="Nome"
                value={formState.firstName}
                onChange={setField("firstName")}
                className={`px-4 py-3 rounded-xl border w-full focus:outline-none ${
                  formErrors.firstName?.length ? "border-red-500" : "border-neutral-300"
                }`}
              />
              {formErrors.firstName?.map((err, i) => <p key={i} className="text-red-600 text-sm mt-1">{err}</p>)}
            </div>
            <div className="w-1/2">
              <input
                type="text"
                placeholder="Cognome"
                value={formState.lastName}
                onChange={setField("lastName")}
                className={`px-4 py-3 rounded-xl border w-full focus:outline-none ${
                  formErrors.lastName?.length ? "border-red-500" : "border-neutral-300"
                }`}
              />
              {formErrors.lastName?.map((err, i) => <p key={i} className="text-red-600 text-sm mt-1">{err}</p>)}
            </div>
          </div>

          {/* Username */}
          <div>
            <input
              type="text"
              placeholder="Username"
              value={formState.username}
              onChange={setField("username")}
              className={`px-4 py-3 rounded-xl border w-full focus:outline-none ${
                formErrors.username?.length ? "border-red-500" : "border-neutral-300"
              }`}
            />
            {formErrors.username?.map((err, i) => <p key={i} className="text-red-600 text-sm mt-1">{err}</p>)}
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              placeholder="Password"
              value={formState.password}
              onChange={setField("password")}
              className={`px-4 py-3 rounded-xl border w-full focus:outline-none ${
                formErrors.password?.length ? "border-red-500" : "border-neutral-300"
              }`}
            />
            {formErrors.password?.map((err, i) => <p key={i} className="text-red-600 text-sm mt-1">{err}</p>)}
          </div>

          {/* Conferma Password */}
          <div>
            <input
              type="password"
              placeholder="Conferma Password"
              value={formState.confirmPassword}
              onChange={setField("confirmPassword")}
              className={`px-4 py-3 rounded-xl border w-full focus:outline-none ${
                formErrors.confirmPassword?.length ? "border-red-500" : "border-neutral-300"
              }`}
            />
            {formErrors.confirmPassword?.map((err, i) => (
              <p key={i} className="text-red-600 text-sm mt-1">{err}</p>
            ))}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="bg-primary-600 border-2 font-semibold w-max mx-auto px-10 py-3 rounded-xl hover:bg-primary-700 transition-all duration-300 disabled:opacity-50 flex items-center gap-2"
          >
            {isLoading ? "Registrazione in corso..." : "Registrati"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-neutral-600">
          Hai già un account? <Link to="/login" className="text-primary-600 font-semibold hover:text-primary-700">Accedi</Link>
        </p>
      </div>
    </section>
  );
}