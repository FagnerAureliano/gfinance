import { api } from "../auth-header/api.service";

export interface LoginProps {
  username: string;
  password: string;
}

 class AuthService {
  async login({ username, password }: LoginProps) {

    const user = `username=${username}&password=${password}` 
    const response = await api.post("login", user)
    return {
        token:{ token: response.data.access_token,  user: username}, user : {username, password}
    }
    
  }
}
export default new AuthService