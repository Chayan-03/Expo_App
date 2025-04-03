// // import React, { useState } from 'react';
// // import { 
// //   View, 
// //   Text, 
// //   TouchableOpacity, 
// //   StyleSheet, 
// //   SafeAreaView, 
// //   Dimensions,
// //   Platform 
// // } from 'react-native';
// // import { Link } from 'expo-router';
// // import { 
// //   Ionicons, 
// //   FontAwesome5, 
// //   MaterialIcons 
// // } from '@expo/vector-icons';

// // const { width, height } = Dimensions.get('window');

// // // Multilingual Content Dictionary
// // const CONTENT = {
// //   hi: {
// //     title: 'किसान बाज़ार',
// //     subHeader: 'जोड़ें, बेचें, बढ़ें',
// //     sellProduction: 'उत्पादन बेचें',
// //     buyMachinery: 'मशीनरी खरीदें',
// //     fertilizer : 'खरीदें शोषण',
// //     storage : 'भंडारण',
// //     bottomText: 'किसानों को सशक्त बनाते हुए, बाज़ारों को जोड़ते हुए',
// //   },
// //   en: {
// //     title: "Farmer's Marketplace",
// //     subHeader: 'Connect, Sell, Grow',
// //     sellProduction: 'Sell Production',
// //     buyMachinery: 'Buy Machinery',
// //     fertilizer : 'Buy Fertilizers',
// //     storage : 'Buy Storage',
  
// //     bottomText: 'Empowering Farmers, Connecting Markets',
// //   }
// // };

// // const Marketplace = () => {
// //   const [language, setLanguage] = useState<'hi' | 'en'>('en');

// //   const toggleLanguage = () => {
// //     setLanguage(prevLanguage => prevLanguage === 'en' ? 'hi' : 'en');
// //   };

// //   return (
// //     <SafeAreaView style={styles.container}>
// //       {/* Language Toggle */}
// //       <View style={styles.languageToggle}>
// //         <TouchableOpacity 
// //           onPress={toggleLanguage}
// //           style={[
// //             styles.languageButton, 
// //             language === 'hi' ? styles.activeLanguageButton : {}
// //           ]}
// //         >
// //           <Text style={styles.languageButtonText}>हिं</Text>
// //         </TouchableOpacity>
// //         <TouchableOpacity 
// //           onPress={toggleLanguage}
// //           style={[
// //             styles.languageButton, 
// //             language === 'en' ? styles.activeLanguageButton : {}
// //           ]}
// //         >
// //           <Text style={styles.languageButtonText}>Eng</Text>
// //         </TouchableOpacity>
// //       </View>

// //       {/* Header Container */}
// //       <View style={styles.headerContainer}>
// //         <Text style={styles.headerTitle}>
// //           {CONTENT[language].title}
// //         </Text>
// //         <Text style={styles.subHeader}>
// //           {CONTENT[language].subHeader}
// //         </Text>
// //       </View>

// //       {/* Button Container */}
// //       <View style={styles.buttonContainer}>
// //         <TouchableOpacity 
// //           style={styles.marketButton} 
// //           activeOpacity={0.7}
// //         >
// //           <Link href="../../sellproduct" style={styles.linkStyle}>
// //             <View style={styles.buttonContent}>
// //               <FontAwesome5 
// //                 name="shopping-cart" 
// //                 size={24} 
// //                 color="#FFFFFF" 
// //               />
// //               <Text style={styles.buttonText}>
// //                 {CONTENT[language].sellProduction}
// //               </Text>
// //             </View>
// //           </Link>
// //         </TouchableOpacity>

