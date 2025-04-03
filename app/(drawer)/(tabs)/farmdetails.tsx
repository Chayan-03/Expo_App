// // import React, { useState, useEffect } from 'react';
// // import { 
// //   View, 
// //   Text, 
// //   Image, 
// //   StyleSheet, 
// //   Alert, 
// //   ScrollView, 
// //   TouchableOpacity,
// //   Dimensions 
// // } from 'react-native';
// // import * as ImagePicker from 'expo-image-picker';
// // import { GoogleGenerativeAI } from "@google/generative-ai";
// // import { Picker } from '@react-native-picker/picker';
// // import { MaterialIcons } from '@expo/vector-icons';

// // // Farm simulation data (would typically come from IoT sensors)
// // const FARM_DATA = {
// //   soilMoisture: 65,  // percentage
// //   temperature: 28,   // celsius
// //   irrigationTimeLeft: 2.5, // hours
// //   lastUpdated: new Date().toLocaleString('en-IN', { 
// //     timeZone: 'Asia/Kolkata', 
// //     hour12: true 
// //   }),
// // };

// // const CROP_TYPES = [
// //   'फसल चुनें (Select Crop)',
// //   'टमाटर (Tomato)',
// //   'आलू (Potato)',
// //   'मक्का (Corn)',
// //   'गेहूँ (Wheat)',
// //   'चावल (Rice)',
// //   'सोयाबीन (Soybean)',
// //   'खीरा (Cucumber)',
// //   'मिर्च (Pepper)',
// //   'पत्ता गोभी (Lettuce)',
// //   'पत्ता गोभी (Cabbage)',
// //   'बैंगन (Eggplant)',
// //   'अन्य (Other)'
// // ];

// // const PlantDiseaseDetectionScreen = () => {
// //   const [image, setImage] = useState<string | null>(null);
// //   const [analysisResult, setAnalysisResult] = useState<string | null>(null);
// //   const [isLoading, setIsLoading] = useState(false);
// //   const [cropType, setCropType] = useState(CROP_TYPES[0]);
// //   const [diseaseSeverity, setDiseaseSeverity] = useState<string | null>(null);
// //   const [farmData, setFarmData] = useState(FARM_DATA);

 
// //   const genAI = new GoogleGenerativeAI('AIzaSyBnaKP_EdrnAPH1qlR1nzAokz9DTrMnJDQ');

// //   // Request camera permissions
// //   const requestCameraPermissions = async () => {
// //     const { status } = await ImagePicker.requestCameraPermissionsAsync();
// //     if (status !== 'granted') {
// //       Alert.alert('Permissions', 'Camera permissions are required to take photos');
// //       return false;
// //     }
// //     return true;
// //   };

// //   // Take photo using camera
// //   const takePhoto = async () => {
// //     // Validate crop type selection
// //     if (cropType === 'Select Crop Type') {
// //       Alert.alert('Selection Required', 'Please select a crop type before taking a photo');
// //       return;
// //     }

// //     const hasPermission = await requestCameraPermissions();
// //     if (!hasPermission) return;

// //     let result = await ImagePicker.launchCameraAsync({
// //       mediaTypes: ImagePicker.MediaTypeOptions.Images,
// //       allowsEditing: true,
// //       aspect: [4, 3],
// //       quality: 1,
// //     });

// //     if (!result.canceled) {
// //       setImage(result.assets[0].uri);
// //       await analyzeImage(result.assets[0].uri);
// //     }
// //   };

// //   // Convert image to base64
// //   const convertImageToBase64 = async (imageUri: string): Promise<string> => {
// //     const response = await fetch(imageUri);
// //     const blob = await response.blob();
// //     return new Promise<string>((resolve, reject) => {
// //       const reader = new FileReader();
// //       reader.onloadend = () => {
// //         if (reader.result && typeof reader.result === 'string') {
// //           const base64data = reader.result.split(',')[1];
// //           resolve(base64data);
// //         } else {
// //           reject(new Error('Failed to read file'));
// //         }
// //       };
// //       reader.onerror = reject;
// //       reader.readAsDataURL(blob);
// //     });
// //   };

// //   // Determine disease severity
// //   const determineSeverity = (analysisText: string) => {
// //     const lowSeverityKeywords = ['mild', 'early stage', 'minimal', 'slight'];
// //     const highSeverityKeywords = ['severe', 'critical', 'advanced', 'extensive', 'urgent'];
// //     const mediumSeverityKeywords = ['moderate', 'developing', 'spreading'];

// //     const lowSeverityMatch = lowSeverityKeywords.some(keyword => 
// //       analysisText.toLowerCase().includes(keyword)
// //     );
// //     const highSeverityMatch = highSeverityKeywords.some(keyword => 
// //       analysisText.toLowerCase().includes(keyword)
// //     );
// //     const mediumSeverityMatch = mediumSeverityKeywords.some(keyword => 
// //       analysisText.toLowerCase().includes(keyword)
// //     );

// //     if (highSeverityMatch) return 'High';
// //     if (mediumSeverityMatch) return 'Medium';
// //     if (lowSeverityMatch) return 'Low';
// //     return 'Unknown';
// //   };

