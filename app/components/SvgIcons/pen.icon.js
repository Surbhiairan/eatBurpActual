import React from 'react';
import Svg, {
    Path,
    G
} from 'react-native-svg';
import { View } from "react-native";

const penYellow = (props) => {
    return (
        <View>
            <Svg height="70"
                width="80"
                viewBox="0 0 22.97 22.91">
                <G>
                    <Path fill={props.fill} d="M21.56,1.6a5.05,5.05,0,0,0-7.14,0h0L1.3,14.73a.65.65,0,0,0-.18.37l-1,7.19a.63.63,0,0,0,.18.54.69.69,0,0,0,.46.2H.92l4.33-.58a.7.7,0,0,0-.2-1.38h0l-3.46.46.68-5.05,5.27,5.28a.65.65,0,0,0,.93,0h0L21.59,8.64a5.05,5.05,0,0,0,0-7.14ZM14.68,3.21l2.2,2.2L5,17.36l-2.23-2.2ZM8,20.44,5.86,18.29l12-11.95L20,8.49ZM20.88,7.55,15.61,2.29a3.74,3.74,0,0,1,5.26,5.26Z" transform="translate(-0.1 -0.13)" />
                </G>            
            </Svg>
        </View>
    )
    
}

export default penYellow;

