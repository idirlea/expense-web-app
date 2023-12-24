import { useEffect, useState } from "react";
import axios from 'axios';

import { get } from "../service";
import { redirect } from 'react-router-dom';

const BASE_URL = import.meta.env.VITE_API_URL; 

const useAuth = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState({});


  const login = (values) => {
    axios.post(BASE_URL + 'auth/local/', {
      identifier:  values.email,
      password: values.password,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': '*/*'
      },
    })
      .then(response => {
        if (response.data.jwt) {
          setIsAuth(true);

          localStorage.setItem('isAuthenticated', 'true');
          localStorage.setItem('jwt', response.data.jwt);

          get('users/me?populate=*').then(data => {
            setUser(data);
            localStorage.setItem('user', JSON.stringify(data));

            redirect('/');
          }
          ).catch(error => {
            console.error(error);
          });
        }
      })
      .catch(error => {
        // Handle the error
        console.error(error);
      });
  };

  const logout = () => {
    setIsAuth(false);
    setUser({});

    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('jwt');
    localStorage.removeItem('user');
  }

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    const user = localStorage.getItem("user");
    
    if (token) {
      setIsAuth(true);
      redirect('/')
    }

    if (user) {
      setUser(JSON.parse(user));
    }

    
  }, []);

  return { isAuth, user, login, logout};
}

export default useAuth;