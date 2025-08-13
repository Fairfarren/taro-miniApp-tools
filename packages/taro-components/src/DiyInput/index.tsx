import { Input, type InputProps, Text, View } from '@tarojs/components'
import classnames from 'classnames'
import {
    type ReactNode,
    useDeferredValue,
    useEffect,
    useRef,
    useState,
} from 'react'
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
    onInput?: (e: string) => void
}) {
    const [isFocus, setIsFocus] = useState(props.focus || false)
    const inputRef = useRef<InputProps>(null)
    const timer = useRef<NodeJS.Timeout>()

    const deferredValue = useDeferredValue(props.value)

    function onBlur() {
        props.onBlur?.()
        setIsFocus(false)
    }

    function onFocus() {
        props.onFocus?.()
        setIsFocus(true)
    }

    useEffect(() => {
        clearTimeout(timer.current)
        timer.current = setTimeout(
            () => {
                if (inputRef.current) {
                    inputRef.current.value = props.value || ''
                }
            },
            isFocus ? 600 : 0,
        )
    }, [deferredValue])

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
                    ref={inputRef}
                    maxlength={props.maxLength || 100}
                    className={Style.input}
                    name={props.name}
                    onBlur={onBlur}
                    onFocus={onFocus}
                    onClick={() => !props.disabled && setIsFocus(true)}
                    placeholder={props.placeholder}
                    onInput={(e) => props.onInput?.(e.detail.value)}
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
                        {deferredValue?.length || 0}/{props.maxLength}
                    </Text>
                )}
            </View>
        </View>
    )
}