// //   // Analyze image using Gemini API
// //   const analyzeImage = async (imageUri: string) => {
// //     setIsLoading(true);
// //     setAnalysisResult(null);
// //     setDiseaseSeverity(null);

// //     try {
// //       // Convert image to base64
// //       const base64Image = await convertImageToBase64(imageUri);

// //       // Get the generative model
// //       const model = genAI.getGenerativeModel({ 
// //         model: "gemini-2.0-flash",
// //       });

// //       // Generate content with crop-specific context
// //       const result = await model.generateContent([
// //         `Analyze this ${cropType} plant image. Provide a comprehensive disease analysis with these specific details:
// //         1. Confirm the plant species (${cropType})
// //         2. Identify specific disease symptoms
// //         3. Potential disease type
// //         4. Severity of the disease
// //         5. Recommended immediate treatment steps
// //         6. Long-term management strategies
// //         Be as specific as possible to help the farmer take appropriate action. ans anser in short and simple sentences. wherever possible`,
// //         { 
// //           inlineData: { 
// //             mimeType: "image/jpeg", 
// //             data: base64Image 
// //           } 
// //         }
// //       ]);

// //       // Extract the response text
// //       const analysisText = result.response.text();
      
// //       // Determine severity
// //       const severity = determineSeverity(analysisText);
      
// //       setAnalysisResult(analysisText);
// //       setDiseaseSeverity(severity);
// //     } catch (error) {
// //       console.error('Error analyzing image:', error);
// //       Alert.alert('Error', 'Failed to analyze the image');
// //       setAnalysisResult('Analysis failed. Please check your internet connection and API key.');
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   // Severity color coding
// //   const getSeverityColor = (severity: 'High' | 'Medium' | 'Low' | string): string => {
// //     switch(severity) {
// //       case 'High': return '#FF4136';    // Red
// //       case 'Medium': return '#FF851B';  // Orange
// //       case 'Low': return '#2ECC40';     // Green
// //       default: return '#AAAAAA';        // Gray
// //     }
// //   };

// //   // Mock function to simulate farm data updates (would be replaced by real IoT sensor data)
// //   const updateFarmData = () => {
// //     // Simulating slight variations in farm data
// //     setFarmData({
// //       soilMoisture: Math.max(30, Math.min(90, FARM_DATA.soilMoisture + (Math.random() * 10 - 5))),
// //       temperature: Math.max(20, Math.min(40, FARM_DATA.temperature + (Math.random() * 2 - 1))),
// //       irrigationTimeLeft: Math.max(0, FARM_DATA.irrigationTimeLeft - 0.1),
// //       lastUpdated: new Date().toLocaleString('en-IN', { 
// //         timeZone: 'Asia/Kolkata', 
// //         hour12: true 
// //       }),
// //     });
// //   };

// //   useEffect(() => {
// //     // Update farm data periodically
// //     const intervalId = setInterval(updateFarmData, 5000);
// //     return () => clearInterval(intervalId);
// //   }, []);

// //   // Render farm data card
// //   const renderFarmDataCard = () => {
// //     return (
// //       <View style={styles.farmDataContainer}>
// //         <Text style={styles.farmDataTitle}>🚜 फार्म की स्थिति (Farm Status)</Text>
// //         <View style={styles.farmDataGrid}>
// //           <View style={styles.farmDataItem}>
// //             <MaterialIcons name="opacity" size={24} color="#2196F3" />
// //             <Text style={styles.farmDataLabel}>मिट्टी की नमी</Text>
// //             <Text style={styles.farmDataValue}>
// //               {farmData.soilMoisture.toFixed(0)}%
// //             </Text>
// //           </View>
// //           <View style={styles.farmDataItem}>
// //             <MaterialIcons name="thermostat" size={24} color="#FF5722" />
// //             <Text style={styles.farmDataLabel}>तापमान</Text>
// //             <Text style={styles.farmDataValue}>
// //               {farmData.temperature.toFixed(1)}°C
// //             </Text>
// //           </View>
// //           <View style={styles.farmDataItem}>
// //             <MaterialIcons name="water-drop" size={24} color="#03A9F4" />
// //             <Text style={styles.farmDataLabel}>सिंचाई</Text>
// //             <Text style={styles.farmDataValue}>
// //               {farmData.irrigationTimeLeft.toFixed(1)} घंटे
// //             </Text>
// //           </View>
// //         </View>
// //         <Text style={styles.lastUpdatedText}>
// //           अंतिम अपडेट: {farmData.lastUpdated}
// //         </Text>
// //       </View>
// //     );
// //   };

// //   return (
// //     <ScrollView 
// //       contentContainerStyle={styles.container}
// //       showsVerticalScrollIndicator={false}
// //     >
// //       {/* Farm Data Card */}
// //       {renderFarmDataCard()}

