import { View } from '@tarojs/components'
import classnames from 'classnames'
import Style from './index.module.scss'
import { type RadioProps, useRadioContext } from './track'

const Radio = (props: RadioProps) => {
    const { value } = useRadioContext()

    return (
        <View className={Style.radioBox}>
            <View
                className={classnames(
                    Style.radio,
                    String(props.value) === String(value) && Style.active,
                )}
            />
            {props.children}
        </View>
    )
}

export default Radio
