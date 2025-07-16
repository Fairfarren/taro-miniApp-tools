import { Button, type ButtonProps, type ITouchEvent } from '@tarojs/components'
import { showToast } from '@tarojs/taro'
import classnames from 'classnames'
import { useEffect, useState } from 'react'
import Style from './index.module.scss'

export type DiyButtonProps = ButtonProps & {
    params?: object
    rules?: {
        [key: string]: {
            required: boolean
            message: string
        }
    }
    onError?: (key: string, message: string) => void
    errorKey?: string[]
}

export function DiyButton(props: DiyButtonProps & ButtonProps) {
    const [toastTitle, setToastTitle] = useState('')

    const [key, setKey] = useState('')

    useEffect(() => {
        if (props.params && props.rules) {
            setToastTitle('')
            for (const key in props.rules) {
                // @ts-ignore
                if (!props.params[key] && props.rules[key]) {
                    if (props.rules[key].required) {
                        setToastTitle(props.rules[key].message)
                        setKey(key)
                        break
                    }
                }
            }
        }
    }, [props.params, props.rules])

    function onClick(e: ITouchEvent) {
        e.stopPropagation()

        if (toastTitle) {
            if (props.errorKey?.includes(key)) {
                props?.onError?.(key, toastTitle)
            } else {
                showToast({ title: toastTitle })
            }

            return
        }
        if (props.disabled) {
            props?.onError?.('', '')
            return
        }

        props.onClick?.(e)
    }

    return (
        <Button
            {...props}
            className={classnames(
                Style.button,
                props.className,
                props.disabled && Style.disabled,
                toastTitle && Style.disabled,
            )}
            onClick={onClick}
            open-type={props.openType}
            hoverStartTime={0}
            onGetPhoneNumber={props.onGetPhoneNumber}
        >
            {props.children}
        </Button>
    )
}
