
// // import BlurTabBarBackground from '@/components/ui/TabBarBackground.ios';
// // import {View , Text} from 'react-native';


// // const Farmdetails = () => {
// //   return (
// //     <View style={{flex:1, justifyContent:"center", alignItems:"center", backgroundColor: "black"}}>
// //       <Text style={{color:"white",fontSize:50}}>Farm Details</Text>
// //     </View>
// //   );
// // }
// // export default Farmdetails;
// // import React, { useState } from 'react';
// // import { View, Text, TextInput, Button, ActivityIndicator, StyleSheet } from 'react-native';

// // const WeatherScreen = () => {
// //   const [city, setCity] = useState('');
// //   const [weatherData, setWeatherData] = useState<any>(null);
// //   const [loading, setLoading] = useState(false);

// //   const fetchWeather = async () => {
// //     try {
// //       setLoading(true);
// //       const response = await fetch(
// //         `https://api.weatherapi.com/v1/current.json?key=fa540f9aedd24bfb974121903252203&q=${city}`
// //       );
// //       const data = await response.json();
// //       setWeatherData(data);
// //     } catch (error) {
// //       console.error('Error fetching weather:', error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <View style={styles.container}>
// //       <Text style={styles.heading}>Check Weather</Text>
// //       <TextInput
// //         style={styles.input}
// //         placeholder="Enter City Name"
// //         value={city}
// //         onChangeText={setCity}
// //       />
// //       <Button title="Get Weather" onPress={fetchWeather} />

// //       {loading && <ActivityIndicator size="large" color="#0000ff" />}

// //       {weatherData && !loading && (
// //         <View style={styles.weatherInfo}>
// //           <Text style={styles.cityName}>{weatherData.location.name}</Text>
// //           <Text>Temperature: {weatherData.current.temp_c}°C</Text>
// //           <Text>Condition: {weatherData.current.condition.text}</Text>
// //           <Text>Humidity: {weatherData.current.humidity}%</Text>
// //           <Text>Wind: {weatherData.current.wind_kph} km/h</Text>
// //         </View>
// //       )}
// //     </View>
// //   );
// // };

// // export default WeatherScreen;

// // const styles = StyleSheet.create({
// //   container: { flex: 1, padding: 20, justifyContent: 'center' },
// //   heading: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
// //   input: { borderBottomWidth: 1, marginBottom: 10, padding: 8 },
// //   weatherInfo: { marginTop: 20 },
// //   cityName: { fontSize: 20, fontWeight: 'bold' },
// // });


// // import React, { useEffect, useState } from 'react';
// // import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
// // import LottieView from 'lottie-react-native';
// // import cloudAnimation from '../../assets/lottie/cloud.json';
// // import sunAnimation from '../../assets/lottie/sun.json';
// // import rainAnimation from '../../assets/lottie/rain.json';
// // import windAnimation from '../../assets/lottie/wind.json';

// // const WeatherScreen = () => {
// //   const [weatherData, setWeatherData] = useState<any>(null);
// //   const [loading, setLoading] = useState(true);

// //   const fetchWeather = async () => {
// //     try {
// //       const response = await fetch(
// //         `https://api.weatherapi.com/v1/current.json?key=YOUR_API_KEY&q=New Delhi`
// //       );
// //       const data = await response.json();
// //       setWeatherData(data);
// //     } catch (error) {
// //       console.error('Error fetching weather:', error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchWeather();
// //   }, []);

// //   const getWeatherAnimation = (condition: string) => {
// //     if (condition.includes('sun') || condition.includes('Sunny')) {
// //       return require("assets\lottie\cloud.json");
// //     } else if (condition.includes('rain') || condition.includes('Rain')) {
// //       return require('assets\lottie\rain.json');
// //     } else if (condition.includes('cloud') || condition.includes('Cloud')) {
// //       return require('assets\lottie\cloud.json');
// //     } else if (condition.includes('wind') || condition.includes('Wind')) {
// //       return require('assets\lottie\rain.json');
// //     } else {
// //       return require('assets\lottie\cloud.json'); // fallback
// //     }
// //   };

