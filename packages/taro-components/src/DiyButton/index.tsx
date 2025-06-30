import { Button } from '@tarojs/components'
import Style from './index.module.css';

export const DiyButton = (props: any) => {
  return (
    <Button className={Style.button}>
      DIY Button
      {props.children}
    </Button>
  );
}