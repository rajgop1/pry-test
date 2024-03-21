"use client"
import { AutocompleteItem, SingleInput } from '@/interface/interface'
import { useCalculatedStore, useInputsStore } from '@/store/store'
import { ChangeEvent, Fragment, KeyboardEvent, SyntheticEvent, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import HorizontalSeparator from './horizontal-separator'
import { QueryClient, QueryClientProvider, isError, useQuery } from 'react-query';
import InputsComponent from './input-component'
import FormulaComponent from './formula-component'

export const DEFAULT_VALUE = {
    label: "",
    value: 0,
    id: ""
}

const queryClient = new QueryClient()

const InputsWrapped = () => {
    return (<QueryClientProvider client={queryClient}>
        <InputsComponent />
    </QueryClientProvider>)
}


function PryCalculator() {
    const [mounted, setMounted] = useState(false);
   

    const { inputData: calculatedData, setInputDetails: setCalculatedDetails, removeLastDetails } = useCalculatedStore()
    useEffect(() => {
        setMounted(true)
    }, [])

    return (
        mounted && <div className='flex flex-row h-[100vh] py-[20px] px-[24px] gap-[20px]'>
            <InputsWrapped />
            <div className='h-full w-[1px] bg-gray-300'></div>
            <div className='right flex-1'>
                <h2 className='text-xl py-[10px]'>Formula</h2>
                <FormulaComponent/>
            </div>
        </div>
    )
}



export default PryCalculator