// //   return (
// //     <View style={styles.container}>
// //       {loading ? (
// //         <ActivityIndicator size="large" color="#2196F3" />
// //       ) : weatherData ? (
// //         <>
// //           <Text style={styles.cityName}>Delhi</Text>
// //           <LottieView
// //             source={getWeatherAnimation(weatherData.current.condition.text)}
// //             autoPlay
// //             loop
// //             style={{ width: 200, height: 200 }}
// //           />
// //           <Text style={styles.temp}>{weatherData.current.temp_c}°C</Text>
// //           <Text style={styles.condition}>{weatherData.current.condition.text}</Text>
// //           <View style={styles.detailsContainer}>
// //             <Text>Humidity: {weatherData.current.humidity}%</Text>
// //             <Text>Wind: {weatherData.current.wind_kph} km/h</Text>
// //             <Text>Feels Like: {weatherData.current.feelslike_c}°C</Text>
// //           </View>
// //         </>
// //       ) : (
// //         <Text>Unable to fetch weather data.</Text>
// //       )}
// //     </View>
// //   );
// // };

// // export default WeatherScreen;

// // const styles = StyleSheet.create({
// //   container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#E0F7FA' },
// //   cityName: { fontSize: 32, fontWeight: 'bold', marginBottom: 10 },
// //   temp: { fontSize: 48, fontWeight: 'bold', color: '#FF5722' },
// //   condition: { fontSize: 20, marginBottom: 10 },
// //   detailsContainer: { marginTop: 20, alignItems: 'center' },
// // });



// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
// import LottieView from 'lottie-react-native';

// // ✅ Import animations at the top

// // import cloudAnimation from '../../assets/lottie/cloud.json';
// // import sunAnimation from '../../assets/lottie/sun.json';
// // import rainAnimation from '../../assets/lottie/rain.json';
// // import windAnimation from '../../assets/lottie/wind.json';

// const WeatherScreen = () => {
//   const [weatherData, setWeatherData] = useState<any>(null);
//   const [loading, setLoading] = useState(true);

//   const fetchWeather = async () => {
//     try {
//       const response = await fetch(
//         `https://api.weatherapi.com/v1/current.json?key=YOUR_API_KEY_HERE&q=Delhi`
//       );
//       const data = await response.json();
//       setWeatherData(data);
//     } catch (error) {
//       console.error('Error fetching weather:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchWeather();
//   }, []);

//   const getWeatherAnimation = (condition: string) => {
//     const lowerCondition = condition.toLowerCase();
//     // if (lowerCondition.includes('sun')) {
//     //   return sunAnimation;
//     // } else if (lowerCondition.includes('rain')) {
//     //   return rainAnimation;
//     // } else if (lowerCondition.includes('cloud')) {
//     //   return cloudAnimation;
//     // } else if (lowerCondition.includes('wind')) {
//     //   return windAnimation;
//     // } else {
//     //   return cloudAnimation; // fallback
//     // }
//   };

//   return (
//     <View style={styles.container}>
//       {loading ? (
//         <ActivityIndicator size="large" color="#2196F3" />
//       ) : weatherData ? (
//         <>
//           <Text style={styles.cityName}>Delhi</Text>
//           <LottieView
//             // source={getWeatherAnimation(weatherData.current.condition.text)}
//             autoPlay
//             loop
//             style={{ width: 250, height: 250 }}
//           />
//           <Text style={styles.temp}>{weatherData.current.temp_c}°C</Text>
//           <Text style={styles.condition}>{weatherData.current.condition.text}</Text>
//           <View style={styles.detailsContainer}>
//             <Text style={styles.detailText}>Humidity: {weatherData.current.humidity}%</Text>
//             <Text style={styles.detailText}>Wind: {weatherData.current.wind_kph} km/h</Text>
//             <Text style={styles.detailText}>Feels Like: {weatherData.current.feelslike_c}°C</Text>
//           </View>
//         </>
//       ) : (
//         <Text>Unable to fetch weather data.</Text>
//       )}
//     </View>
//   );
// };

// export default WeatherScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#A9DDF0',
//     padding: 20,
//   },
//   cityName: {
//     fontSize: 36,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     color: '#333',
//   },
//   temp: {
//     fontSize: 56,
//     fontWeight: 'bold',
//     color: '#FF5722',
//     marginVertical: 10,
//   },
//   condition: {
//     fontSize: 22,
//     marginBottom: 20,
//     color: '#555',
//   },
//   detailsContainer: {
//     marginTop: 20,
//     alignItems: 'center',
//     backgroundColor: '#ffffff99',
//     padding: 15,
//     borderRadius: 12,
//     width: '80%',
//   },
//   detailText: {
//     fontSize: 16,
//     marginVertical: 3,
//     color: '#333',
//   },
// });


