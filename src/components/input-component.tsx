import { ChangeEvent, Fragment, useState } from "react"
import HorizontalSeparator from "./horizontal-separator"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { DEFAULT_VALUE } from "./pry-calculator"
import { useInputsStore } from "@/store/store"
import { AutocompleteItem, SingleInput } from "@/interface/interface"
import { useQuery } from "react-query"
import { CircleXIcon } from "lucide-react"

const fetchData = () =>
    fetch('https://652f91320b8d8ddac0b2b62b.mockapi.io/autocomplete').then(response =>
        response.json()
    )


const InputsComponent = () => {
    const { inputData, setInputDetails, removeDetails } = useInputsStore()
    const [formData, setFormData] = useState<SingleInput>(DEFAULT_VALUE)
    const { isLoading, isError, data, error } = useQuery('autocomplete', fetchData, {
        onSuccess: (fetchedData) => {
            const sanitizedData = fetchedData.slice(0,30).map((val: AutocompleteItem, index: number) => {
                return { value: val.value, label: val.category, id: val.id }
            })
            setInputDetails(sanitizedData, true)
        },
    })
    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error: </div>;


    function addInput() {
        setInputDetails([{ value: formData.value, label: formData.label, id: Date.now().toString() }])
        clearForm()
    }

    function handleFormData(e: ChangeEvent<HTMLInputElement>) {
        const { value, name } = e.currentTarget
        setFormData((prevState) => {
            return { ...prevState, [name]: value }
        })
    }

    function clearForm() {
        setFormData(DEFAULT_VALUE)
    }

    return <>
        <div className='left h-full overflow-auto w-1/3 flex flex-col gap-[16px]'>
            <div>
                <h2 className='text-xl'>Inputs
                    {inputData.length > 0 && ` (${inputData.length})`}</h2>
            </div>
            <HorizontalSeparator />
            <div className='flex flex-col gap-[10px]'>
                <Input type="text" placeholder='label' name='label' value={formData.label} onChange={(e) => handleFormData(e)} />
                <Input type="number" placeholder='value' name='value' value={formData.value} onChange={(e) => handleFormData(e)} />
                <Button type='button' disabled={!(formData.value && formData.label)} onClick={() => addInput()}>Add</Button>
            </div>
            <HorizontalSeparator />
            <div>
                {inputData.length > 0 ?
                    <div className='grid grid-cols-2 gap-y-[10px]'>
                        <div className='font-semibold'>Label</div>
                        <div className='font-semibold'>Value</div>
                        {inputData.map((input, index) => {
                            return <Fragment key={`${input.id}`}>
                                <div>{index + 1}. {input.label}</div>
                                <div className="flex flex-row max-w-[100px] justify-between "><span>{input.value}</span> <CircleXIcon onClick={()=>removeDetails(input.id)} className="cursor-pointer"/></div>
                            </Fragment>

                        })}
                    </div> :
                    <>
                        <h2>Please add some variables...</h2>
                    </>}
            </div>
        </div>
    </>
}
export default InputsComponent