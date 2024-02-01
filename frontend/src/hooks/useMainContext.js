import { MainContext } from '@/contexts/MainContext';
import { useContext } from 'react';

export const useMainContext = () => useContext(MainContext);
