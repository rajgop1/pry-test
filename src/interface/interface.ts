export interface SingleInput {
    value: number
    label: string
    id: string
}

export interface Inputs {
    inputData: SingleInput[]
    setInputDetails: ([]: SingleInput[], isInitial?:boolean) => void
    removeDetails: (id: string) => void

}
export interface Inputs2 extends Inputs {

    removeLastDetails: () => void
}


export interface AutocompleteItem {
    name: string;
    category: string;
    value: number;
    id: string;
}