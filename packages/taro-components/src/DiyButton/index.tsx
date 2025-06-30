import { Button, type ButtonProps } from '@tarojs/components'
import Style from './index.module.css'

export const DiyButton = (props: ButtonProps) => {
	return (
		<Button className={Style.button}>
			DIY Button
			{props.children}
		</Button>
	)
}
