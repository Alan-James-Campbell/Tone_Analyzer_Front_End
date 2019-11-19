export const passwordValidation = value => !value || !/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/.test(value) ? 'Password must be at least 8 characters and contain uppercase letters, lowercase letters, special characters, numbers' : undefined												  
export const emailValidation = value => !value || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? 'Invalid email address' : undefined
export const minLength5 = value => value&&value.length >= 5 ? undefined : 'Title must be at least 5 characters'
export const minLength20 = value => value&&value.length >= 20 ? undefined : 'Content must be at least 20 characters'
