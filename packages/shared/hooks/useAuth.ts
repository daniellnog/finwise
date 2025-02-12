export function useAuth() {
    const [user, setUser] = useState(null);
    
    function login() { /* lógica de login */ }
    function logout() { /* lógica de logout */ }
  
    return { user, login, logout };
  }

function useState(arg0: null): [any, any] {
    throw new Error("Function not implemented.");
}
  