// //         <TouchableOpacity 
// //           style={styles.marketButton} 
// //           activeOpacity={0.7}
// //         >
// //           <Link href="../../butmachine" style={styles.linkStyle}>
// //             <View style={styles.buttonContent}>
// //               <MaterialIcons 
// //                 name="agriculture" 
// //                 size={24} 
// //                 color="#FFFFFF" 
// //               />
// //               <Text style={styles.buttonText}>
// //                 {CONTENT[language].buyMachinery}
// //               </Text>
// //             </View>
// //           </Link>
// //         </TouchableOpacity>
// //         <TouchableOpacity 
// //           style={styles.marketButton} 
// //           activeOpacity={0.7}
// //         >
// //           <Link href="../../fertilizers" style={styles.linkStyle}>
// //             <View style={styles.buttonContent}>
// //               <MaterialIcons 
// //                 name="agriculture" 
// //                 size={24} 
// //                 color="#FFFFFF" 
// //               />
// //               <Text style={styles.buttonText}>
// //                 {CONTENT[language].fertilizer}
// //               </Text>
// //             </View>
// //           </Link>
// //         </TouchableOpacity>
// //         <TouchableOpacity 
// //           style={styles.marketButton} 
// //           activeOpacity={0.7}
// //         >
// //           <Link href="../../storage" style={styles.linkStyle}>
// //             <View style={styles.buttonContent}>
// //               <MaterialIcons 
// //                 name="agriculture" 
// //                 size={24} 
// //                 color="#FFFFFF" 
// //               />
// //               <Text style={styles.buttonText}>
// //                 {CONTENT[language].storage}
// //               </Text>
// //             </View>
// //           </Link>
// //         </TouchableOpacity>
// //       </View>

// //       {/* Bottom Container */}
// //       <View style={styles.bottomContainer}>
// //         <Text style={styles.bottomText}>
// //           {CONTENT[language].bottomText}
// //         </Text>
// //       </View>
// //     </SafeAreaView>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: '#F0F4F8',
// //     justifyContent: 'space-between',
// //   },
// //   languageToggle: {
// //     flexDirection: 'row',
// //     justifyContent: 'flex-end',
// //     padding: 15,
// //   },
// //   languageButton: {
// //     paddingHorizontal: 15,
// //     paddingVertical: 8,
// //     marginLeft: 10,
// //     borderRadius: 25,
// //     backgroundColor: '#E0E0E0',
// //     elevation: 2,
// //   },
// //   activeLanguageButton: {
// //     backgroundColor: '#4CAF50',
// //   },
// //   languageButtonText: {
// //     color: '#333',
// //     fontWeight: '600',
// //   },
// //   headerContainer: {
// //     alignItems: 'center',
// //     paddingVertical: height * 0.05,
// //     backgroundColor: '#4CAF50',
// //     borderBottomLeftRadius: 30,
// //     borderBottomRightRadius: 30,
// //     elevation: 5,
// //     shadowColor: '#000',
// //     shadowOffset: { width: 0, height: 2 },
// //     shadowOpacity: 0.2,
// //     shadowRadius: 4,
// //   },
// //   headerTitle: {
// //     fontSize: 30,
// //     fontWeight: 'bold',
// //     color: 'white',
// //     marginBottom: 10,
// //     textAlign: 'center',
// //   },
// //   subHeader: {
// //     fontSize: 18,
// //     color: 'rgba(255,255,255,0.8)',
// //     textAlign: 'center',
// //   },
// //   buttonContainer: {
// //     paddingHorizontal: width * 0.05,
// //     marginVertical: height * 0.05,
// //   },
// //   marketButton: {
// //     backgroundColor: '#2E7D32',
// //     borderRadius: 15,
// //     marginVertical: 15,
// //     elevation: 5,
// //     shadowColor: '#000',
// //     shadowOffset: { width: 0, height: 2 },
// //     shadowOpacity: 0.25,
// //     shadowRadius: 3.84,
// //     transform: [{ scale: 1 }],
// //   },
// //   linkStyle: {
// //     paddingVertical: 20,
// //   },
// //   buttonContent: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //     gap: 15,
// //   },
// //   buttonText: {
// //     color: 'white',
// //     fontSize: 18,
// //     fontWeight: '600',
// //   },
// //   bottomContainer: {
// //     alignItems: 'center',
// //     paddingVertical: height * 0.03,
// //     backgroundColor: 'rgba(76, 175, 80, 0.1)',
// //     borderTopLeftRadius: 30,
// //     borderTopRightRadius: 30,
// //   },
// //   bottomText: {
// //     color: '#2E7D32',
// //     fontSize: 14,
// //     fontStyle: 'italic',
// //     textAlign: 'center',
// //     paddingHorizontal: 20,
// //   },
// // });

