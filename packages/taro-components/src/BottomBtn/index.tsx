import { View } from '@tarojs/components'
import { createSelectorQuery } from '@tarojs/taro'
import classnames from 'classnames'
import { useEffect, useState } from 'react'
import Style from './index.module.scss'

/**
 * 获取底部悬浮框整体高度
 */
export function getButtonBtnHeight(): Promise<number> {
    return new Promise((resolve) => {
        const query = createSelectorQuery()
        query
            .select('#bottomBtn')
            .boundingClientRect((res) => {
                const data = Array.isArray(res) ? res[0] : res
                resolve(data?.height || 0)
            })
            .exec()
    })
}

export interface BottomBtnProps {
    children: JSX.Element | JSX.Element[]
    /**
     * child的边距
     * @default none
     */
    pd?: string
    /**
     * 是否不需要背景颜色
     * @default false
     */
    noBg?: boolean
    /**
     * 是否不需要高度填充
     * default false
     */
    noHeight?: boolean
    /**
     * 设置高度
     * @param {number} e
     */
    setHeight?: (e: number) => void
    /**
     * className
     */
    className?: string
}

/**
  底部浮层
 */
export function BottomBtn(props: BottomBtnProps) {
    const [bottomBtnHeight, setBottomBtnHeight] = useState(0)
    const style: {
        padding?: string
    } = {}
    if (props.pd !== undefined) {
        style.padding = props.pd
    }

    useEffect(() => {
        getButtonBtnHeight().then((res) => {
            setBottomBtnHeight(res)
            props.setHeight?.(res)
        })
    }, [])

    return (
        <>
            <View
                id="bottomBtn"
                className={classnames(
                    Style.bottomBtn,
                    'occupy-bottom',
                    props.noBg && Style.noBg,
                    props.className,
                )}
            >
                <View className={Style.btnBox} style={style}>
                    {props.children}
                </View>
            </View>
            {!props.noHeight ? (
                <View style={{ height: `${bottomBtnHeight}px` }} />
            ) : (
                <></>
            )}
        </>
    )
}
