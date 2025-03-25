// import React, { useState, useEffect } from 'react';
// import { 
//   View, 
//   Text, 
//   StyleSheet, 
//   ScrollView, 
//   ActivityIndicator, 
//   TouchableOpacity, 
//   Image 
// } from 'react-native';
// import LottieView from 'lottie-react-native';
// import { Card } from '@/components/ui/card';
// import { ChevronRight, Cloud, Sun, Droplet, Wind } from 'lucide-react';

// // Mock data for MSP and Crops (would typically come from an API)
// const MOCK_MSP_DATA = [
//   { crop: 'Wheat', msp: '₹2275/quintal', change: '+2.3%' },
//   { crop: 'Rice', msp: '₹1940/quintal', change: '+1.5%' },
//   { crop: 'Cotton', msp: '₹5450/quintal', change: '+3.1%' },
// ];

// const MOCK_FARMER_CROPS = [
//   { name: 'Wheat', area: '5 acres', expectedYield: '75 quintals' },
//   { name: 'Cotton', area: '3 acres', expectedYield: '45 quintals' },
// ];

// const HomeScreen = () => {
//   interface WeatherData {
//     current: {
//       condition: {
//         text: string;
//       };
//       humidity: number;
//       wind_kph: number;
//       temp_c: number;
//     };
//   }
  
//   const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
//   const [loading, setLoading] = useState(true);

//   const fetchWeather = async () => {
//     try {
//       const response = await fetch(
//         `https://api.weatherapi.com/v1/forecast.json?key=YOUR_API_KEY&q=New Delhi&days=3`
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
//     if (condition.includes('sun') || condition.includes('Sunny')) {
//       return require('@/assets/lottie/cloud.json');
//     } else if (condition.includes('rain') || condition.includes('Rain')) {
//       return require('@/assets/lottie/rain.json');
//     } else if (condition.includes('cloud') || condition.includes('Cloud')) {
//       return require('@/assets/lottie/cloud.json');
//     } else {
//       return require('@/assets/lottie/cloud.json'); 
//     }
//   };

//   return (
//     <ScrollView style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <Text style={styles.welcomeText}>Hello, Farmer!</Text>
//         <TouchableOpacity>
//           <Image 
//             source={require('@/assets/images/adaptive-icon.png')} 
//             style={styles.profileImage} 
//           />
//         </TouchableOpacity>
//       </View>

//       {/* Weather Section */}
//       <Card className="mb-4">
//         <View style={styles.weatherContainer}>
//           {loading ? (
//             <ActivityIndicator size="large" color="#2196F3" />
//           ) : weatherData ? (
//             <View style={styles.weatherContent}>
//               <View style={styles.weatherHeader}>
//                 <Text style={styles.cityName}>New Delhi</Text>
//                 <LottieView
//                   source={getWeatherAnimation(weatherData.current.condition.text)}
//                   autoPlay
//                   loop
//                   style={styles.weatherAnimation}
//                 />
//               </View>
//               <View style={styles.weatherDetails}>
//                 <View style={styles.weatherDetailItem}>
//                   <Droplet size={24} color="#2196F3" />
//                   <Text>Humidity: {weatherData.current.humidity}%</Text>
//                 </View>
//                 <View style={styles.weatherDetailItem}>
//                   <Wind size={24} color="#2196F3" />
//                   <Text>Wind: {weatherData.current.wind_kph} km/h</Text>
//                 </View>
//               </View>
//               <View style={styles.temperatureContainer}>
//                 <Text style={styles.temperatureText}>
//                   {weatherData.current.temp_c}°C
//                 </Text>
//                 <Text style={styles.conditionText}>
//                   {weatherData.current.condition.text}
//                 </Text>
//               </View>
//             </View>
//           ) : (
//             <Text>Unable to fetch weather data.</Text>
//           )}
//         </View>
//       </Card>

//       {/* MSP Prices Section */}
//       <Card className="mb-4">
//         <View style={styles.sectionHeader}>
//           <Text style={styles.sectionTitle}>Current MSP Prices</Text>
//           <TouchableOpacity>
//             <ChevronRight size={24} color="#2196F3" />
//           </TouchableOpacity>
//         </View>
//         {MOCK_MSP_DATA.map((crop, index) => (
//           <View key={index} style={styles.mspItem}>
//             <Text style={styles.cropName}>{crop.crop}</Text>
//             <View style={styles.mspDetails}>
//               <Text style={styles.mspPrice}>{crop.msp}</Text>
//               <Text style={[
//                 styles.mspChange, 
//                 crop.change.startsWith('+') ? styles.positiveChange : styles.negativeChange
//               ]}>
//                 {crop.change}
//               </Text>
//             </View>
//           </View>
//         ))}
//       </Card>

