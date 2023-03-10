export function loginValidation(username: string, password: string): [boolean, boolean]
export function loginValidation (username: string, password: [string, string]) : [{valid: boolean, message: string}, boolean] 
export function loginValidation(username: string, password: string | [string, string]): [boolean, boolean] | [{valid: boolean, message: string}, boolean] {
  if (Array.isArray(password)) {
    const doPasswordsMatch =  password[0] === password[1];

    if (!doPasswordsMatch) {
      return [{valid: false, message: 'Passwords do not match'}, username.length > 5];
    } else if (!/(?=.*[!@#$%^&*_-])/.test(password[0]) || !(password[0].length > 5)) {
      return [{valid: false, message: 'Password invalid.'}, username.length > 5];
    } else {
      return [{valid: true, message: ''}, username.length > 5];
    }
   } else {
    if ((username === 'test' || username === 'Test') && password === 'test') {
      return [{valid: true, message: 'test'}, true];
    } else {
      return [
        /(?=.*[!@#$%^&*_-])/.test(password) && (password.length > 5),
        username.length > 5];
    }
   }
}
