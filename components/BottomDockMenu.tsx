import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

interface BottomDockMenuProps {
    onChangeCity?: () => void;
    onClose?: () => void;
}

const BottomDockMenu: React.FC<BottomDockMenuProps> = ({ onChangeCity, onClose }) => {
    return (
        <View style={styles.container}>
            {/* Top Row with Icons */}
            <View style={styles.iconRow}>
                <TouchableOpacity style={styles.iconWrapper}>
                    <Icon name="compass" size={22} color="white" />
                    <Text style={styles.iconLabel}>DISCOVER</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconWrapper}>
                    <Icon name="check-circle" size={22} color="white" />
                    <Text style={styles.iconLabel}>DO's</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconWrapper}>
                    <Icon name="award" size={22} color="white" />
                    <Text style={styles.iconLabel}>DONE's</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconWrapper}>
                    <Image
                        source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }}
                        style={styles.avatar}
                    />
                    <Text style={styles.iconLabel}>PROFILE</Text>
                </TouchableOpacity>
            </View>

            {/* Separator + Change City */}
            <View style={styles.bottomRow}>
                <TouchableOpacity style={styles.changeCity} onPress={onChangeCity}>
                    <Icon name="map-pin" size={16} color="white" />
                    <Text style={styles.changeCityText}>CHANGE CITY</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={onClose}>
                    <Text style={styles.closeText}>X</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 30,
        alignSelf: 'center',
        backgroundColor: '#000',
        borderRadius: 24,
        padding: 16,
        paddingHorizontal: 24,
        width: '90%',
    },
    iconRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    iconWrapper: {
        alignItems: 'center',
        gap: 4,
    },
    iconLabel: {
        color: 'white',
        fontSize: 12,
    },
    avatar: {
        width: 24,
        height: 24,
        borderRadius: 12,
        marginBottom: 4,
    },
    bottomRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 12,
        alignItems: 'center',
    },
    changeCity: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    changeCityText: {
        color: 'white',
        textDecorationLine: 'underline',
        fontSize: 13,
    },
    closeText: {
        color: 'white',
        fontSize: 18,
    },
});

export default BottomDockMenu;
