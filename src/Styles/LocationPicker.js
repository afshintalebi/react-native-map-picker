import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    indicatorContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    mapView: {
        flex: 1
    },
    selectBtnContainer: {
        position: 'absolute',
        bottom: 25,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        paddingHorizontal: 5,
    },
    selectBtn: {
        borderRadius: 3,
        backgroundColor: '#000000',
        width: '100%',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center'

    },
    selectBtnText: {
        color: '#ffffff'
    }
})

export default styles