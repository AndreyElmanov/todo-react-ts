import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { UserDataType } from '../helpers/types';

type UserStoreType = {
    firstName: string;
    secondName: string;
    description: string;
    addUserData: (data: UserDataType) => void;
    deleteUserData: () => void;
}

export const useUserStore = create<UserStoreType, [["zustand/persist", unknown]]>(
    persist(
        (set) => ({
            firstName: '',
            secondName: '',
            description: '',
            addUserData: (data) => set({
                firstName: data.firstName,
                secondName: data.secondName,
                description: data.description,
            }),
            deleteUserData: () => set({
                firstName: '',
                secondName: '',
                description: '',
            }),
        }),
        {  
            name: 'userInfo',
            storage: createJSONStorage(() => localStorage)
        }
    ));