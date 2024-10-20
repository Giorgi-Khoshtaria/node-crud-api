import { validate as isUuid } from "uuid";

export const validateUserId = (id: string): boolean => {
  return isUuid(id);
};

export const validateUserPayload = (
  data: any
): { isValid: boolean; message?: string } => {
  const { username, age, hobbies } = data;

  if (!username || typeof username !== "string") {
    return {
      isValid: false,
      message: 'Invalid or missing "username". It must be a string.',
    };
  }

  if (typeof age !== "number") {
    return {
      isValid: false,
      message: 'Invalid or missing "age". It must be a number.',
    };
  }

  if (
    !Array.isArray(hobbies) ||
    !hobbies.every((hobby) => typeof hobby === "string")
  ) {
    return {
      isValid: false,
      message: 'Invalid or missing "hobbies". It must be an array of strings.',
    };
  }

  return { isValid: true };
};
