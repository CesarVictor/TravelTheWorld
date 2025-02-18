import React from "react";
import { View, Text, ImageBackground, StyleSheet, ImageSourcePropType } from "react-native";
import { DataService, Places, Place } from "@/Data/data";



interface MainComponentProps {
    places: Places;
}



const MainComponent: React.FC<MainComponentProps> = (title, places) => {
    return (
        <View style={styles.container}>
            <Section title="Top Activities" places={places}/>
            <Section title="Top Activities" places={places}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default MainComponent;