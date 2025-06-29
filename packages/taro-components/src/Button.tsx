import  { useState, useEffect } from 'react';
import './button.css';
import { View, Button } from '@tarojs/components';


export const BButton = (props: any) => {

  const [a, setA] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setA(1);
    }, 1000);
  }, []);

  return (
    <View>
      {props.children}
      <Button className="taro-button">
        qweeqw - { a }
        </Button>
    </View>
  );
};
