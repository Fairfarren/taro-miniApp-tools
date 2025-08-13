import { Input, Text, View } from '@tarojs/components'
import classnames from 'classnames'
import { type ReactNode, useDeferredValue, useState } from 'react'
import Style from './index.module.scss'

export function DiyInput(props: {
    name: string
    boxClassName?: string
    focus?: boolean
    onBlur?: () => void
    onFocus?: () => void
    before?: ReactNode
    after?: ReactNode
    maxLength?: number
    value?: string
    disabled?: boolean
    placeholder?: string
}) {
    const [isFocus, setIsFocus] = useState(props.focus || false)

    const deferredValue = useDeferredValue(props.value)

    function onBlur() {
        props.onBlur?.()
        setIsFocus(false)
    }

    function onFocus() {
        props.onFocus?.()
        setIsFocus(true)
    }

    return (
        <View
            className={classnames(
                Style.diyInput,
                'bg-bg',
                isFocus && 'input-focus',
                props.boxClassName,
            )}
        >
            <View
                className={classnames(Style.customBox, Style.customBox_input)}
            >
                {props.before}
                <Input
                    className={Style.input}
                    name={props.name}
                    onBlur={onBlur}
                    onFocus={onFocus}
                    onClick={() => !props.disabled && setIsFocus(true)}
                    placeholder={props.placeholder}
                />
                {props.after}
                {props.maxLength && (
                    <Text
                        className={classnames(
                            'text-[28px]',
                            'font-JDZhengHT-Regular',
                            'flex-shrink-0',
                            'text-green',
                        )}
                    >
                        {deferredValue?.length}/{props.maxLength}
                    </Text>
                )}
            </View>
        </View>
    )
}
