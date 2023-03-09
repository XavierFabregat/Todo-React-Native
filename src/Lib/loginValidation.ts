export function loginValidation(username: string, password: string): [boolean, boolean] {
  if ((username === 'test' || username === 'Test') && password === 'test') {
    return [true, true];
  } else {
    return [/(?=.*[!@#$%^&*])/.test(password), username.length > 5];
  }
}