// //       {/* Crop Type Picker with Bilingual Labels */}
// //       <View style={styles.pickerContainer}>
// //         <Text style={styles.pickerLabel}>फसल चुनें (Select Crop)</Text>
// //         <Picker
// //           selectedValue={cropType}
// //           onValueChange={(itemValue) => setCropType(itemValue)}
// //           style={styles.picker}
// //         >
// //           {CROP_TYPES.map((type, index) => (
// //             <Picker.Item key={index} label={type} value={type} />
// //           ))}
// //         </Picker>
// //       </View>

// //       {/* Take Photo Button with Icon */}
// //       <TouchableOpacity 
// //         style={styles.photoButton}
// //         onPress={takePhoto}
// //       >
// //         <MaterialIcons name="photo-camera" size={24} color="white" />
// //         <Text style={styles.photoButtonText}>पौधे की फोटो खींचें (Take Plant Photo)</Text>
// //       </TouchableOpacity>
      
// //        {image && (
// //         <Image source={{ uri: image }} style={styles.image} />
// //       )}
      
// //       {/* Loading Indicator */}
// //       {isLoading && (
// //         <Text style={styles.loadingText}>Analyzing plant image...</Text>
// //       )}
      
// //       {/* Analysis Result */}
// //       {analysisResult && (
// //         <View style={styles.resultContainer}>
// //           {/* Severity Indicator */}
// //           {diseaseSeverity && (
// //             <View 
// //               style={[
// //                 styles.severityBadge, 
// //                 { backgroundColor: getSeverityColor(diseaseSeverity) }
// //               ]}
// //             >
// //               <Text style={styles.severityText}>
// //                 Disease Severity: {diseaseSeverity}
// //               </Text>
// //             </View>
// //           )}

// //           {/* Detailed Analysis */}
// //           <Text style={styles.resultTitle}>Plant Disease Analysis:</Text>
// //           <Text style={styles.resultText}>{analysisResult}</Text>
// //         </View>
// //       )}
// //     </ScrollView>
// //   );
      
   
  
// // };

// // const { width } = Dimensions.get('window');

// // const styles = StyleSheet.create({
// //   container: {
// //     flexGrow: 1,
// //     alignItems: 'center',
// //     padding: 20,
// //     backgroundColor: '#F0F4F8',
// //   },
// //   farmDataContainer: {
// //     width: '100%',
// //     backgroundColor: 'white',
// //     borderRadius: 15,
// //     padding: 15,
// //     marginBottom: 20,
// //     shadowColor: '#000',
// //     shadowOffset: { width: 0, height: 4 },
// //     shadowOpacity: 0.1,
// //     shadowRadius: 6,
// //     elevation: 5,
// //   },
// //   farmDataTitle: {
// //     fontSize: 18,
// //     fontWeight: 'bold',
// //     marginBottom: 15,
// //     color: '#333',
// //     textAlign: 'center',
// //   },
// //   farmDataGrid: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-between',
// //   },
// //   farmDataItem: {
// //     alignItems: 'center',
// //     flex: 1,
// //   },
// //   farmDataLabel: {
// //     marginTop: 5,
// //     fontSize: 14,
// //     color: '#666',
// //   },
// //   farmDataValue: {
// //     fontSize: 16,
// //     fontWeight: 'bold',
// //     color: '#333',
// //   },
// //   lastUpdatedText: {
// //     marginTop: 10,
// //     textAlign: 'center',
// //     color: '#999',
// //     fontSize: 12,
// //   },
// //   pickerContainer: {
// //     width: '100%',
// //     backgroundColor: 'white',
// //     borderRadius: 10,
// //     marginBottom: 20,
// //     shadowColor: '#000',
// //     shadowOffset: { width: 0, height: 2 },
// //     shadowOpacity: 0.1,
// //     shadowRadius: 4,
// //     elevation: 3,
// //   },
// //   pickerLabel: {
// //     paddingHorizontal: 15,
// //     paddingTop: 10,
// //     fontSize: 16,
// //     color: '#333',
// //     fontWeight: 'bold',
// //   },
// //   picker: {
// //     height: 50,
// //     width: '100%',
// //   },
// //   photoButton: {
// //     backgroundColor: '#4CAF50',
// //     padding: 15,
// //     borderRadius: 10,
// //     width: '100%',
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //     marginBottom: 20,
// //     shadowColor: '#000',
// //     shadowOffset: { width: 0, height: 2 },
// //     shadowOpacity: 0.2,
// //     shadowRadius: 4,
// //     elevation: 3,
// //   },
// //   photoButtonText: {
// //     color: 'white',
// //     fontSize: 16,
// //     fontWeight: 'bold',
// //     marginLeft: 10,
// //   },
  
