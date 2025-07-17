import { Image, ScrollView, View } from '@tarojs/components'
import { type ShareAppMessageObject, useShareAppMessage } from '@tarojs/taro'
import classnames from 'classnames'
import { useMemo, useState } from 'react'
import styles from './index.module.scss'

interface ShareOption {
    title: string
    imageUrl: string
    path: string
}

export interface ShareProps {
    children: JSX.Element | JSX.Element[]
    promise?: (e?: ShareAppMessageObject) => Promise<ShareOption>
    shareOption?: {
        title?: string
        imageUrl?: string
        path?: string
    }
    onScrollToLower?: () => void
    scrollLoading?: boolean
    onRefresherPulling?: () => void
    className?: string
    loadingImg?: string
}
/**
 * 分享
 */
export const Share = (props: ShareProps) => {
    const [refresherTriggered, setRefresherTriggered] = useState(false)

    useShareAppMessage((e) => {
        if (props.promise && e.from === 'button') {
            return props.promise(e)
        }

        return {
            ...props.shareOption,
        }
    })

    const children = useMemo(() => props.children, [props])

    async function onRefresherPulling() {
        if (refresherTriggered) {
            return
        }
        setRefresherTriggered(true)
        await props?.onRefresherPulling?.()
        setRefresherTriggered(false)
    }

    return (
        <ScrollView
            className={classnames(
                'share-scroll',
                styles.scrollView,
                props.className,
            )}
            refresherEnabled={!!props?.onRefresherPulling}
            refresherTriggered={refresherTriggered}
            scrollY
            onScrollToLower={props?.onScrollToLower}
            onRefresherPulling={() => {
                onRefresherPulling()
            }}
        >
            {children}
            <View
                className={classnames(
                    'share-scroll-container',
                    styles.bottomView,
                    !props.scrollLoading && styles.hideBottom,
                )}
            >
                <Image
                    src={props.loadingImg || ''}
                    className={classnames(
                        'share-scroll-loading',
                        styles.loadingIcon,
                    )}
                />
            </View>
        </ScrollView>
    )
}
