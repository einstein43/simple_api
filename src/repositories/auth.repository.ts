import { User } from "../users/users";
import { users } from "../users/users";







export default class AuthRepository {
    constructor() {
      
    }

    public async auth(username: string, password: string) {
        if (users.find((user) => user.email === username && user.password === password)){
            return {
                status: 200,
                message: "Login successful",
                
            };
        } else {
            return {
                status: 401,
                message: "Invalid credentials",
            };
        }
    }
}