// //       image: {
// //         width: 300,
// //         height: 300,
// //         resizeMode: 'contain',
// //         marginVertical: 20,
// //         borderRadius: 10,
// //         borderWidth: 1,
// //         borderColor: '#CCCCCC',
// //       },
// //       resultContainer: {
// //         marginTop: 20,
// //         padding: 15,
// //         backgroundColor: 'white',
// //         borderRadius: 10,
// //         width: '100%',
// //         shadowColor: '#000',
// //         shadowOffset: { width: 0, height: 2 },
// //         shadowOpacity: 0.1,
// //         shadowRadius: 4,
// //         elevation: 3,
// //       },
// //       severityBadge: {
// //         alignSelf: 'flex-start',
// //         paddingHorizontal: 10,
// //         paddingVertical: 5,
// //         borderRadius: 5,
// //         marginBottom: 10,
// //       },
// //       severityText: {
// //         color: 'white',
// //         fontWeight: 'bold',
// //       },
// //       resultTitle: {
// //         fontSize: 18,
// //         fontWeight: 'bold',
// //         marginBottom: 10,
// //         color: '#333',
// //       },
// //       resultText: {
// //         fontSize: 16,
// //         lineHeight: 24,
// //         color: '#666',
// //       },
// //       loadingText: {
// //         marginTop: 20,
// //         fontSize: 16,
// //         color: 'gray',
// //       },
 
// // });

// // export default PlantDiseaseDetectionScreen;





// import React, { useState, useEffect } from 'react';
// import { 
//   View, 
//   Text, 
//   Image, 
//   StyleSheet, 
//   Alert, 
//   ScrollView, 
//   TouchableOpacity,
//   Dimensions 
// } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';
// import { GoogleGenerativeAI } from "@google/generative-ai";
// import { Picker } from '@react-native-picker/picker';
// import { MaterialIcons } from '@expo/vector-icons';
// import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

// const { width } = Dimensions.get('window');

// // Farm simulation data
// const FARM_DATA = {
//   soilMoisture: 65,
//   temperature: 28,
//   irrigationTimeLeft: 2.5,
//   lastUpdated: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', hour12: true }),
// };

// const CROP_TYPES = [
//   'फसल चुनें (Select Crop)',
//   'टमाटर (Tomato)',
//   'आलू (Potato)',
//   'मक्का (Corn)',
//   'गेहूँ (Wheat)',
//   'चावल (Rice)',
//   'सोयाबीन (Soybean)',
//   'खीरा (Cucumber)',
//   'मिर्च (Pepper)',
//   'पत्ता गोभी (Lettuce)',
//   'पत्ता गोभी (Cabbage)',
//   'बैंगन (Eggplant)',
//   'अन्य (Other)',
// ];

// // Parser function to clean AI response
// const parseAnalysisResponse = (text: string): string => {
//   return text
//     .replace(/\*\*\*/g, '') // Remove triple asterisks
//     .replace(/\*\*/g, '')   // Remove double asterisks
//     .replace(/\*/g, '')     // Remove single asterisks
//     .replace(/#{1,6}\s/g, '') // Remove markdown headings
//     .replace(/\n\s*\n/g, '\n') // Remove excessive newlines
//     .replace(/^(\d+\.\s)/gm, '• ') // Replace numbered lists with bullets for simplicity
//     .trim();
// };

// const PlantDiseaseDetectionScreen = () => {
//   const [image, setImage] = useState<string | null>(null);
//   const [analysisResult, setAnalysisResult] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [cropType, setCropType] = useState(CROP_TYPES[0]);
//   const [diseaseSeverity, setDiseaseSeverity] = useState<string | null>(null);
//   const [farmData, setFarmData] = useState(FARM_DATA);

//   const genAI = new GoogleGenerativeAI('AIzaSyBnaKP_EdrnAPH1qlR1nzAokz9DTrMnJDQ');

//   const requestCameraPermissions = async () => {
//     const { status } = await ImagePicker.requestCameraPermissionsAsync();
//     if (status !== 'granted') {
//       Alert.alert('Permissions', 'Camera permissions are required to take photos');
//       return false;
//     }
//     return true;
//   };

//   const takePhoto = async () => {
//     if (cropType === CROP_TYPES[0]) {
//       Alert.alert('Selection Required', 'Please select a crop type before taking a photo');
//       return;
//     }

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

//   const convertImageToBase64 = async (imageUri: string): Promise<string> => {
//     const response = await fetch(imageUri);
//     const blob = await response.blob();
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.onloadend = () => reader.result && typeof reader.result === 'string' 
//         ? resolve(reader.result.split(',')[1]) 
//         : reject(new Error('Failed to read file'));
//       reader.onerror = reject;
//       reader.readAsDataURL(blob);
//     });
//   };

//   const determineSeverity = (analysisText: string) => {
//     const lowSeverityKeywords = ['mild', 'early stage', 'minimal', 'slight'];
//     const highSeverityKeywords = ['severe', 'critical', 'advanced', 'extensive', 'urgent'];
//     const mediumSeverityKeywords = ['moderate', 'developing', 'spreading'];

//     const lowSeverityMatch = lowSeverityKeywords.some(keyword => analysisText.toLowerCase().includes(keyword));
//     const highSeverityMatch = highSeverityKeywords.some(keyword => analysisText.toLowerCase().includes(keyword));
//     const mediumSeverityMatch = mediumSeverityKeywords.some(keyword => analysisText.toLowerCase().includes(keyword));

//     if (highSeverityMatch) return 'High';
//     if (mediumSeverityMatch) return 'Medium';
//     if (lowSeverityMatch) return 'Low';
//     return 'Unknown';
//   };

