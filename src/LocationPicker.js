import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ActivityIndicator, TouchableOpacity, View, Text, Platform, PermissionsAndroid } from 'react-native'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'
import styles from './Styles/LocationPicker'

const DEFAULT_DELTA = {latitudeDelta: 0.015, longitudeDelta: 0.0121}

export default class LocationPicker extends Component {
    static propTypes = {
        initialCoordinate: PropTypes.shape({
            latitude: PropTypes.number.isRequired,
            longitude: PropTypes.number.isRequired
        }),
        buttonText: PropTypes.string,
        buttonStyle: PropTypes.object,
        textStyle: PropTypes.object,
        onLocationSelect: PropTypes.func
    }

    static defaultProps = {
        buttonText: 'Select Location',
        buttonStyle: {},
        textStyle: {},
        onLocationSelect: (coordinates) => ({}),
    }

    state = {
        loading: true,
        coordinate: {
            ...DEFAULT_DELTA,
            ...this.props.initialCoordinate
        },
        marker: this.props.initialCoordinate,
    }

    componentDidMount () {
        const {initialCoordinate} = this.props
        if (initialCoordinate)
            this.setPosition(initialCoordinate)
        else
            this.getCurrentPosition()
    }

    setPosition = ({latitude, longitude}) => {
        this.setState({
            loading: false,
            coordinate: {
                ...DEFAULT_DELTA,
                latitude,
                longitude
            },
            marker: {
                latitude,
                longitude
            }
        })
    }

    getSelectedPosition = () => {
        const {coordinate} = this.state
        const {latitude, longitude} = coordinate
        return {
            latitude,
            longitude
        }
    }

    async requestLocationPermission () {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            )

            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                this._getCurrentLocation()
                console.log('Location permission granted')
            } else {
                console.log('Location permission denied')
            }
        } catch (err) {
            console.warn(err)
        }
    }

    _getCurrentLocation = () => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setPosition(position.coords)
            },
            (error) => {
                this.setState({error: error.message})
            },
            {enableHighAccuracy: true, timeout: 200000, maximumAge: 1000},
        )
    }

    getCurrentPosition = async () => {
        if (Platform.OS === 'android') {
            this.requestLocationPermission()
        } else {
            this._getCurrentLocation()
        }
    }

    onMarkerDragEnd = (e) => {
        const {coordinate} = e.nativeEvent
        this.setPosition(coordinate)
    }

    onMapPress = (e) => {
        const {coordinate} = e.nativeEvent
        this.setPosition(coordinate)
    }

    onSelect = () => {
        const {onLocationSelect} = this.props
        if (typeof onLocationSelect === 'function')
            onLocationSelect(this.getSelectedPosition())
    }

    getIndicator = () => {
        return (
            <View style={styles.indicatorContainer}>
                <ActivityIndicator size={'large'}/>
            </View>
        )
    }

    render () {
        const {loading} = this.state
        const {buttonText, buttonStyle, textStyle, ...props} = this.props
        return (
            loading
                ? this.getIndicator()
                : <View style={styles.container}>
                    <MapView
                        provider={PROVIDER_GOOGLE}
                        style={styles.mapView}
                        initialRegion={this.state.coordinate}
                        minZoomLevel={16}
                        onPress={this.onMapPress}
                        {...props}>
                        <Marker draggable
                                coordinate={this.state.marker}
                                onDragEnd={this.onMarkerDragEnd}
                        />
                    </MapView>
                    <View style={styles.selectBtnContainer}>
                        <TouchableOpacity style={{...styles.selectBtn, ...buttonStyle}} onPress={this.onSelect}>
                            <Text style={{...styles.selectBtnText, ...textStyle}}>{buttonText}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
        )
    }
}