// import React, { useState } from 'react';
// import { View, Text, Image, Button, StyleSheet, Alert } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';
// //mport axios from 'axios';

// const PlantDiseaseDetectionScreen = () => {
//   const [image, setImage] = useState<string | null>(null);
//   const [analysisResult, setAnalysisResult] = useState(null);

//   // Request camera permissions
//   const requestCameraPermissions = async () => {
//     const { status } = await ImagePicker.requestCameraPermissionsAsync();
//     if (status !== 'granted') {
//       Alert.alert('Sorry', 'Camera permissions are required to take photos');
//       return false;
//     }
//     return true;
//   };

//   // Take photo using camera
//   const takePhoto = async () => {
//     const hasPermission = await requestCameraPermissions();
//     if (!hasPermission) return;

//     let result = await ImagePicker.launchCameraAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//     });

//     if (!result.canceled) {
//       setImage(result.assets[0].uri);
//       await analyzeImage(result.assets[0].uri);
//     }
//   };

//   // Analyze image using Gemini API
//   const analyzeImage = async (imageUri: string) => {
//     try {
//       // Convert image to base64
//       const base64Image = await convertImageToBase64(imageUri);

//       // Replace with your actual Gemini API endpoint and key
//       const response = await axios.post('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro-vision:generateContent', {
//         key: 'AIzaSyBnaKP_EdrnAPH1qlR1nzAokz9DTrMnJDQ', // Replace with your actual API key
//         contents: [{
//           parts: [
//             { text: 'Analyze this plant image for any signs of disease' },
//             { 
//               inlineData: {
//                 mimeType: 'image/jpeg',
//                 data: base64Image
//               }
//             }
//           ]
//         }]
//       });

//       // Process the API response
//       const analysisText = (response.data as any).candidates[0].content.parts[0].text;
//       setAnalysisResult(analysisText);
//     } catch (error) {
//       console.error('Error analyzing image:', error);
//       Alert.alert('Error', 'Failed to analyze the image');
//     }
//   };

//   // Convert image to base64
//   const convertImageToBase64 = async (imageUri: string) => {
//     const response = await fetch(imageUri);
//     const blob = await response.blob();
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         const base64data = typeof reader.result === 'string' ? reader.result.split(',')[1] : '';
//         resolve(base64data);
//       };
//       reader.onerror = reject;
//       reader.readAsDataURL(blob);
//     });
//   };

//   return (
//     <View style={styles.container}>
//       <Button title="Take Photo" onPress={takePhoto} />
      
//       {image && (
//         <Image source={{ uri: image }} style={styles.image} />
//       )}
      
//       {analysisResult && (
//         <View style={styles.resultContainer}>
//           <Text style={styles.resultTitle}>Disease Analysis Result:</Text>
//           <Text style={styles.resultText}>{analysisResult}</Text>
//         </View>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 20,
//   },
//   image: {
//     width: 300,
//     height: 300,
//     resizeMode: 'contain',
//     marginVertical: 20,
//   },
//   resultContainer: {
//     marginTop: 20,
//     padding: 15,
//     backgroundColor: '#f0f0f0',
//     borderRadius: 10,
//   },
//   resultTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   resultText: {
//     fontSize: 16,
//   },
// });

// export default PlantDiseaseDetectionScreen;



// import React, { useState } from 'react';
// import { View, Text, Image, Button, StyleSheet, Alert } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';

// const PlantDiseaseDetectionScreen = () => {
//   const [image, setImage] = useState<string | null>(null);
//   const [analysisResult, setAnalysisResult] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState(false);

//   // Request camera permissions
//   const requestCameraPermissions = async () => {
//     const { status } = await ImagePicker.requestCameraPermissionsAsync();
//     if (status !== 'granted') {
//       Alert.alert('Sorry', 'Camera permissions are required to take photos');
//       return false;
//     }
//     return true;
//   };

//   // Take photo using camera
//   const takePhoto = async () => {
//     const hasPermission = await requestCameraPermissions();
//     if (!hasPermission) return;

//     let result = await ImagePicker.launchCameraAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//     });

