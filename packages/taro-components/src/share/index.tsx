import type { CommonEventFunction } from '@tarojs/components'
import { Image, ScrollView, View } from '@tarojs/components'
import type Taro from '@tarojs/taro'
import { useRouter, useShareAppMessage } from '@tarojs/taro'
import classnames from 'classnames'
import { useEffect, useMemo } from 'react'
import iconLoading from './loading.svg'

interface ShareOption {
	title: string
	imageUrl: string
	path: string
}
/**
 * 分享
 * @param props
 * @param {ShareOption} props.shareOption 分享的配置
 */
export const Share = (props: {
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
}) => {
	const router = useRouter()

	useShareAppMessage((e) => {
		if (props.promise && e.from === 'button') return props.promise(e)

		return {
			...props.shareOption,
		}
	})

	useEffect(() => {
		console.log('===router.params===')
		console.table(router.params)
		console.log('===router.params end===')
	}, [])

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