// // export default Marketplace;




// import React, { useState } from 'react';
// import { 
//   View, 
//   Text, 
//   TouchableOpacity, 
//   StyleSheet, 
//   SafeAreaView, 
//   Dimensions,
//   Platform 
// } from 'react-native';
// import { Link } from 'expo-router';
// import { 
//   Ionicons, 
//   FontAwesome5, 
//   MaterialIcons 
// } from '@expo/vector-icons';
// import { LinearGradient } from 'expo-linear-gradient';

// const { width, height } = Dimensions.get('window');

// // Multilingual Content Dictionary (unchanged)
// const CONTENT = {
//   hi: {
//     title: 'किसान बाज़ार',
//     subHeader: 'जोड़ें, बेचें, बढ़ें',
//     sellProduction: 'उत्पादन बेचें',
//     buyMachinery: 'मशीनरी खरीदें',
//     fertilizer: 'खरीदें शोषण',
//     storage: 'भंडारण',
//     bottomText: 'किसानों को सशक्त बनाते हुए, बाज़ारों को जोड़ते हुए',
//   },
//   en: {
//     title: "Farmer's Marketplace",
//     subHeader: 'Connect, Sell, Grow',
//     sellProduction: 'Sell Production',
//     buyMachinery: 'Buy Machinery',
//     fertilizer: 'Buy Fertilizers',
//     storage: 'Buy Storage',
//     bottomText: 'Empowering Farmers, Connecting Markets',
//   }
// };

// const Marketplace = () => {
//   const [language, setLanguage] = useState<'hi' | 'en'>('en');

//   const toggleLanguage = () => {
//     setLanguage(prevLanguage => prevLanguage === 'en' ? 'hi' : 'en');
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       {/* Language Toggle */}
//       <View style={styles.languageToggle}>
//         <TouchableOpacity 
//           onPress={toggleLanguage}
//           style={[
//             styles.languageButton,
//             language === 'hi' && styles.activeLanguageButton
//           ]}
//         >
//           <Text style={[
//             styles.languageButtonText,
//             language === 'hi' && styles.activeLanguageText
//           ]}>हिं</Text>
//         </TouchableOpacity>
//         <TouchableOpacity 
//           onPress={toggleLanguage}
//           style={[
//             styles.languageButton,
//             language === 'en' && styles.activeLanguageButton
//           ]}
//         >
//           <Text style={[
//             styles.languageButtonText,
//             language === 'en' && styles.activeLanguageText
//           ]}>Eng</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Header Container */}
//       <LinearGradient
//         colors={['#2ecc71', '#27ae60']}
//         style={styles.headerContainer}
//       >
//         <Text style={styles.headerTitle}>
//           {CONTENT[language].title}
//         </Text>
//         <Text style={styles.subHeader}>
//           {CONTENT[language].subHeader}
//         </Text>
//       </LinearGradient>

//       {/* Button Container */}
//       <View style={styles.buttonContainer}>
//         <TouchableOpacity 
//           style={styles.marketButton}
//           activeOpacity={0.8}
//         >
//           <Link href="../../sellproduct" style={styles.linkStyle}>
//             <LinearGradient
//               colors={['#3498db', '#2980b9']}
//               style={styles.buttonGradient}
//             >
//               <View style={styles.buttonContent}>
//                 <FontAwesome5 
//                   name="shopping-cart" 
//                   size={26} 
//                   color="#FFFFFF" 
//                 />
//                 <Text style={styles.buttonText}>
//                   {CONTENT[language].sellProduction}
//                 </Text>
//               </View>
//             </LinearGradient>
//           </Link>
//         </TouchableOpacity>

//         <TouchableOpacity 
//           style={styles.marketButton}
//           activeOpacity={0.8}
//         >
//           <Link href="../../butmachine" style={styles.linkStyle}>
//             <LinearGradient
//               colors={['#e67e22', '#d35400']}
//               style={styles.buttonGradient}
//             >
//               <View style={styles.buttonContent}>
//                 <MaterialIcons 
//                   name="agriculture" 
//                   size={26} 
//                   color="#FFFFFF" 
//                 />
//                 <Text style={styles.buttonText}>
//                   {CONTENT[language].buyMachinery}
//                 </Text>
//               </View>
//             </LinearGradient>
//           </Link>
//         </TouchableOpacity>