//   const analyzeImage = async (imageUri: string) => {
//     setIsLoading(true);
//     setAnalysisResult(null);
//     setDiseaseSeverity(null);

//     try {
//       const base64Image = await convertImageToBase64(imageUri);
//       const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

//       const result = await model.generateContent([
//         `Analyze this ${cropType} plant image. Provide a comprehensive disease analysis with these specific details:
//         1. Confirm the plant species (${cropType})
//         2. Identify specific disease symptoms
//         3. Potential disease type
//         4. Severity of the disease
//         5. Recommended immediate treatment steps
//         6. Long-term management strategies
//         Be as specific as possible to help the farmer take appropriate action. Answer in short and simple sentences.`,
//         { inlineData: { mimeType: "image/jpeg", data: base64Image } }
//       ]);

//       const rawAnalysisText = result.response.text();
//       const parsedAnalysisText = parseAnalysisResponse(rawAnalysisText); // Apply parser
//       const severity = determineSeverity(parsedAnalysisText);

//       setAnalysisResult(parsedAnalysisText);
//       setDiseaseSeverity(severity);
//     } catch (error) {
//       console.error('Error analyzing image:', error);
//       Alert.alert('Error', 'Failed to analyze the image');
//       setAnalysisResult('Analysis failed. Please check your internet connection and API key.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const getSeverityColor = (severity: string): string => {
//     switch (severity) {
//       case 'High': return '#FF4136';
//       case 'Medium': return '#FF851B';
//       case 'Low': return '#2ECC40';
//       default: return '#AAAAAA';
//     }
//   };

//   const updateFarmData = () => {
//     setFarmData({
//       soilMoisture: Math.max(30, Math.min(90, FARM_DATA.soilMoisture + (Math.random() * 10 - 5))),
//       temperature: Math.max(20, Math.min(40, FARM_DATA.temperature + (Math.random() * 2 - 1))),
//       irrigationTimeLeft: Math.max(0, FARM_DATA.irrigationTimeLeft - 0.1),
//       lastUpdated: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', hour12: true }),
//     });
//   };

//   useEffect(() => {
//     const intervalId = setInterval(updateFarmData, 5000);
//     return () => clearInterval(intervalId);
//   }, []);

//   const renderFarmDataCard = () => (
//     <View style={styles.farmDataContainer}>
//       <Text style={styles.farmDataTitle}>🚜 फार्म की स्थिति (Farm Status)</Text>
//       <View style={styles.farmDataGrid}>
//         <View style={styles.farmDataItem}>
//           <MaterialIcons name="opacity" size={24} color="#2196F3" />
//           <Text style={styles.farmDataLabel}>मिट्टी की नमी</Text>
//           <Text style={styles.farmDataValue}>{farmData.soilMoisture.toFixed(0)}%</Text>
//         </View>
//         <View style={styles.farmDataItem}>
//           <MaterialIcons name="thermostat" size={24} color="#FF5722" />
//           <Text style={styles.farmDataLabel}>तापमान</Text>
//           <Text style={styles.farmDataValue}>{farmData.temperature.toFixed(1)}°C</Text>
//         </View>
//         <View style={styles.farmDataItem}>
//           <MaterialIcons name="water-drop" size={24} color="#03A9F4" />
//           <Text style={styles.farmDataLabel}>सिंचाई</Text>
//           <Text style={styles.farmDataValue}>{farmData.irrigationTimeLeft.toFixed(1)} घंटे</Text>
//         </View>
//       </View>
//       <Text style={styles.lastUpdatedText}>अंतिम अपडेट: {farmData.lastUpdated}</Text>
//     </View>
//   );

//   return (
//     <View style={styles.screenContainer}>
//       {/* Header */}
//       <View style={styles.header}>
//         <Text style={styles.headerTitle}>🌱 पौधे की बीमारी जांच (Plant Disease Detection)</Text>
//       </View>

//       <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
//         {renderFarmDataCard()}

//         <View style={styles.pickerContainer}>
//           <Text style={styles.pickerLabel}>फसल चुनें (Select Crop)</Text>
//           <Picker
//             selectedValue={cropType}
//             onValueChange={(itemValue) => setCropType(itemValue)}
//             style={styles.picker}
//           >
//             {CROP_TYPES.map((type, index) => (
//               <Picker.Item key={index} label={type} value={type} />
//             ))}
//           </Picker>
//         </View>

//         <TouchableOpacity style={styles.photoButton} onPress={takePhoto}>
//           <MaterialIcons name="photo-camera" size={24} color="white" />
//           <Text style={styles.photoButtonText}>पौधे की फोटो खींचें (Take Plant Photo)</Text>
//         </TouchableOpacity>

//         {image && <Image source={{ uri: image }} style={styles.image} />}

//         {isLoading && <Text style={styles.loadingText}>Analyzing plant image...</Text>}