//     if (!result.canceled) {
//       setImage(result.assets[0].uri);
//       await analyzeImage(result.assets[0].uri);
//     }
//   };

//   // Analyze image using Gemini API
//   const analyzeImage = async (imageUri: string) => {
//     setIsLoading(true);
//     try {
//       // Convert image to base64
//       const base64Image = await convertImageToBase64(imageUri);

//       // Replace with your actual Gemini API endpoint and key
//       const response = await fetch(
//         `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro-vision:generateContent?key=AIzaSyBnaKP_EdrnAPH1qlR1nzAokz9DTrMnJDQ`,
//         {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             contents: [{
//               parts: [
//                 { text: 'Analyze this plant image for any signs of disease. Identify the type of plant and describe any visible diseases or health issues.' },
//                 { 
//                   inlineData: {
//                     mimeType: 'image/jpeg',
//                     data: base64Image
//                   }
//                 }
//               ]
//             }]
//           })
//         }
//       );

//       const data = await response.json();

//       // Process the API response
//       const analysisText = data.candidates?.[0]?.content?.parts?.[0]?.text || 
//         'Unable to analyze the image. Please try again.';
      
//       setAnalysisResult(analysisText);
//     } catch (error) {
//       console.error('Error analyzing image:', error);
//       Alert.alert('Error', 'Failed to analyze the image');
//       setAnalysisResult('Analysis failed. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Convert image to base64
//   const convertImageToBase64 = async (imageUri: string) => {
//     const response = await fetch(imageUri);
//     const blob = await response.blob();
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         const base64data = typeof reader.result === 'string' ? reader.result.split(',')[1] : '';
//         resolve(base64data);
//       };
//       reader.onerror = reject;
//       reader.readAsDataURL(blob);
//     });
//   };

//   return (
//     <View style={styles.container}>
//       <Button title="Take Photo" onPress={takePhoto} />
      
//       {image && (
//         <Image source={{ uri: image }} style={styles.image} />
//       )}
      
//       {isLoading && (
//         <Text style={styles.loadingText}>Analyzing image...</Text>
//       )}
      
//       {analysisResult && (
//         <View style={styles.resultContainer}>
//           <Text style={styles.resultTitle}>Disease Analysis Result:</Text>
//           <Text style={styles.resultText}>{analysisResult}</Text>
//         </View>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 20,
//   },
//   image: {
//     width: 300,
//     height: 300,
//     resizeMode: 'contain',
//     marginVertical: 20,
//   },
//   resultContainer: {
//     marginTop: 20,
//     padding: 15,
//     backgroundColor: '#f0f0f0',
//     borderRadius: 10,
//   },
//   resultTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   resultText: {
//     fontSize: 16,
//   },
//   loadingText: {
//     marginTop: 20,
//     fontSize: 16,
//     color: 'gray',
//   },
// });

// export default PlantDiseaseDetectionScreen;



// import React, { useState } from 'react';
// import { View, Text, Image, Button, StyleSheet, Alert } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';

// const PlantDiseaseDetectionScreen = () => {
//   const [image, setImage] = useState(null);
//   const [analysisResult, setAnalysisResult] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);

//   // Request camera permissions
//   const requestCameraPermissions = async () => {
//     const { status } = await ImagePicker.requestCameraPermissionsAsync();
//     if (status !== 'granted') {
//       Alert.alert('Sorry', 'Camera permissions are required to take photos');
//       return false;
//     }
//     return true;
//   };

//   // Take photo using camera
//   const takePhoto = async () => {
//     const hasPermission = await requestCameraPermissions();
//     if (!hasPermission) return;

//     let result = await ImagePicker.launchCameraAsync({
//       mediaTypes: [ImagePicker.MediaType.Images],
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//     });

//     if (!result.canceled) {
//       setImage(result.assets[0].uri);
//       await analyzeImage(result.assets[0].uri);
//     }
//   };

//   // Analyze image using Gemini API
//   const analyzeImage = async (imageUri) => {
//     setIsLoading(true);
//     try {
//       // Convert image to base64
//       const base64Image = await convertImageToBase64(imageUri);