//         <TouchableOpacity 
//           style={styles.marketButton}
//           activeOpacity={0.8}
//         >
//           <Link href="../../fertilizers" style={styles.linkStyle}>
//             <LinearGradient
//               colors={['#9b59b6', '#8e44ad']}
//               style={styles.buttonGradient}
//             >
//               <View style={styles.buttonContent}>
//                 <MaterialIcons 
//                   name="spa" 
//                   size={26} 
//                   color="#FFFFFF" 
//                 />
//                 <Text style={styles.buttonText}>
//                   {CONTENT[language].fertilizer}
//                 </Text>
//               </View>
//             </LinearGradient>
//           </Link>
//         </TouchableOpacity>

//         <TouchableOpacity 
//           style={styles.marketButton}
//           activeOpacity={0.8}
//         >
//           <Link href="../../storage" style={styles.linkStyle}>
//             <LinearGradient
//               colors={['#e74c3c', '#c0392b']}
//               style={styles.buttonGradient}
//             >
//               <View style={styles.buttonContent}>
//                 <MaterialIcons 
//                   name="warehouse" 
//                   size={26} 
//                   color="#FFFFFF" 
//                 />
//                 <Text style={styles.buttonText}>
//                   {CONTENT[language].storage}
//                 </Text>
//               </View>
//             </LinearGradient>
//           </Link>
//         </TouchableOpacity>
//       </View>

//       {/* Bottom Container */}
//       <LinearGradient
//         colors={['rgba(46, 204, 113, 0.1)', 'rgba(39, 174, 96, 0.1)']}
//         style={styles.bottomContainer}
//       >
//         <Text style={styles.bottomText}>
//           {CONTENT[language].bottomText}
//         </Text>
//       </LinearGradient>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f5f6fa',
//   },
//   languageToggle: {
//     flexDirection: 'row',
//     justifyContent: 'flex-end',
//     padding: 20,
//     paddingTop: Platform.OS === 'ios' ? 40 : 20,
//   },
//   languageButton: {
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     marginLeft: 12,
//     borderRadius: 20,
//     backgroundColor: '#ffffff',
//     borderWidth: 1,
//     borderColor: '#e0e0e0',
//     elevation: 3,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//   },
//   activeLanguageButton: {
//     backgroundColor: '#2ecc71',
//     borderColor: '#27ae60',
//   },
//   languageButtonText: {
//     color: '#7f8c8d',
//     fontWeight: '700',
//     fontSize: 14,
//   },
//   activeLanguageText: {
//     color: '#ffffff',
//   },
//   headerContainer: {
//     alignItems: 'center',
//     paddingVertical: height * 0.06,
//     borderBottomLeftRadius: 40,
//     borderBottomRightRadius: 40,
//     elevation: 8,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.2,
//     shadowRadius: 6,
//   },
//   headerTitle: {
//     fontSize: 34,
//     fontWeight: '800',
//     color: '#ffffff',
//     marginBottom: 12,
//     textAlign: 'center',
//     letterSpacing: 0.5,
//   },
//   subHeader: {
//     fontSize: 18,
//     color: 'rgba(255,255,255,0.9)',
//     textAlign: 'center',
//     fontWeight: '500',
//   },
//   buttonContainer: {
//     paddingHorizontal: width * 0.06,
//     marginVertical: height * 0.04,
//   },
//   marketButton: {
//     borderRadius: 20,
//     marginVertical: 12,
//     overflow: 'hidden',
//     elevation: 6,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 3 },
//     shadowOpacity: 0.25,
//     shadowRadius: 5,
//   },
//   buttonGradient: {
//     paddingVertical: 20,
//     paddingHorizontal: 25,
//   },
//   linkStyle: {
//     width: '100%',
//   },
//   buttonContent: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     gap: 18,
//   },
//   buttonText: {
//     color: '#ffffff',
//     fontSize: 18,
//     fontWeight: '700',
//     letterSpacing: 0.3,
//   },
//   bottomContainer: {
//     alignItems: 'center',
//     paddingVertical: height * 0.04,
//     borderTopLeftRadius: 40,
//     borderTopRightRadius: 40,
//     marginTop: 'auto',
//   },
//   bottomText: {
//     color: '#27ae60',
//     fontSize: 15,
//     fontStyle: 'italic',
//     textAlign: 'center',
//     paddingHorizontal: 25,
//     fontWeight: '500',
//     lineHeight: 22,
//   },
// });

