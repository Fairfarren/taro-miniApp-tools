import { type ReactNode, useEffect } from 'react'
import { Context, type RadioProps, radioContent } from './task'

export interface RadioGroupProps {
    value: RadioProps['value']
    children: ReactNode
}

const RadioGroup = (props: RadioGroupProps) => {
    const value = radioContent()

    useEffect(() => {
        value.setValue(props.value || '')
    }, [])

    return <Context.Provider value={value}>{props.children}</Context.Provider>
}

export default RadioGroup
