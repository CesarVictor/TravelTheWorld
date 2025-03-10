import React, { useEffect, useState } from "react";
import { View, Text, ImageBackground, StyleSheet, ImageSourcePropType } from "react-native";
import { DataService, Places, Place } from "@/Data/data";
import Section from "./Section";
import CategoryFilter from "./categoryFilter";



interface MainComponentProps {
    places: Places;
}



const MainComponent: React.FC<MainComponentProps> = ({places}) => {
    
    
    const categoriesOfPlaces = Object.keys(places);
    console.log(categoriesOfPlaces);
    const [categories, setCategories] = useState<string[]>(categoriesOfPlaces);

    useEffect(() => {
        setCategories(categoriesOfPlaces);
    }, [places]);

    console.log(categories);

    


    return (
        <View style={styles.container}>
            {places && (
                <>
                    {/* <Section places={places} category={"restaurants"} /> */}
                    <Section places={places} category={"restaurants"} />
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {

        height: "50%",
    },
});

export default MainComponent;