//         {analysisResult && (
//           <Animated.View entering={FadeIn} exiting={FadeOut} style={styles.resultContainer}>
//             {diseaseSeverity && (
//               <View style={[styles.severityBadge, { backgroundColor: getSeverityColor(diseaseSeverity) }]}>
//                 <Text style={styles.severityText}>Disease Severity: {diseaseSeverity}</Text>
//               </View>
//             )}
//             <Text style={styles.resultTitle}>Plant Disease Analysis:</Text>
//             <Text style={styles.resultText}>{analysisResult}</Text>
//           </Animated.View>
//         )}
//       </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   screenContainer: {
//     flex: 1,
//     backgroundColor: '#F0F4F8',
//   },
//   header: {
//     paddingTop: 50,
//     paddingBottom: 15,
//     backgroundColor: '#4CAF50',
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     elevation: 5,
//   },
//   headerTitle: {
//     color: 'white',
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   container: {
//     flexGrow: 1,
//     padding: 20,
//     alignItems: 'center',
//   },
//   farmDataContainer: {
//     width: '100%',
//     backgroundColor: 'white',
//     borderRadius: 15,
//     padding: 15,
//     marginBottom: 20,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.1,
//     shadowRadius: 6,
//     elevation: 5,
//   },
//   farmDataTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 15,
//     color: '#333',
//     textAlign: 'center',
//   },
//   farmDataGrid: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   farmDataItem: {
//     alignItems: 'center',
//     flex: 1,
//   },
//   farmDataLabel: {
//     marginTop: 5,
//     fontSize: 14,
//     color: '#666',
//   },
//   farmDataValue: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   lastUpdatedText: {
//     marginTop: 10,
//     textAlign: 'center',
//     color: '#999',
//     fontSize: 12,
//   },
//   pickerContainer: {
//     width: '100%',
//     backgroundColor: 'white',
//     borderRadius: 10,
//     marginBottom: 20,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   pickerLabel: {
//     paddingHorizontal: 15,
//     paddingTop: 10,
//     fontSize: 16,
//     color: '#333',
//     fontWeight: 'bold',
//   },
//   picker: {
//     height: 50,
//     width: '100%',
//   },
//   photoButton: {
//     backgroundColor: '#4CAF50',
//     padding: 15,
//     borderRadius: 10,
//     width: '100%',
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginBottom: 20,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3,
//     shadowRadius: 5,
//     elevation: 6,
//   },
//   photoButtonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginLeft: 10,
//   },
//   image: {
//     width: width * 0.8,
//     height: width * 0.6,
//     resizeMode: 'contain',
//     marginVertical: 20,
//     borderRadius: 10,
//     borderWidth: 1,
//     borderColor: '#CCCCCC',
//   },
//   loadingText: {
//     marginTop: 20,
//     fontSize: 16,
//     color: '#666',
//     fontStyle: 'italic',
//   },
//   resultContainer: {
//     marginTop: 20,
//     padding: 20,
//     backgroundColor: 'white',
//     borderRadius: 15,
//     width: '100%',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   severityBadge: {
//     alignSelf: 'flex-start',
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//     borderRadius: 8,
//     marginBottom: 15,
//   },
//   severityText: {
//     color: 'white',
//     fontWeight: 'bold',
//     fontSize: 14,
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
//     color: '#555',
//   },
// });

// export default PlantDiseaseDetectionScreen;






import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  Image, 
  StyleSheet, 
  Alert, 
  ScrollView, 
  TouchableOpacity,
  Dimensions 
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Picker } from '@react-native-picker/picker';
import { MaterialIcons } from '@expo/vector-icons';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

const FARM_DATA = {
  soilMoisture: 65,
  temperature: 28,
  irrigationTimeLeft: 2.5,
  lastUpdated: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', hour12: true }),
};

const CROP_TYPES = [
  'फसल चुनें (Select Crop)',
  'टमाटर (Tomato)',
  'आलू (Potato)',
  'मक्का (Corn)',
  'गेहूँ (Wheat)',
  'चावल (Rice)',
  'सोयाबीन (Soybean)',
  'खीरा (Cucumber)',
  'मिर्च (Pepper)',
  'पत्ता गोभी (Lettuce)',
  'पत्ता गोभी (Cabbage)',
  'बैंगन (Eggplant)',
  'अन्य (Other)',
];

