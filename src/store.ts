import { atomWithStorage, useAtomValue } from 'jotai/utils';
import { CartItem } from './types';



export const tokenAtom = atomWithStorage('token', '');
export const userAtom = atomWithStorage('userId', '');
export const cartAtom = atomWithStorage<CartItem[]>('cart', []);

export const workTime = 'ملاحظة: أوقات الدوام من السابعة صباحاً وحتى الثالثة مساءً';