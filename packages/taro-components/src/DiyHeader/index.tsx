import { Image, View } from '@tarojs/components'
import { getMenuButtonBoundingClientRect, navigateBack } from '@tarojs/taro'
import classnames from 'classnames'
import iconHome from './assets/home.png'
import iconBlackHome from './assets/home-black.png'
import iconLeftBlack from './assets/left-black.png'
import iconLeftWhite from './assets/left-white.png'
import Style from './index.module.scss'

export const pd = 8
export const barData = getMenuButtonBoundingClientRect()
export const headerHeight = barData.height + barData.top + pd / 2

export interface DiyHeaderProps {
    children?: JSX.Element[] | JSX.Element
    title?: string | JSX.Element
    isShare?: boolean
    noPd?: boolean
    className?: string
    needWhite?: boolean
    backHome?: () => void
    noBar?: boolean
}

/**
 * 自定义header
 */
export function DiyHeader(props: DiyHeaderProps) {
    function iconLeftOnClick(e: { stopPropagation: () => void }) {
        e.stopPropagation()
        if (props.isShare) {
            props?.backHome?.()
        } else {
            navigateBack()
        }
    }

    return (
        <>
            <View
                className={classnames(
                    Style.diyHeader,
                    'bg-blur',
                    props.className,
                )}
                onClick={(e) => e.stopPropagation()}
            >
                <View
                    className={Style.headerTop}
                    style={{ height: `${barData.top - pd / 2}px` }}
                />
                <View
                    className={Style.headerMain}
                    style={{ height: `${barData.height + pd}px` }}
                >
                    {props.title ? (
                        <View className={Style.headerTitleBar}>
                            <Image
                                className={Style.headerIcon}
                                src={
                                    props.isShare
                                        ? props.needWhite
                                            ? iconHome
                                            : iconBlackHome
                                        : props.needWhite
                                          ? iconLeftWhite
                                          : iconLeftBlack
                                }
                                onClick={iconLeftOnClick}
                            />
                            <View
                                className={classnames(
                                    Style.headerTitle,
                                    props.needWhite
                                        ? Style.headerTitleWhite
                                        : Style.headerTitleBlack,
                                )}
                            >
                                {props.title}
                            </View>
                            <View className={Style.headerTitlePlaceholder} />
                        </View>
                    ) : (
                        <>
                            <View className={Style.headerChildren}>
                                {props.children}
                            </View>
                            {!props.noBar ? (
                                <View
                                    className={Style.headerChildrenSpacer}
                                    style={{ width: `${barData.width}px` }}
                                />
                            ) : (
                                <></>
                            )}
                        </>
                    )}
                </View>
            </View>
            {!props.noPd ? (
                <View style={{ height: `${headerHeight}px` }} />
            ) : (
                <></>
            )}
        </>
    )
}