//       // Replace with your actual Gemini API endpoint and key
//       const response = await fetch(
//         `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro-vision:generateContent?key=YOUR_API_KEY`,
//         {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             contents: [{
//               parts: [
//                 { text: 'Analyze this plant image for any signs of disease. Identify the type of plant and describe any visible diseases or health issues.' },
//                 { 
//                   inlineData: {
//                     mimeType: 'image/jpeg',
//                     data: base64Image
//                   }
//                 }
//               ]
//             }]
//           })
//         }
//       );

//       const data = await response.json();

//       // Process the API response
//       const analysisText = data.candidates?.[0]?.content?.parts?.[0]?.text || 
//         'Unable to analyze the image. Please try again.';
      
//       setAnalysisResult(analysisText);
//     } catch (error) {
//       console.error('Error analyzing image:', error);
//       Alert.alert('Error', 'Failed to analyze the image');
//       setAnalysisResult('Analysis failed. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Convert image to base64
//   const convertImageToBase64 = async (imageUri) => {
//     const response = await fetch(imageUri);
//     const blob = await response.blob();
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         const base64data = reader.result.split(',')[1];
//         resolve(base64data);
//       };
//       reader.onerror = reject;
//       reader.readAsDataURL(blob);
//     });
//   };

//   return (
//     <View style={styles.container}>
//       <Button title="Take Photo" onPress={takePhoto} />
      
//       {image && (
//         <Image source={{ uri: image }} style={styles.image} />
//       )}
      
//       {isLoading && (
//         <Text style={styles.loadingText}>Analyzing image...</Text>
//       )}
      
//       {analysisResult && (
//         <View style={styles.resultContainer}>
//           <Text style={styles.resultTitle}>Disease Analysis Result:</Text>
//           <Text style={styles.resultText}>{analysisResult}</Text>
//         </View>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 20,
//   },
//   image: {
//     width: 300,
//     height: 300,
//     resizeMode: 'contain',
//     marginVertical: 20,
//   },
//   resultContainer: {
//     marginTop: 20,
//     padding: 15,
//     backgroundColor: '#f0f0f0',
//     borderRadius: 10,
//   },
//   resultTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   resultText: {
//     fontSize: 16,
//   },
//   loadingText: {
//     marginTop: 20,
//     fontSize: 16,
//     color: 'gray',
//   },
// });

// export default PlantDiseaseDetectionScreen;




// import React, { useState } from 'react';
// import { View, Text, Image, Button, StyleSheet, Alert, ScrollView } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';
// import { GoogleGenerativeAI } from "@google/generative-ai";

// const PlantDiseaseDetectionScreen = () => {
//   const [image, setImage] = useState<string | null>(null);
//   const [analysisResult, setAnalysisResult] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState(false);

//   // Initialize Gemini AI with your API key
//   const genAI = new GoogleGenerativeAI('AIzaSyBnaKP_EdrnAPH1qlR1nzAokz9DTrMnJDQ');

//   // Request camera permissions
//   const requestCameraPermissions = async () => {
//     const { status } = await ImagePicker.requestCameraPermissionsAsync();
//     if (status !== 'granted') {
//       Alert.alert('Permissions', 'Camera permissions are required to take photos');
//       return false;
//     }
//     return true;
//   };

//   // Take photo using camera
//   const takePhoto = async () => {
//     const hasPermission = await requestCameraPermissions();
//     if (!hasPermission) return;

//     let result = await ImagePicker.launchCameraAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//     });

//     if (!result.canceled) {
//       setImage(result.assets[0].uri);
//       await analyzeImage(result.assets[0].uri);
//     }
//   };

//   // Convert image to base64
//   const convertImageToBase64 = async (imageUri: string): Promise<string> => {
//     const response = await fetch(imageUri);
//     const blob = await response.blob();
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         const base64data = typeof reader.result === 'string' ? reader.result.split(',')[1] : '';
//         resolve(base64data);
//       };
//       reader.onerror = reject;
//       reader.readAsDataURL(blob);
//     });
//   };

//   // Analyze image using Gemini API
//   const analyzeImage = async (imageUri: string) => {
//     setIsLoading(true);
//     setAnalysisResult(null);

//     try {
//       // Convert image to base64
//       const base64Image = await convertImageToBase64(imageUri);

//       // Get the generative model
//       const model = genAI.getGenerativeModel({ 
//         model: "gemini-1.5-flash",
//         // Optional: Add safety settings or generation config
//         // safetySettings: [...],
//         // generationConfig: {...}
//       });