//       {/* My Crops Section */}
//       <Card className="mb-4">
//         <View style={styles.sectionHeader}>
//           <Text style={styles.sectionTitle}>My Crops</Text>
//           <TouchableOpacity>
//             <ChevronRight size={24} color="#2196F3" />
//           </TouchableOpacity>
//         </View>
//         {MOCK_FARMER_CROPS.map((crop, index) => (
//           <View key={index} style={styles.cropItem}>
//             <Text style={styles.cropName}>{crop.name}</Text>
//             <View style={styles.cropDetails}>
//               <Text>Area: {crop.area}</Text>
//               <Text>Expected Yield: {crop.expectedYield}</Text>
//             </View>
//           </View>
//         ))}
//       </Card>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F0F4F8',
//     paddingTop: 50,
//     paddingHorizontal: 16,
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   welcomeText: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   profileImage: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//   },
//   weatherContainer: {
//     padding: 16,
//   },
//   weatherContent: {
//     alignItems: 'center',
//   },
//   weatherHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     width: '100%',
//   },
//   cityName: {
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   weatherAnimation: {
//     width: 100,
//     height: 100,
//   },
//   weatherDetails: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     width: '100%',
//     marginTop: 10,
//   },
//   weatherDetailItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 8,
//   },
//   temperatureContainer: {
//     alignItems: 'center',
//     marginTop: 10,
//   },
//   temperatureText: {
//     fontSize: 36,
//     fontWeight: 'bold',
//     color: '#FF5722',
//   },
//   conditionText: {
//     fontSize: 16,
//     color: '#666',
//   },
//   sectionHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 10,
//     paddingHorizontal: 16,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   mspItem: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingVertical: 10,
//     paddingHorizontal: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: '#E0E0E0',
//   },
//   cropName: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   mspDetails: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 10,
//   },
//   mspPrice: {
//     fontSize: 14,
//   },
//   mspChange: {
//     fontSize: 12,
//   },
//   positiveChange: {
//     color: 'green',
//   },
//   negativeChange: {
//     color: 'red',
//   },
//   cropItem: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingVertical: 10,
//     paddingHorizontal: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: '#E0E0E0',
//   },
//   cropDetails: {
//     alignItems: 'flex-end',
//   },
// });

// export default HomeScreen;






// import React, { useState, useEffect } from 'react';
// import { 
//   View, 
//   Text, 
//   StyleSheet, 
//   ScrollView, 
//   ActivityIndicator, 
//   TouchableOpacity, 
//   Image 
// } from 'react-native';
// import LottieView from 'lottie-react-native';
// import { ChevronRight, Cloud, Sun, Droplet, Wind } from 'lucide-react';

// // Mock data for MSP and Crops (would typically come from an API)
// const MOCK_MSP_DATA = [
//   { crop: 'Wheat', msp: '₹2275/quintal', change: '+2.3%' },
//   { crop: 'Rice', msp: '₹1940/quintal', change: '+1.5%' },
//   { crop: 'Cotton', msp: '₹5450/quintal', change: '+3.1%' },
// ];

// const MOCK_FARMER_CROPS = [
//   { name: 'Wheat', area: '5 acres', expectedYield: '75 quintals' },
//   { name: 'Cotton', area: '3 acres', expectedYield: '45 quintals' },
// ];

// interface WeatherData {
//   current: {
//     condition: {
//       text: string;
//     };
//     humidity: number;
//     wind_kph: number;
//     temp_c: number;
//   };
// }

// export default function HomeScreen() {
//   const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
//   const [loading, setLoading] = useState(true);

//   const fetchWeather = async () => {
//     try {
//       const response = await fetch(
//         `https://api.weatherapi.com/v1/forecast.json?key=YOUR_API_KEY&q=New Delhi&days=3`
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
//     if (condition.includes('sun') || condition.includes('Sunny')) {
//       return require('@/assets/lottie/cloud.json');
//     } else if (condition.includes('rain') || condition.includes('Rain')) {
//       return require('@/assets/lottie/cloud.json');
//     } else if (condition.includes('cloud') || condition.includes('Cloud')) {
//       return require('@/assets/lottie/cloud.json');
//     } else {
//       return require('@/assets/lottie/cloud.json'); // fallback
//     }
//   };

//   // Custom Card Component to avoid import issues
//   const Card = ({ children, style }: { children: React.ReactNode, style?: any }) => (
//     <View style={[styles.cardContainer, style]}>
//       {children}
//     </View>
//   );

//   return (
//     <ScrollView style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <Text style={styles.welcomeText}>Hello, Farmer!</Text>
//         <TouchableOpacity>
//           <Image 
//             source={require('@/assets/images/adaptive-icon.png')} 
        
//             style={styles.profileImage} 
//           />
//         </TouchableOpacity>
//       </View>

//       {/* Weather Section */}
//       <Card>
//         <View style={styles.weatherContainer}>
//           {loading ? (
//             <ActivityIndicator size="large" color="#2196F3" />
//           ) : weatherData ? (
//             <View style={styles.weatherContent}>
//               <View style={styles.weatherHeader}>
//                 <Text style={styles.cityName}>New Delhi</Text>
//                 <LottieView
//                   source={getWeatherAnimation(weatherData.current.condition.text)}
//                   autoPlay
//                   loop
//                   style={styles.weatherAnimation}
//                 />
//               </View>
//               <View style={styles.weatherDetails}>
//                 <View style={styles.weatherDetailItem}>
//                   <Droplet size={24} color="#2196F3" />
//                   <Text>Humidity: {weatherData.current.humidity}%</Text>
//                 </View>
//                 <View style={styles.weatherDetailItem}>
//                   <Wind size={24} color="#2196F3" />
//                   <Text>Wind: {weatherData.current.wind_kph} km/h</Text>
//                 </View>
//               </View>
//               <View style={styles.temperatureContainer}>
//                 <Text style={styles.temperatureText}>
//                   {weatherData.current.temp_c}°C
//                 </Text>
//                 <Text style={styles.conditionText}>
//                   {weatherData.current.condition.text}
//                 </Text>
//               </View>
//             </View>
//           ) : (
//             <Text>Unable to fetch weather data.</Text>
//           )}
//         </View>
//       </Card>

//       {/* MSP Prices Section */}
//       <Card>
//         <View style={styles.sectionHeader}>
//           <Text style={styles.sectionTitle}>Current MSP Prices</Text>
//           <TouchableOpacity>
//             <ChevronRight size={24} color="#2196F3" />
//           </TouchableOpacity>
//         </View>
//         {MOCK_MSP_DATA.map((crop, index) => (
//           <View key={index} style={styles.mspItem}>
//             <Text style={styles.cropName}>{crop.crop}</Text>
//             <View style={styles.mspDetails}>
//               <Text style={styles.mspPrice}>{crop.msp}</Text>
//               <Text style={[
//                 styles.mspChange, 
//                 crop.change.startsWith('+') ? styles.positiveChange : styles.negativeChange
//               ]}>
//                 {crop.change}
//               </Text>
//             </View>
//           </View>
//         ))}
//       </Card>

//       {/* My Crops Section */}
//       <Card>
//         <View style={styles.sectionHeader}>
//           <Text style={styles.sectionTitle}>My Crops</Text>
//           <TouchableOpacity>
//             <ChevronRight size={24} color="#2196F3" />
//           </TouchableOpacity>
//         </View>
//         {MOCK_FARMER_CROPS.map((crop, index) => (
//           <View key={index} style={styles.cropItem}>
//             <Text style={styles.cropName}>{crop.name}</Text>
//             <View style={styles.cropDetails}>
//               <Text>Area: {crop.area}</Text>
//               <Text>Expected Yield: {crop.expectedYield}</Text>
//             </View>
//           </View>
//         ))}
//       </Card>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       backgroundColor: '#F0F4F8',
//       paddingTop: 50,
//       paddingHorizontal: 16,
//     },
//     cardContainer: {
//       backgroundColor: 'white',
//       borderRadius: 12,
//       marginBottom: 16,
//       elevation: 2,
//       shadowColor: '#000',
//       shadowOffset: { width: 0, height: 2 },
//       shadowOpacity: 0.1,
//       shadowRadius: 4,
//     },
//     header: {
//       flexDirection: 'row',
//       justifyContent: 'space-between',
//       alignItems: 'center',
//       marginBottom: 20,
//     },
//     welcomeText: {
//       fontSize: 24,
//       fontWeight: 'bold',
//       color: '#333',
//     },
//     profileImage: {
//       width: 50,
//       height: 50,
//       borderRadius: 25,
//     },
//     weatherContainer: {
//       padding: 16,
//     },
//     weatherContent: {
//       alignItems: 'center',
//     },
//     weatherHeader: {
//       flexDirection: 'row',
//       alignItems: 'center',
//       justifyContent: 'space-between',
//       width: '100%',
//     },
//     cityName: {
//       fontSize: 20,
//       fontWeight: 'bold',
//     },
//     weatherAnimation: {
//       width: 100,
//       height: 100,
//     },
//     weatherDetails: {
//       flexDirection: 'row',
//       justifyContent: 'space-between',
//       width: '100%',
//       marginTop: 10,
//     },
//     weatherDetailItem: {
//       flexDirection: 'row',
//       alignItems: 'center',
//       gap: 8,
//     },
//     temperatureContainer: {
//       alignItems: 'center',
//       marginTop: 10,
//     },
//     temperatureText: {
//       fontSize: 36,
//       fontWeight: 'bold',
//       color: '#FF5722',
//     },
//     conditionText: {
//       fontSize: 16,
//       color: '#666',
//     },
//     sectionHeader: {
//       flexDirection: 'row',
//       justifyContent: 'space-between',
//       alignItems: 'center',
//       marginBottom: 10,
//       paddingHorizontal: 16,
//     },
//     sectionTitle: {
//       fontSize: 18,
//       fontWeight: 'bold',
//     },
//     mspItem: {
//       flexDirection: 'row',
//       justifyContent: 'space-between',
//       paddingVertical: 10,
//       paddingHorizontal: 16,
//       borderBottomWidth: 1,
//       borderBottomColor: '#E0E0E0',
//     },
//     cropName: {
//       fontSize: 16,
//       fontWeight: 'bold',
//     },
//     mspDetails: {
//       flexDirection: 'row',
//       alignItems: 'center',
//       gap: 10,
//     },
//     mspPrice: {
//       fontSize: 14,
//     },
//     mspChange: {
//       fontSize: 12,
//     },
//     positiveChange: {
//       color: 'green',
//     },
//     negativeChange: {
//       color: 'red',
//     },
//     cropItem: {
//       flexDirection: 'row',
//       justifyContent: 'space-between',
//       paddingVertical: 10,
//       paddingHorizontal: 16,
//       borderBottomWidth: 1,
//       borderBottomColor: '#E0E0E0',
//     },
//     cropDetails: {
//       alignItems: 'flex-end',
//     },
//   });
  




import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  ActivityIndicator, 
  TouchableOpacity, 
  Image 
} from 'react-native';
import LottieView from 'lottie-react-native';

