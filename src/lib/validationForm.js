import z from "zod";

const passwordRegex = /(?=.*[A-Z])(?=.*[a-z])(?=.*\d).*$/;
const passwordError = "La password deve contenere almeno una lettera maiuscola, una minuscola e un numero.";

export const FormSchema = z.object({
  email: z.string().email("Inserisci una email valida."),
  firstName: z.string().min(1, "Il nome è obbligatorio."),
  lastName: z.string().min(1, "Il cognome è obbligatorio."),
  username: z.string().min(3, "Lo username deve avere almeno 3 caratteri."),
  password: z.string().min(8, "La password deve avere almeno 8 caratteri.")
    .regex(passwordRegex, passwordError),
});

export const ConfirmSchema = FormSchema;

export function getFieldError(property, value) {
  try {
    if (!FormSchema.shape[property]) return "";
    if (value === undefined || value === null) return "";
    FormSchema.shape[property].parse(value);
    return "";
  } catch (error) {
    if (error instanceof z.ZodError && error.errors.length > 0) {
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
