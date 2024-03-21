import { SingleInput } from "@/interface/interface";
import { useInputsStore } from "@/store/store";
import { ChangeEvent, useEffect, useRef, useState } from "react";

const FormulaComponent = () => {
    
    const { inputData } = useInputsStore()
    const [result, setResult] = useState<string>("")
    const [offset, setOffset] = useState<any>()
    const ref = useRef<HTMLDivElement>(null);
    const [HTML, setHTML] = useState<any>()
    const [searchQuery, setSearchQuery] = useState<string>("")
    const [errorInFormula, setErrorInFormula] = useState<boolean>(false)

    function handleDropdownClick(input: SingleInput) {
        setHTML((prev: any) => {
            const regex = new RegExp(`(?![^<]*>|[^<>]*<\/)(?:${searchQuery.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")})`, 'gi');
            let prevWithoutQuery = prev.replace(regex, '');
            return prevWithoutQuery += `<span class="formula-span" data-value="${input.value}" contenteditable="false" style="-moz-user-select: none; -webkit-user-select: none; -ms-user-select:none; user-select:none;-o-user-select:none;" unselectable="on" onselectstart="return false;" onmousedown="return false;">${input.label}</span>`
        })
    }

    function extractValuesAndOperators(htmlString: string): string {
        let result = '';

        const regex = /<span class="formula-span" data-value="(\d+)"[^>]*>([^<]+)<\/span>/g;

        let match;
        let lastIndex = 0;
        while ((match = regex.exec(htmlString)) !== null) {
            const operator = htmlString.substring(lastIndex, match.index).trim();
            if (operator) {
                result += operator;
            }
            result += match[1];
            lastIndex = regex.lastIndex;
        }
        const trailingOperator = htmlString.substring(lastIndex).trim();
        if (trailingOperator) {
            result += trailingOperator;
        }

        return result;
    }




    useEffect(() => {
        if (ref.current) {
            const stripText = HTML?.slice(HTML.length - offset)
            if (stripText) {
                const regex = /[a-zA-Z0-9\s]+/g;
                const extractedTextArray = stripText?.match(regex);
                const extractedText = extractedTextArray?.join('');
                setSearchQuery(extractedText || "")
                console.log(extractedText)
            }
        }
        if (HTML) {
            let res = extractValuesAndOperators(HTML)
            let errorResult = false
            try {
                const final = eval(res)
                console.log(final)
                setResult(final)
                errorResult = false
            } catch (e) {
                console.log(e)
                errorResult = true
            }
            finally {
                setErrorInFormula(errorResult)
            }
        }

    }, [HTML])

    function handleChange(e: ChangeEvent<HTMLDivElement>) {
        const range = document.getSelection()?.getRangeAt(0)
        setOffset(range?.startOffset)
        setHTML(e.currentTarget.innerHTML || "")
    }

    return <>
        <div className=' rounded-[4px] flex flex-col border border-gray-300'>
            <div className='px-[20px] py-[5px]  bg-gray-300'>
                <h3 className='text-sm font-semibold'>New Formula</h3>
            </div>
            <div className='px-[24px] bg-gray-100 py-[10px]'>
                Result:  {errorInFormula ? <span className='text-red-600'>#Error</span> : result}
            </div>
            <div className='px-[24px] py-[10px]'>
                <div className='relative z-[1] border-[1px] border-gray-300 outline-gray-300 rounded-[2px] py-[10px] px-[8px] text-xl flex flex-row flex-wrap gap-[5px]'>
                    <div className='relative flex-1'>
                        <div aria-describedby="tooltipforformula" className='border-[2px] flex-1 w-full' id='' contentEditable={true} ref={ref} dangerouslySetInnerHTML={{ __html: HTML }}
                            onBlur={(e: ChangeEvent<HTMLDivElement>) => { handleChange(e) }} suppressContentEditableWarning >
                        </div>
                        <div contentEditable={false} role="tooltip" id="tooltipforformula" className='bg-white shadow-lg absolute max-h-[400px] overflow-y-auto top-[100%] left-0 px-[6px] py-[4px]' >
                            {
                                HTML && HTML.length > 0 && inputData.filter((input) => {

                                    return input.label.toLowerCase().includes(searchQuery.toLowerCase())
                                }).map((input, index) => {
                                    return <div key={index} className='cursor-pointer hover:bg-blue-400 px-[16px] py-[8px] hover:rounded-[3px] hover:text-gray-100' onClick={() => handleDropdownClick(input)}>
                                        {input.label}
                                    </div>
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}
export default FormulaComponent