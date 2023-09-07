import React from 'react';
import { ActivityIndicator } from 'react-native';

const FlatlistLoader = ({ loading }) => {
    return (
        <ActivityIndicator animating={loading} color={'red'} size={22} />
    )
}
export default FlatlistLoader