const parseAnalysisResponse = (text: string): string => {
  return text
    .replace(/\*\*\*/g, '')
    .replace(/\*\*/g, '')
    .replace(/\*/g, '')
    .replace(/#{1,6}\s/g, '')
    .replace(/\n\s*\n/g, '\n')
    .replace(/^(\d+\.\s)/gm, '• ')
    .trim();
};

const PlantDiseaseDetectionScreen = () => {
  const [image, setImage] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [cropType, setCropType] = useState(CROP_TYPES[0]);
  const [diseaseSeverity, setDiseaseSeverity] = useState<string | null>(null);
  const [farmData, setFarmData] = useState(FARM_DATA);
  const [language, setLanguage] = useState<'hi' | 'en'>('hi'); // Language state

  const genAI = new GoogleGenerativeAI('AIzaSyBnaKP_EdrnAPH1qlR1nzAokz9DTrMnJDQ');

  const requestCameraPermissions = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        language === 'hi' ? 'अनुमति' : 'Permissions',
        language === 'hi' ? 'फोटो लेने के लिए कैमरा अनुमति आवश्यक है' : 'Camera permissions are required to take photos'
      );
      return false;
    }
    return true;
  };

  const takePhoto = async () => {
    if (cropType === CROP_TYPES[0]) {
      Alert.alert(
        language === 'hi' ? 'चयन आवश्यक' : 'Selection Required',
        language === 'hi' ? 'फोटो लेने से पहले फसल का प्रकार चुनें' : 'Please select a crop type before taking a photo'
      );
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

  const convertImageToBase64 = async (imageUri: string): Promise<string> => {
    const response = await fetch(imageUri);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => reader.result && typeof reader.result === 'string' 
        ? resolve(reader.result.split(',')[1]) 
        : reject(new Error('Failed to read file'));
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  const determineSeverity = (analysisText: string) => {
    const lowSeverityKeywords = ['mild', 'early stage', 'minimal', 'slight'];
    const highSeverityKeywords = ['severe', 'critical', 'advanced', 'extensive', 'urgent'];
    const mediumSeverityKeywords = ['moderate', 'developing', 'spreading'];

    const lowSeverityMatch = lowSeverityKeywords.some(keyword => analysisText.toLowerCase().includes(keyword));
    const highSeverityMatch = highSeverityKeywords.some(keyword => analysisText.toLowerCase().includes(keyword));
    const mediumSeverityMatch = mediumSeverityKeywords.some(keyword => analysisText.toLowerCase().includes(keyword));

    if (highSeverityMatch) return 'High';
    if (mediumSeverityMatch) return 'Medium';
    if (lowSeverityMatch) return 'Low';
    return 'Unknown';
  };

  const analyzeImage = async (imageUri: string) => {
    setIsLoading(true);
    setAnalysisResult(null);
    setDiseaseSeverity(null);

    try {
      const base64Image = await convertImageToBase64(imageUri);
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

      const prompt = language === 'hi'
        ? `इस ${cropType} पौधे की छवि का विश्लेषण करें। निम्नलिखित विशिष्ट विवरणों के साथ व्यापक बीमारी विश्लेषण प्रदान करें:
          1. पौधे की प्रजाति की पुष्टि करें (${cropType})
          2. विशिष्ट बीमारी के लक्षणों की पहचान करें
          3. संभावित बीमारी का प्रकार
          4. बीमारी की गंभीरता
          5. तत्काल उपचार के कदमों की सिफारिश करें
          6. दीर्घकालिक प्रबंधन रणनीतियाँ
          किसान को उचित कार्रवाई करने में मदद करने के लिए जितना संभव हो उतना विशिष्ट रहें। छोटे और सरल वाक्यों में उत्तर दें।`
        : `Analyze this ${cropType} plant image. Provide a comprehensive disease analysis with these specific details:
          1. Confirm the plant species (${cropType})
          2. Identify specific disease symptoms
          3. Potential disease type
          4. Severity of the disease
          5. Recommended immediate treatment steps
          6. Long-term management strategies
          Be as specific as possible to help the farmer take appropriate action. Answer in short and simple sentences.`;

      const result = await model.generateContent([
        prompt,
        { inlineData: { mimeType: "image/jpeg", data: base64Image } }
      ]);

      const rawAnalysisText = result.response.text();
      const parsedAnalysisText = parseAnalysisResponse(rawAnalysisText);
      const severity = determineSeverity(parsedAnalysisText);

      setAnalysisResult(parsedAnalysisText);
      setDiseaseSeverity(severity);
    } catch (error) {
      console.error('Error analyzing image:', error);
      Alert.alert(
        language === 'hi' ? 'त्रुटि' : 'Error',
        language === 'hi' ? 'छवि का विश्लेषण करने में विफल' : 'Failed to analyze the image'
      );
      setAnalysisResult(language === 'hi' 
        ? 'विश्लेषण विफल। कृपया अपना इंटरनेट कनेक्शन और API कुंजी जांचें।' 
        : 'Analysis failed. Please check your internet connection and API key.');
    } finally {
      setIsLoading(false);
    }
  };

  const getSeverityColor = (severity: string): string => {
    switch (severity) {
      case 'High': return '#FF4136';
      case 'Medium': return '#FF851B';
      case 'Low': return '#2ECC40';
      default: return '#AAAAAA';
    }
  };

  const updateFarmData = () => {
    setFarmData({
      soilMoisture: Math.max(30, Math.min(90, FARM_DATA.soilMoisture + (Math.random() * 10 - 5))),
      temperature: Math.max(20, Math.min(40, FARM_DATA.temperature + (Math.random() * 2 - 1))),
      irrigationTimeLeft: Math.max(0, FARM_DATA.irrigationTimeLeft - 0.1),
      lastUpdated: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', hour12: true }),
    });
  };

  useEffect(() => {
    const intervalId = setInterval(updateFarmData, 5000);
    return () => clearInterval(intervalId);
  }, []);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'hi' ? 'en' : 'hi');
  };

  const renderFarmDataCard = () => (
    <View style={styles.farmDataContainer}>
      <Text style={styles.farmDataTitle}>
        {language === 'hi' ? '🚜 फार्म की स्थिति' : '🚜 Farm Status'}
      </Text>
      <View style={styles.farmDataGrid}>
        <View style={styles.farmDataItem}>
          <MaterialIcons name="opacity" size={24} color="#2196F3" />
          <Text style={styles.farmDataLabel}>
            {language === 'hi' ? 'मिट्टी की नमी' : 'Soil Moisture'}
          </Text>
          <Text style={styles.farmDataValue}>{farmData.soilMoisture.toFixed(0)}%</Text>
        </View>
        <View style={styles.farmDataItem}>
          <MaterialIcons name="thermostat" size={24} color="#FF5722" />
          <Text style={styles.farmDataLabel}>
            {language === 'hi' ? 'तापमान' : 'Temperature'}
          </Text>
          <Text style={styles.farmDataValue}>{farmData.temperature.toFixed(1)}°C</Text>
        </View>
        <View style={styles.farmDataItem}>
          <MaterialIcons name="water-drop" size={24} color="#03A9F4" />
          <Text style={styles.farmDataLabel}>
            {language === 'hi' ? 'सिंचाई' : 'Irrigation'}
          </Text>
          <Text style={styles.farmDataValue}>{farmData.irrigationTimeLeft.toFixed(1)} {language === 'hi' ? 'घंटे' : 'hours'}</Text>
        </View>
      </View>
      <Text style={styles.lastUpdatedText}>
        {language === 'hi' ? `अंतिम अपडेट: ${farmData.lastUpdated}` : `Last Updated: ${farmData.lastUpdated}`}
      </Text>
    </View>
  );

  return (
    <View style={styles.screenContainer}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          {language === 'hi' ? '🌱 पौधे की बीमारी जांच' : '🌱 Plant Disease Detection'}
        </Text>
        <TouchableOpacity onPress={toggleLanguage} style={styles.languageToggle}>
          <Text style={styles.languageToggleText}>{language === 'hi' ? 'EN' : 'हिं'}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {renderFarmDataCard()}

        <View style={styles.pickerContainer}>
          <Text style={styles.pickerLabel}>
            {language === 'hi' ? 'फसल चुनें' : 'Select Crop'}
          </Text>
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

        <TouchableOpacity style={styles.photoButton} onPress={takePhoto}>
          <MaterialIcons name="photo-camera" size={24} color="white" />
          <Text style={styles.photoButtonText}>
            {language === 'hi' ? 'पौधे की फोटो खींचें' : 'Take Plant Photo'}
          </Text>
        </TouchableOpacity>

        {image && <Image source={{ uri: image }} style={styles.image} />}

        {isLoading && (
          <Text style={styles.loadingText}>
            {language === 'hi' ? 'पौधे की छवि का विश्लेषण हो रहा है...' : 'Analyzing plant image...'}
          </Text>
        )}

        {analysisResult && (
          <Animated.View entering={FadeIn} exiting={FadeOut} style={styles.resultContainer}>
            {diseaseSeverity && (
              <View style={[styles.severityBadge, { backgroundColor: getSeverityColor(diseaseSeverity) }]}>
                <Text style={styles.severityText}>
                  {language === 'hi' ? `बीमारी की गंभीरता: ${diseaseSeverity}` : `Disease Severity: ${diseaseSeverity}`}
                </Text>
              </View>
            )}
            <Text style={styles.resultTitle}>
              {language === 'hi' ? 'पौधे की बीमारी विश्लेषण:' : 'Plant Disease Analysis:'}
            </Text>
            <Text style={styles.resultText}>{analysisResult}</Text>
          </Animated.View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#F0F4F8',
  },
  header: {
    paddingTop: 20,
    paddingBottom: 15,
    backgroundColor: '#4CAF50',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 5,
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  languageToggle: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  languageToggleText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  container: {
    flexGrow: 1,
    padding: 20,
    alignItems: 'center',
  },
  farmDataContainer: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  farmDataTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
    textAlign: 'center',
  },
  farmDataGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  farmDataItem: {
    alignItems: 'center',
    flex: 1,
  },
  farmDataLabel: {
    marginTop: 5,
    fontSize: 14,
    color: '#666',
  },
  farmDataValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  lastUpdatedText: {
    marginTop: 10,
    textAlign: 'center',
    color: '#999',
    fontSize: 12,
  },
  pickerContainer: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  pickerLabel: {
    paddingHorizontal: 15,
    paddingTop: 10,
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  picker: {
    height: 60,
    width: '100%',
  },
  photoButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  photoButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  image: {
    width: width * 0.8,
    height: width * 0.6,
    resizeMode: 'contain',
    marginVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#CCCCCC',
  },
  loadingText: {
    marginTop: 20,
    fontSize: 16,
    color: '#666',
    fontStyle: 'italic',
  },
  resultContainer: {
    marginTop: 20,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 15,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  severityBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginBottom: 15,
  },
  severityText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
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
    color: '#555',
  },
});

export default PlantDiseaseDetectionScreen;