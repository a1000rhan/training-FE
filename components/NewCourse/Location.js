import * as React from "react"
import { Dimensions, StyleSheet, Text, View } from "react-native"
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete"
import MapView, { Callout, Circle, Marker } from "react-native-maps"
import { Input } from 'react-native-elements';

export default function Location() {
	const [ pin, setPin ] = React.useState({
		latitude: 29.37693,
		longitude: 47.97803
	})
	const [ region, setRegion ] = React.useState({
		latitude: 29.37693,
		longitude: 47.97803,
		// latitudeDelta: 0.0922,
		// longitudeDelta: 0.0421
	})

	return (
		<View style={{ marginTop: 50, flex: 1 }}>
			
			<GooglePlacesAutocomplete
				placeholder="Search"
				fetchDetails={true}
				GooglePlacesSearchQuery={{
					rankby: "distance"
				}}
				onPress={(data, details = null) => {
					
					console.log(data, details)
					
					setRegion({
						latitude: details.geometry.location.lat,
						longitude: details.geometry.location.lng,
						latitudeDelta: 0.0422,
						longitudeDelta: 0.021
					})
				}}
				// textInputProps={{
				// 	InputComp: Input,
				// 	leftIcon: { type: 'font-awesome', name: 'chevron-left' },
				// 	errorStyle: { color: 'red' },
				//   }}
				query={{
					
					language: "en",
                    components:"country: KWT",
					radius: 30000,
					location: `${region.latitude}, ${region.longitude}`
				}}
				styles={{
					container: { flex: 0, position: "absolute", width: "100%", zIndex: 1 },
					listView: { backgroundColor: "white" }
				}}
			/>
			<MapView
				style={styles.map}
				initialRegion={{
					latitude:29.37693,
					longitude: 47.97803,
					latitudeDelta: 0.0122,
					longitudeDelta: 0.0021
				}}
				provider="google"
			>
				<Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }} />
				<Marker
					coordinate={pin}
					pinColor="red"
					draggable={true}
					onDragStart={(e) => {
						console.log("Drag start", e.nativeEvent.coordinates)
					}}
					onDragEnd={(e) => {
						setPin({
							latitude: e.nativeEvent.coordinate.latitude,
							longitude: e.nativeEvent.coordinate.longitude
						})
					}}
				>
					<Callout>
						<Text>I'm here</Text>
					</Callout>
				</Marker>
				<Circle center={pin} radius={20} />
			</MapView>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center"
	},
	map: {
		width: Dimensions.get("window").width,
		height: Dimensions.get("window").height
	}
})