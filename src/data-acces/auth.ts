import { FormResponse } from '@/types/form';

export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<FormResponse> => {
  try {
    return {
      status: 'success',
      message: 'Succesvol ingelogd',
    };
  } catch (error) {
    return {
      status: 'error',
      message: 'Fout bij inloggen',
    };
    throw new Error('Failed to log in');
  }
};

export const logout = async () => {
  try {
    const response = await fetch('/api/auth/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error logging out:', error);
    throw new Error('Failed to log out');
  }
};

export const signUp = async (data: any) => {
  try {
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error signing up:', error);
    throw new Error('Failed to sign up');
  }
};
