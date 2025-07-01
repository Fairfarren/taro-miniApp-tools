import type { CommonEventFunction } from '@tarojs/components'
import { Image, ScrollView, View } from '@tarojs/components'
import type Taro from '@tarojs/taro'
import { useShareAppMessage } from '@tarojs/taro'
import classnames from 'classnames'
import { useMemo } from 'react'
import iconLoading from './assets/loading.svg'
import styles from './index.module.scss'

interface ShareOption {
	title: string
	imageUrl: string
	path: string
}

export interface ShareProps {
	children: JSX.Element | JSX.Element[]
	promise?: (e?: Taro.ShareAppMessageObject) => Promise<ShareOption>
	shareOption?: {
		title?: string
		imageUrl?: string
		path?: string
	}
	onScrollToLower?: CommonEventFunction<object>
	scrollLoading?: boolean
	className?: string
}
/**
 * 分享
 */
export const Share = (props: ShareProps) => {
	useShareAppMessage((e) => {
		if (props.promise && e.from === 'button') return props.promise(e)

		return {
			...props.shareOption,
		}
	})

	const children = useMemo(() => props.children, [props])

	return (
		<ScrollView
			className={classnames(
				'share-scroll',
				styles.scrollView,
				props.className
			)}
			scrollY
			onScrollToLower={props?.onScrollToLower}
		>
			{children}
			<View
				className={classnames(
					'share-scroll-container',
					styles.bottomView,
					!props.scrollLoading && styles.hideBottom
				)}
			>
				<Image
					src={iconLoading}
					className={classnames(
						'share-scroll-loading',
						styles.loadingIcon,
					)}
				/>
			</View>
		</ScrollView>
	)
}
