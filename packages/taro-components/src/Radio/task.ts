import { createContext, type ReactNode, useContext, useState } from 'react'

export interface RadioProps {
    value: string
    children?: ReactNode
}

export function radioContent() {
    const [value, setValue] = useState<RadioProps['value']>('')

    return {
        value,
        setValue,
    }
}
export const Context = createContext<unknown>(undefined)

export const useRadioContext = () => {
    const context = useContext(Context)
    if (!context) {
        throw new Error('没有useContext的参数')
    }
    return context as ReturnType<typeof content>
}
