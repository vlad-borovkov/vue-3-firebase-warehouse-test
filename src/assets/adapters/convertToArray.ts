import { IProduct } from '@/types/IProduct';

export const getArray = (obj: any): IProduct[] => Object.values(obj);
