import type { CommonEventFunction } from '@tarojs/components'
import { Image, ScrollView, View } from '@tarojs/components'
import type Taro from '@tarojs/taro'
import { useShareAppMessage } from '@tarojs/taro'
import classnames from 'classnames'
import { useMemo } from 'react'
import iconLoading from './assets/loading.svg'

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
				'w-screen',
				'h-screen',
				'relative',
				props.className,
			)}
			scrollY
			onScrollToLower={props?.onScrollToLower}
		>
			{children}
			<View
				className={classnames(
					'w-full',
					'h-[280px]',
					'flex',
					'items-start',
					'justify-center',
					'fixed',
					'bottom-0',
					'left-0',
					'transition',
					!props.scrollLoading && '!-bottom-[300px]',
				)}
			>
				<Image
					src={iconLoading}
					className={classnames('w-[80px]', 'h-[80px]')}
				/>
			</View>
		</ScrollView>
	)
}
