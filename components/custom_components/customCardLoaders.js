import React from 'react'
import { View , Text } from "react-native";
// import SkeletonPlaceholder from "react-native-skeleton-placeholder";

export const SkeletonSquareCard = (props) => {
    const {height,width,borderRadius , marginLeft} = props
    return (
        // <SkeletonPlaceholder>
        //     <SkeletonPlaceholder.Item 
        //         width={width}
        //         height={height}
        //         borderRadius={borderRadius}
        //         marginLeft={marginLeft}
        //     />
        // </SkeletonPlaceholder>
        <View><Text>LOADING</Text></View>
    )
}

export const SkeletonListCard = (props) => {
    const {height,width,borderRadius , margin} = props
    return (
        // <SkeletonPlaceholder>
        //     <SkeletonPlaceholder.Item 
        //         width={width}
        //         height={height}
        //         borderRadius={borderRadius}
        //         margin={margin}
        //     />
        // </SkeletonPlaceholder>
        <View><Text>LOADING</Text></View>
    )
}