// export default Marketplace;


import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView, 
  Dimensions,
  Platform 
} from 'react-native';
import { Link } from 'expo-router';
import { 
  FontAwesome5, 
  MaterialIcons 
} from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

// Multilingual Content Dictionary
const CONTENT = {
  hi: {
    title: 'किसान बाज़ार',
    sellProduction: 'फसल बेचें',
    buyMachinery: 'मशीन खरीदें',
    fertilizer: 'खाद खरीदें',
    storage: 'भंडारण खरीदें',
  },
  en: {
    title: "Farmer's Market",
    sellProduction: 'Sell Crops',
    buyMachinery: 'Buy Machines',
    fertilizer: 'Buy Fertilizer',
    storage: 'Buy Storage',
  }
};

const Marketplace = () => {
  const [language, setLanguage] = useState<'hi' | 'en'>('en');

  const toggleLanguage = () => {
    setLanguage(prevLanguage => prevLanguage === 'en' ? 'hi' : 'en');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with Language Toggle */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>
          {CONTENT[language].title}
        </Text>
        <TouchableOpacity 
          onPress={toggleLanguage}
          style={styles.languageButton}
        >
          <Text style={styles.languageButtonText}>
            {language === 'en' ? 'हिंदी' : 'English'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Button Container */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.marketButton}>
          <Link href="../../sellproduct" style={styles.linkStyle}>
            <View style={styles.buttonContent}>
              <FontAwesome5 
                name="shopping-cart" 
                size={30} 
                color="#fff" 
              />
              <Text style={styles.buttonText}>
                {CONTENT[language].sellProduction}
              </Text>
            </View>
          </Link>
        </TouchableOpacity>

        <TouchableOpacity style={styles.marketButton}>
          <Link href="../../butmachine" style={styles.linkStyle}>
            <View style={styles.buttonContent}>
              <MaterialIcons 
                name="agriculture" 
                size={30} 
                color="#fff" 
              />
              <Text style={styles.buttonText}>
                {CONTENT[language].buyMachinery}
              </Text>
            </View>
          </Link>
        </TouchableOpacity>

        <TouchableOpacity style={styles.marketButton}>
          <Link href="../../fertilizers" style={styles.linkStyle}>
            <View style={styles.buttonContent}>
              <MaterialIcons 
                name="spa" 
                size={30} 
                color="#fff" 
              />
              <Text style={styles.buttonText}>
                {CONTENT[language].fertilizer}
              </Text>
            </View>
          </Link>
        </TouchableOpacity>

        <TouchableOpacity style={styles.marketButton}>
          <Link href="../../storage" style={styles.linkStyle}>
            <View style={styles.buttonContent}>
              <MaterialIcons 
                name="warehouse" 
                size={30} 
                color="#fff" 
              />
              <Text style={styles.buttonText}>
                {CONTENT[language].storage}
              </Text>
            </View>
          </Link>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f2f5',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: Platform.OS === 'ios' ? 50 : 30,
    backgroundColor: '#2ecc71',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  languageButton: {
    backgroundColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  languageButtonText: {
    fontSize: 16,
    color: '#2ecc71',
    fontWeight: '600',
  },
  buttonContainer: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
  },
  marketButton: {
    backgroundColor: '#27ae60',
    borderRadius: 12,
    marginVertical: 15,
    paddingVertical: 20,
    elevation: 4,
  },
  linkStyle: {
    width: '100%',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '600',
  },
});

export default Marketplace;