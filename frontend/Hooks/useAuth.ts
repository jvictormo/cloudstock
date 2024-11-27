import { useState, useEffect } from 'react';
import axios from 'axios';

interface UserData {
  sequenceIdUser: number;
  email: string;
  name: string;
  companyName: string;
}

const useAuth = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
      
      if (!token) {
        setError('Token não encontrado');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get('http://localhost:3000/user/token/get', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserData(response.data);
      } catch (err) {
        console.error('Erro ao carregar os dados do usuário:', err);
        setError('Erro ao carregar os dados do usuário');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return { userData, loading, error };
};

export default useAuth;