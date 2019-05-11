# react-native-map-picker

Simple location picker on Google Map.

### Installation

Download an install the library

```npm install react-native-map-picker --save```

Or if you are using yarn

```yarn add react-native-map-picker```

This library depends upon a native libraries

1. [react-native-maps](https://github.com/react-community/react-native-maps)

Make sure to install them before you install react-native-location-picker

### Example

```jsx
import React from 'react';
import MapPicker from "react-native-map-picker";
import {View} from "react-native";


export default class SelectLocationScreen extends React.Component {
  state = {

  };

  render() {
    return(
      <View style={{flex: 1}}>
        <MapPicker
          initialCoordinate={{
            latitude: 37.78825,
            longitude: -122.4324,
          }}
          onLocationSelect={({latitude, longitude})=>console.log(longitude)}
        />
      </View>
    );
  }
}
```

### Supported Props

| Prop | Type | Required | 
| ---- | ---- | -------- |
| initialLocation | object | No |
| buttonText | string | No |
| buttonStyle | object | No |
| textStyle | object | No |
| onLocationSelect | function | No |