// Mock data for MSP and Crops (would typically come from an API)
const MOCK_MSP_DATA = [
  { crop: 'Wheat', msp: '₹2275/quintal', change: '+2.3%' },
  { crop: 'Rice', msp: '₹1940/quintal', change: '+1.5%' },
  { crop: 'Cotton', msp: '₹5450/quintal', change: '+3.1%' },
];

const MOCK_FARMER_CROPS = [
  { name: 'Wheat', area: '5 acres', expectedYield: '75 quintals' },
  { name: 'Cotton', area: '3 acres', expectedYield: '45 quintals' },
];

interface WeatherData {
  current: {
    condition: {
      text: string;
    };
    humidity: number;
    wind_kph: number;
    temp_c: number;
  };
}

export default function HomeScreen() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchWeather = async () => {
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=fa540f9aedd24bfb974121903252203&q=New Delhi&days=3`
      );
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error('Error fetching weather:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  const getWeatherAnimation = (condition: string) => {
    if (condition.includes('sun') || condition.includes('Sunny')) {
      return require('@/assets/lottie/cloud.json');
    } else if (condition.includes('rain') || condition.includes('Rain')) {
      return require('@/assets/lottie/cloud.json');
    } else if (condition.includes('cloud') || condition.includes('Cloud')) {
      return require('@/assets/lottie/cloud.json');
    } else {
      return require('@/assets/lottie/cloud.json'); // fallback
    }
  };

  // Custom Card Component to avoid import issues
  const Card = ({ children, style }: { children: React.ReactNode, style?: any }) => (
    <View style={[styles.cardContainer, style]}>
      {children}
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Hello, Farmer!</Text>
        <TouchableOpacity>
          <Image 
            source={require('@/assets/images/adaptive-icon.png')} 
            style={styles.profileImage} 
          />
        </TouchableOpacity>
      </View>

      {/* Weather Section */}
      <Card>
        <View style={styles.weatherContainer}>
          {loading ? (
            <ActivityIndicator size="large" color="#2196F3" />
          ) : weatherData ? (
            <View style={styles.weatherContent}>
              <View style={styles.weatherHeader}>
                <Text style={styles.cityName}>New Delhi</Text>
                <LottieView
                  source={getWeatherAnimation(weatherData.current.condition.text)}
                  autoPlay
                  loop
                  style={styles.weatherAnimation}
                />
              </View>
              <View style={styles.weatherDetails}>
                <View style={styles.weatherDetailItem}>
                  <Text style={styles.weatherDetailText}>💧</Text>
                  <Text>Humidity: {weatherData.current.humidity}%</Text>
                </View>
                <View style={styles.weatherDetailItem}>
                  <Text style={styles.weatherDetailText}>🌬️</Text>
                  <Text>Wind: {weatherData.current.wind_kph} km/h</Text>
                </View>
              </View>
              <View style={styles.temperatureContainer}>
                <Text style={styles.temperatureText}>
                  {weatherData.current.temp_c}°C
                </Text>
                <Text style={styles.conditionText}>
                  {weatherData.current.condition.text}
                </Text>
              </View>
            </View>
          ) : (
            <Text>Unable to fetch weather data.</Text>
          )}
        </View>
      </Card>

      {/* MSP Prices Section */}
      <Card>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Current MSP Prices</Text>
          <TouchableOpacity>
            <Text style={styles.navIcon}>{'>'}</Text>
          </TouchableOpacity>
        </View>
        {MOCK_MSP_DATA.map((crop, index) => (
          <View key={index} style={styles.mspItem}>
            <Text style={styles.cropName}>{crop.crop}</Text>
            <View style={styles.mspDetails}>
              <Text style={styles.mspPrice}>{crop.msp}</Text>
              <Text style={[
                styles.mspChange, 
                crop.change.startsWith('+') ? styles.positiveChange : styles.negativeChange
              ]}>
                {crop.change}
              </Text>
            </View>
          </View>
        ))}
      </Card>

      {/* My Crops Section */}
      <Card>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>My Crops</Text>
          <TouchableOpacity>
            <Text style={styles.navIcon}>{'>'}</Text>
          </TouchableOpacity>
        </View>
        {MOCK_FARMER_CROPS.map((crop, index) => (
          <View key={index} style={styles.cropItem}>
            <Text style={styles.cropName}>{crop.name}</Text>
            <View style={styles.cropDetails}>
              <Text>Area: {crop.area}</Text>
              <Text>Expected Yield: {crop.expectedYield}</Text>
            </View>
          </View>
        ))}
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  
  weatherDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  weatherDetailText: {
    fontSize: 20,
  },
  navIcon: {
    fontSize: 20,
    color: '#2196F3',
  },
  container: {
          flex: 1,
          backgroundColor: '#F0F4F8',
          paddingTop: 50,
          paddingHorizontal: 16,
        },
        cardContainer: {
          backgroundColor: 'white',
          borderRadius: 12,
          marginBottom: 16,
          elevation: 2,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        },
        header: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 20,
        },
        welcomeText: {
          fontSize: 24,
          fontWeight: 'bold',
          color: '#333',
        },
        profileImage: {
          width: 50,
          height: 50,
          borderRadius: 25,
        },
        weatherContainer: {
          padding: 16,
        },
        weatherContent: {
          alignItems: 'center',
        },
        weatherHeader: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
        },
        cityName: {
          fontSize: 20,
          fontWeight: 'bold',
        },
        weatherAnimation: {
          width: 100,
          height: 100,
        },
        weatherDetails: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
          marginTop: 10,
        },
        temperatureContainer: {
          alignItems: 'center',
          marginTop: 10,
        },
        temperatureText: {
          fontSize: 36,
          fontWeight: 'bold',
          color: '#FF5722',
        },
        conditionText: {
          fontSize: 16,
          color: '#666',
        },
        sectionHeader: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 10,
          paddingHorizontal: 16,
        },
        sectionTitle: {
          fontSize: 18,
          fontWeight: 'bold',
        },
        mspItem: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingVertical: 10,
          paddingHorizontal: 16,
          borderBottomWidth: 1,
          borderBottomColor: '#E0E0E0',
        },
        cropName: {
          fontSize: 16,
          fontWeight: 'bold',
        },
        mspDetails: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
        },
        mspPrice: {
          fontSize: 14,
        },
        mspChange: {
          fontSize: 12,
        },
        positiveChange: {
          color: 'green',
        },
        negativeChange: {
          color: 'red',
        },
        cropItem: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingVertical: 10,
          paddingHorizontal: 16,
          borderBottomWidth: 1,
          borderBottomColor: '#E0E0E0',
        },
        cropDetails: {
          alignItems: 'flex-end',
        },
  // Rest of the styles remain unchanged
});