//       // Generate content
//       const result = await model.generateContent([
//         "Carefully analyze this plant image. Identify the plant species and detect any signs of disease. Provide a detailed description of:" +
//         "1. Plant type/species" +
//         "2. Any visible disease symptoms" +
//         "3. Potential causes of the disease" +
//         "4. Recommended treatment or management strategies" +
//         "If no disease is detected, confirm the plant appears healthy.",
      
//         { 
//           inlineData: { 
//             mimeType: "image/jpeg", 
//             data: base64Image 
//           } 
//         }
//       ]);

//       // Extract the response text
//       const response = await result.response;
//       const analysisText = response.text();
    
      
//       setAnalysisResult(analysisText);
//     } catch (error) {
//       console.error('Error analyzing image:', error);
//       Alert.alert('Error', 'Failed to analyze the image');
//       setAnalysisResult('Analysis failed. Please check your internet connection and API key.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Button title="Take Plant Photo" onPress={takePhoto} />
      
//       {image && (
//         <Image source={{ uri: image }} style={styles.image} />
//       )}
      
//       {isLoading && (
//         <Text style={styles.loadingText}>Analyzing plant image...</Text>
//       )}
      
//       {analysisResult && (
//         <View style={styles.resultContainer}>
//           <Text style={styles.resultTitle}>Plant Disease Analysis:</Text>
//           <Text style={styles.resultText}>{analysisResult}</Text>
//         </View>
//       )}
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 20,
//   },
//   image: {
//     width: 300,
//     height: 300,
//     resizeMode: 'contain',
//     marginVertical: 20,
//     borderRadius: 10,
//   },
//   resultContainer: {
//     marginTop: 20,
//     padding: 15,
//     backgroundColor: '#f0f0f0',
//     borderRadius: 10,
//     width: '100%',
//   },
//   resultTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 10,
//     color: '#333',
//   },
//   resultText: {
//     fontSize: 16,
//     lineHeight: 24,
//   },
//   loadingText: {
//     marginTop: 20,
//     fontSize: 16,
//     color: 'gray',
//   },
// });

// export default PlantDiseaseDetectionScreen;


import React, { useState } from 'react';
import { 
  View, 
  Text, 
  Image, 
  Button, 
  StyleSheet, 
  Alert, 
  ScrollView, 
  TouchableOpacity 
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Picker } from '@react-native-picker/picker';

const CROP_TYPES = [
  'Select Crop Type',
  'Tomato',
  'Potato',
  'Corn',
  'Wheat',
  'Rice',
  'Soybean',
  'Cucumber',
  'Pepper',
  'Lettuce',
  'Cabbage',
  'Eggplant',
  'Other'
];

