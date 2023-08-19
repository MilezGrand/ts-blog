import { useAppSelector } from './hooks';

export const useAuth = () => {
  const { user } = useAppSelector((state) => state.authReducer);

  return {
    isAuth: !!user,
    user,
  };
};
