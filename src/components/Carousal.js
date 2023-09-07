import React, { useState } from "react";
import { Text, View, Image } from "react-native";
import Carousel from "pinar";
import Color from "../theme/color";
import Theme from "../theme/theme";

const styles = {
    slide: {
        flex: 1,
        borderRadius: 5
    }
};

const SliderCarousal = ({ navigation, size }) => {

    const [sliderData, setSliderData] = useState([
        { key: 3, image: require('../assets/slider/3.png') },
        { key: 12, image: require('../assets/slider/5.jpg') },
        { key: 22, image: require('../assets/slider/2.jpg') },
    ])

    return (
        <Carousel
            showsControls={false}
            dotsContainerStyle={Theme.CarousalDotContainer}
            autoplay
            loop
            activeDotStyle={Theme.CarousalActiveDot}

            dotStyle={Theme.CarousalInActiveDot}

            style={{ ...Theme.CarousalContaioner, height: size }}>
            {sliderData.map((item) => (
                <View key={item.key} style={styles.slide}>
                    <Image resizeMode='stretch' style={Theme.CarousalImage} source={item.image} />
                </View>
            ))}
        </Carousel>
    )
};


export default SliderCarousal;