const PlantDiseaseDetectionScreen = () => {
  const [image, setImage] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [cropType, setCropType] = useState('Select Crop Type');
  const [diseaseSeverity, setDiseaseSeverity] = useState<string | null>(null);

  // Initialize Gemini AI with your API key
  const genAI = new GoogleGenerativeAI('AIzaSyBnaKP_EdrnAPH1qlR1nzAokz9DTrMnJDQ');

  // Request camera permissions
  const requestCameraPermissions = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissions', 'Camera permissions are required to take photos');
      return false;
    }
    return true;
  };

  // Take photo using camera
  const takePhoto = async () => {
    // Validate crop type selection
    if (cropType === 'Select Crop Type') {
      Alert.alert('Selection Required', 'Please select a crop type before taking a photo');
      return;
    }

    const hasPermission = await requestCameraPermissions();
    if (!hasPermission) return;

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      await analyzeImage(result.assets[0].uri);
    }
  };

  // Convert image to base64
  const convertImageToBase64 = async (imageUri: string): Promise<string> => {
    const response = await fetch(imageUri);
    const blob = await response.blob();
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result && typeof reader.result === 'string') {
          const base64data = reader.result.split(',')[1];
          resolve(base64data);
        } else {
          reject(new Error('Failed to read file'));
        }
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  // Determine disease severity
  const determineSeverity = (analysisText: string) => {
    const lowSeverityKeywords = ['mild', 'early stage', 'minimal', 'slight'];
    const highSeverityKeywords = ['severe', 'critical', 'advanced', 'extensive', 'urgent'];
    const mediumSeverityKeywords = ['moderate', 'developing', 'spreading'];

    const lowSeverityMatch = lowSeverityKeywords.some(keyword => 
      analysisText.toLowerCase().includes(keyword)
    );
    const highSeverityMatch = highSeverityKeywords.some(keyword => 
      analysisText.toLowerCase().includes(keyword)
    );
    const mediumSeverityMatch = mediumSeverityKeywords.some(keyword => 
      analysisText.toLowerCase().includes(keyword)
    );

    if (highSeverityMatch) return 'High';
    if (mediumSeverityMatch) return 'Medium';
    if (lowSeverityMatch) return 'Low';
    return 'Unknown';
  };

  // Analyze image using Gemini API
  const analyzeImage = async (imageUri: string) => {
    setIsLoading(true);
    setAnalysisResult(null);
    setDiseaseSeverity(null);

    try {
      // Convert image to base64
      const base64Image = await convertImageToBase64(imageUri);

      // Get the generative model
      const model = genAI.getGenerativeModel({ 
        model: "gemini-2.0-flash",
      });

      // Generate content with crop-specific context
      const result = await model.generateContent([
        `Analyze this ${cropType} plant image. Provide a comprehensive disease analysis with these specific details:
        1. Confirm the plant species (${cropType})
        2. Identify specific disease symptoms
        3. Potential disease type
        4. Severity of the disease
        5. Recommended immediate treatment steps
        6. Long-term management strategies
        Be as specific as possible to help the farmer take appropriate action. ans anser in short and simple sentences. wherever possible`,
        { 
          inlineData: { 
            mimeType: "image/jpeg", 
            data: base64Image 
          } 
        }
      ]);

      // Extract the response text
      const analysisText = result.response.text();
      
      // Determine severity
      const severity = determineSeverity(analysisText);
      
      setAnalysisResult(analysisText);
      setDiseaseSeverity(severity);
    } catch (error) {
      console.error('Error analyzing image:', error);
      Alert.alert('Error', 'Failed to analyze the image');
      setAnalysisResult('Analysis failed. Please check your internet connection and API key.');
    } finally {
      setIsLoading(false);
    }
  };

  // Severity color coding
  const getSeverityColor = (severity: 'High' | 'Medium' | 'Low' | string): string => {
    switch(severity) {
      case 'High': return '#FF4136';    // Red
      case 'Medium': return '#FF851B';  // Orange
      case 'Low': return '#2ECC40';     // Green
      default: return '#AAAAAA';        // Gray
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Crop Type Picker */}
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={cropType}
          onValueChange={(itemValue) => setCropType(itemValue)}
          style={styles.picker}
        >
          {CROP_TYPES.map((type, index) => (
            <Picker.Item key={index} label={type} value={type} />
          ))}
        </Picker>
      </View>

      {/* Take Photo Button */}
      <TouchableOpacity 
        style={styles.photoButton}
        onPress={takePhoto}
      >
        <Text style={styles.photoButtonText}>Take Plant Photo</Text>
      </TouchableOpacity>
      
      {/* Image Display */}
      {image && (
        <Image source={{ uri: image }} style={styles.image} />
      )}
      
      {/* Loading Indicator */}
      {isLoading && (
        <Text style={styles.loadingText}>Analyzing plant image...</Text>
      )}
      
      {/* Analysis Result */}
      {analysisResult && (
        <View style={styles.resultContainer}>
          {/* Severity Indicator */}
          {diseaseSeverity && (
            <View 
              style={[
                styles.severityBadge, 
                { backgroundColor: getSeverityColor(diseaseSeverity) }
              ]}
            >
              <Text style={styles.severityText}>
                Disease Severity: {diseaseSeverity}
              </Text>
            </View>
          )}

          {/* Detailed Analysis */}
          <Text style={styles.resultTitle}>Plant Disease Analysis:</Text>
          <Text style={styles.resultText}>{analysisResult}</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  pickerContainer: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: 'white',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  photoButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  photoButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    marginVertical: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#CCCCCC',
  },
  resultContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  severityBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginBottom: 10,
  },
  severityText: {
    color: 'white',
    fontWeight: 'bold',
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  resultText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#666',
  },
  loadingText: {
    marginTop: 20,
    fontSize: 16,
    color: 'gray',
  },
});

export default PlantDiseaseDetectionScreen;