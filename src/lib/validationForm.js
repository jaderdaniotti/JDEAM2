import z from "zod";

const passwordRegex = /(?=.*[A-Z])(?=.*[a-z])(?=.*\d).*$/;
const passwordError = "La password deve contenere almeno una lettera maiuscola, una minuscola e un numero.";

export const FormSchema = z.object({
  email: z.string().min(1, "L'email è obbligatoria.").email("Inserisci una email valida."),
  firstName: z.string()
    .min(1, "Il nome è obbligatorio.")
    .min(2, "Il nome deve avere almeno 2 caratteri.")
    .max(50, "Il nome non può superare i 50 caratteri.")
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, "Il nome può contenere solo lettere e spazi."),
  lastName: z.string()
    .min(1, "Il cognome è obbligatorio.")
    .min(2, "Il cognome deve avere almeno 2 caratteri.")
    .max(50, "Il cognome non può superare i 50 caratteri.")
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, "Il cognome può contenere solo lettere e spazi."),
  username: z.string()
    .min(3, "Lo username deve avere almeno 3 caratteri.")
    .max(30, "Lo username non può superare i 30 caratteri.")
    .regex(/^[a-zA-Z0-9_]+$/, "Lo username può contenere solo lettere, numeri e underscore."),
  password: z.string()
    .min(8, "La password deve avere almeno 8 caratteri.")
    .regex(passwordRegex, passwordError),
});

export const ConfirmSchema = FormSchema;

export function getFieldError(property, value) {
  try {
    if (!FormSchema.shape[property]) return "";
    if (value === undefined || value === null || value === "") return "";
    FormSchema.shape[property].parse(value);
    return "";
  } catch (error) {
    if (error instanceof z.ZodError && error.errors && error.errors.length > 0) {
      return error.errors[0].message;
    }
    return "";
  }
}

export const getErrors = (error) => {
  if (error instanceof z.ZodError && error.errors) {
    const errors = {};
    error.errors.forEach((err) => {
      const field = err.path?.[0] || "form";
      errors[field] = err.message || "Input non valido.";
    });
    return errors;
  }
  return {};
};
