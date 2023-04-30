import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext({
  auth: null,
  setAuth: () => { },
  user: null,
  setUser: () => { },
});

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    console.log(auth,user);
    // const isAuth = async () => {
    //   try {
    //     const res=await axios.get(
    //       '/api/getUserRoles',
    //       { withCredentials: true }
    //     );
    //     console.log(res,"AUTH",auth,res.data.userData);
    //     setUser(res.data.userData);
    //   } catch(error) {
    //     setUser(null);
    //   };
    // };

    // isAuth();
  }, [auth,user]);

  return (
    <AuthContext.Provider value={{ auth, setAuth, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };