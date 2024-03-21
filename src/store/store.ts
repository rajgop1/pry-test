import { Inputs, Inputs2, SingleInput } from '@/interface/interface'
import { create } from 'zustand'


const SAMPLE_INPUTS: SingleInput[] = [{
    label: "Sample Local Variable",
    value: 200,
    id: Date.now().toString()
}]

export const useInputsStore = create<Inputs>((set) => ({
    inputData: [...SAMPLE_INPUTS],
    setInputDetails: (dataToSet, isInitial:boolean=false) => {
        set((state) => ({ inputData: isInitial? [...dataToSet] : [...state.inputData, ...dataToSet] }))
    },
    removeDetails: (id) => {
        set((state) => ({ inputData: [...state.inputData.filter((val)=>val.id!==id)] }))
    }
}))

export const useCalculatedStore = create<Inputs2>((set) => ({
    inputData: [],
    setInputDetails: (dataToSet, isInitial) => {
        set((state) => ({ inputData: isInitial? [...dataToSet] : [...state.inputData, ...dataToSet] }))
    },
    removeDetails: (id) => {
        set((state) => ({ inputData: [...state.inputData.filter((val)=>val.id!==id)] }))
    },
    removeLastDetails: () => {
        set((state) => ({ inputData: [...state.inputData.slice(0, state.inputData.length - 1)] }))
    }
}))

//   setCurrentTab: (val: string) => set((state) => ({ currentTab: val })),




