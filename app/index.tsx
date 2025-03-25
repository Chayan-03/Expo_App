// // import React, { useState } from 'react';
// // import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
// // import { initializeApp } from 'firebase/app';
// // import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
// // import { useRouter } from 'expo-router';
// // import { Link } from 'expo-router';



// // // Firebase config
// // const firebaseConfig = {
// //   apiKey: "AIzaSyANotXe3bOglk6jcGqqAblm_stSSt8vZGQ",
// //   authDomain: "solution-challenge-f74ab.firebaseapp.com",
// //   projectId: "solution-challenge-f74ab",
// //   storageBucket: "solution-challenge-f74ab.appspot.com",
// //   messagingSenderId: "219291865691",
// //   appId: "1:219291865691:web:ab8d633e6f57ef5089657e",
// // };

// // const app = initializeApp(firebaseConfig);
// // const auth = getAuth(app);

// // const LoginScreen = () => {
// //   const [email, setEmail] = useState('');
// //   const [password, setPassword] = useState('');
// //   const router = useRouter();   // ✅ this replaces useNavigation()

// //   const handleSignup = async () => {
// //     try {
// //       await createUserWithEmailAndPassword(auth, email, password);
// //       Alert.alert('Signup successful!');
// //       router.replace('/home'); // ✅ using router.replace() to navigate
// //     } catch (error) {
// //       Alert.alert('Signup Error', (error as any).message);
// //     }
// //   };

// //   const handleLogin = async () => {
// //     try {
// //       await signInWithEmailAndPassword(auth, email, password);
// //       Alert.alert('Login successful!');
// //       router.replace('/home'); 
// //     } catch (error) {
// //       Alert.alert('Login Error', (error as any).message);
// //     }
// //   };

// //   return (
// //     <View style={{ flex: 1, padding: 20, justifyContent: 'center' }}>
// //       <Text style={{ fontSize: 28, marginBottom: 20 }}>Login or Signup</Text>
// //       <TextInput
// //         placeholder="Email"
// //         value={email}
// //         onChangeText={setEmail}
// //         style={{ borderBottomWidth: 1, marginBottom: 10 }}
// //       />
// //       <TextInput
// //         placeholder="Password"
// //         secureTextEntry
// //         value={password}
// //         onChangeText={setPassword}
// //         style={{ borderBottomWidth: 1, marginBottom: 10 }}
// //       />
// //       <TouchableOpacity
// //         onPress={handleLogin}
// //         style={{ backgroundColor: '#2196F3', padding: 10, borderRadius: 5, marginBottom: 10 }}
// //       >
// //         <Text style={{ color: 'white' }}>Login</Text>
// //       </TouchableOpacity>
// //       <TouchableOpacity
// //         onPress={handleSignup}
// //         style={{ backgroundColor: '#4CAF50', padding: 10, borderRadius: 5 }}
// //       >
// //         <Text style={{ color: 'white' }}>Sign Up</Text>
// //       </TouchableOpacity>
// //     </View>
// //   );
// // };

// // export default LoginScreen;




// import React, { useState } from 'react';
// import { 
//   View, 
//   Text, 
//   TextInput, 
//   TouchableOpacity, 
//   Alert, 
//   StyleSheet, 
//   Image, 
//   KeyboardAvoidingView, 
//   Platform,
//   ScrollView
// } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { initializeApp } from 'firebase/app';
// import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
// import { useRouter } from 'expo-router';

// // Firebase config
// const firebaseConfig = {
//   apiKey: "AIzaSyANotXe3bOglk6jcGqqAblm_stSSt8vZGQ",
//   authDomain: "solution-challenge-f74ab.firebaseapp.com",
//   projectId: "solution-challenge-f74ab",
//   storageBucket: "solution-challenge-f74ab.appspot.com",
//   messagingSenderId: "219291865691",
//   appId: "1:219291865691:web:ab8d633e6f57ef5089657e",
// };

// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);

// const LoginScreen = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [isSignup, setIsSignup] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [isPasswordValid, setIsPasswordValid] = useState(true);
//   const router = useRouter();

//   // Password validation
//   const validatePassword = (pass: string) => {
//     const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
//     return passwordRegex.test(pass);
//   };

//   const handleSignup = async () => {
//     // Enhanced password validation
//     if (!validatePassword(password)) {
//       setIsPasswordValid(false);
//       Alert.alert(
//         'Invalid Password', 
//         'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.'
//       );
//       return;
//     }

//     try {
//       await createUserWithEmailAndPassword(auth, email, password);
//       Alert.alert('Success', 'Account created successfully!');
//       router.replace('/home');
//     } catch (error: any) {
//       Alert.alert('Signup Error', error.message);
//     }
//   };

//   const handleLogin = async () => {
//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//       Alert.alert('Success', 'Login successful!');
//       router.replace('/home');
//     } catch (error: any) {
//       Alert.alert('Login Error', error.message);
//     }
//   };

//   return (
//     <KeyboardAvoidingView 
//       style={styles.container}
//       behavior={Platform.OS === "ios" ? "padding" : "height"}
//     >
//       <ScrollView 
//         contentContainerStyle={styles.scrollContainer}
//         keyboardShouldPersistTaps="handled"
//       >
//         {/* Logo or Branding */}
//         <View style={styles.logoContainer}>
//           <Image 
//             source={require('../assets/images/partial-react-logo.png')} 
//             style={styles.logo} 
//             resizeMode="contain" 
//           />
//         </View>

//         {/* Title */}
//         <Text style={styles.title}>
//           {isSignup ? 'Create Account' : 'Welcome Back'}
//         </Text>
//         <Text style={styles.subtitle}>
//           {isSignup 
//             ? 'Sign up to get started' 
//             : 'Login to continue your agricultural journey'}
//         </Text>

//         {/* Email Input */}
//         <View style={styles.inputContainer}>
//           <Ionicons name="mail" size={20} color="#4CAF50" style={styles.inputIcon} />
//           <TextInput
//             placeholder="Email"
//             value={email}
//             onChangeText={setEmail}
//             style={styles.input}
//             keyboardType="email-address"
//             autoCapitalize="none"
//           />
//         </View>

//         {/* Password Input */}
//         <View style={styles.inputContainer}>
//           <Ionicons name="lock-closed" size={20} color="#4CAF50" style={styles.inputIcon} />
//           <TextInput
//             placeholder="Password"
//             secureTextEntry={!showPassword}
//             value={password}
//             onChangeText={(text) => {
//               setPassword(text);
//               setIsPasswordValid(validatePassword(text));
//             }}
//             style={[
//               styles.input, 
//               !isPasswordValid && styles.invalidInput
//             ]}
//           />
//           <TouchableOpacity 
//             onPress={() => setShowPassword(!showPassword)}
//             style={styles.passwordToggle}
//           >
//             <Ionicons 
//               name={showPassword ? "eye-off" : "eye"} 
//               size={20} 
//               color="#666" 
//             />
//           </TouchableOpacity>
//         </View>

//         {/* Action Buttons */}
//         <TouchableOpacity 
//           onPress={isSignup ? handleSignup : handleLogin}
//           style={styles.primaryButton}
//         >
//           <Text style={styles.primaryButtonText}>
//             {isSignup ? 'Sign Up' : 'Login'}
//           </Text>
//         </TouchableOpacity>

//         {/* Toggle between Login and Signup */}
//         <TouchableOpacity 
//           onPress={() => setIsSignup(!isSignup)}
//           style={styles.toggleButton}
//         >
//           <Text style={styles.toggleButtonText}>
//             {isSignup 
//               ? 'Already have an account? Login' 
//               : 'Don\'t have an account? Sign Up'}
//           </Text>
//         </TouchableOpacity>

//         {/* Social Login Placeholder */}
//         <View style={styles.socialLoginContainer}>
//           <Text style={styles.orText}>Or continue with</Text>
//           <View style={styles.socialButtons}>
//             <TouchableOpacity style={styles.socialButton}>
//               <Ionicons name="logo-google" size={24} color="#DB4437" />
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.socialButton}>
//               <Ionicons name="logo-apple" size={24} color="#000" />
//             </TouchableOpacity>
//           </View>
//         </View>
//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F0F4F8',
//   },
//   scrollContainer: {
//     flexGrow: 1,
//     justifyContent: 'center',
//     padding: 25,
//   },
//   logoContainer: {
//     alignItems: 'center',
//     marginBottom: 30,
//   },
//   logo: {
//     width: 150,
//     height: 150,
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     color: '#2C3E50',
//     textAlign: 'center',
//     marginBottom: 10,
//   },
//   subtitle: {
//     fontSize: 16,
//     color: '#7F8C8D',
//     textAlign: 'center',
//     marginBottom: 30,
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: 'white',
//     borderRadius: 10,
//     marginBottom: 15,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   inputIcon: {
//     paddingHorizontal: 15,
//   },
//   input: {
//     flex: 1,
//     height: 50,
//     fontSize: 16,
//     color: '#2C3E50',
//   },
//   invalidInput: {
//     borderColor: '#FF5252',
//     borderWidth: 1,
//   },
//   passwordToggle: {
//     paddingHorizontal: 15,
//   },
//   primaryButton: {
//     backgroundColor: '#4CAF50',
//     borderRadius: 10,
//     padding: 15,
//     alignItems: 'center',
//     marginTop: 20,
//     shadowColor: '#4CAF50',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3,
//     shadowRadius: 5,
//     elevation: 5,
//   },
//   primaryButtonText: {
//     color: 'white',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   toggleButton: {
//     alignItems: 'center',
//     marginTop: 20,
//   },
//   toggleButtonText: {
//     color: '#4CAF50',
//     fontSize: 16,
//   },
//   socialLoginContainer: {
//     marginTop: 30,
//     alignItems: 'center',
//   },
//   orText: {
//     color: '#7F8C8D',
//     marginBottom: 15,
//   },
//   socialButtons: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//   },
//   socialButton: {
//     backgroundColor: 'white',
//     padding: 15,
//     borderRadius: 10,
//     marginHorizontal: 10,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
// });

// export default LoginScreen;





import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Alert, 
  StyleSheet, 
  Image, 
  KeyboardAvoidingView, 
  Platform,
  ScrollView,
  Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

// Firebase config (same as before)
const firebaseConfig = {
  apiKey: "AIzaSyANotXe3bOglk6jcGqqAblm_stSSt8vZGQ",
  authDomain: "solution-challenge-f74ab.firebaseapp.com",
  projectId: "solution-challenge-f74ab",
  storageBucket: "solution-challenge-f74ab.appspot.com",
  messagingSenderId: "219291865691",
  appId: "1:219291865691:web:ab8d633e6f57ef5089657e",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [language, setLanguage] = useState<'hi' | 'en'>('hi');
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  // Localized strings
  const strings = {
    hi: {
      title: 'किसान डिजिटल प्लेटफॉर्म',
      subtitle: 'अपनी कृषि यात्रा शुरू करें',
      emailPlaceholder: 'ईमेल',
      phonePlaceholder: 'मोबाइल नंबर',
      passwordPlaceholder: 'पासवर्ड',
      loginButton: 'लॉग इन करें',
      signupButton: 'साइन अप करें',
      toggleLogin: 'पहले से खाता है? लॉग इन करें',
      toggleSignup: 'खाता नहीं है? साइन अप करें'
    },
    en: {
      title: 'Farmer Digital Platform',
      subtitle: 'Start Your Agricultural Journey',
      emailPlaceholder: 'Email',
      phonePlaceholder: 'Mobile Number',
      passwordPlaceholder: 'Password',
      loginButton: 'Login',
      signupButton: 'Sign Up',
      toggleLogin: 'Already have an account? Login',
      toggleSignup: 'Don\'t have an account? Sign Up'
    }
  };

  const handleLogin = async () => {
    try {
      // Validate phone number for Indian farmers
      if (phone && !phone.match(/^[6-9]\d{9}$/)) {
        Alert.alert(
          language === 'hi' ? 'अमान्य फ़ोन नंबर' : 'Invalid Phone Number',
          language === 'hi' 
            ? 'कृपया एक वैध 10-अंकों का भारतीय मोबाइल नंबर दर्ज करें' 
            : 'Please enter a valid 10-digit Indian mobile number'
        );
        return;
      }

      await signInWithEmailAndPassword(auth, email, password);
      Alert.alert(
        language === 'hi' ? 'सफलता' : 'Success', 
        language === 'hi' ? 'लॉगिन सफल' : 'Login successful!'
      );
      router.replace('/home');
    } catch (error: any) {
      Alert.alert(
        language === 'hi' ? 'लॉगिन त्रुटि' : 'Login Error', 
        error.message
      );
    }
  };

  const handleSignup = async () => {
    try {
      // Validate phone number for Indian farmers
      if (!phone.match(/^[6-9]\d{9}$/)) {
        Alert.alert(
          language === 'hi' ? 'अमान्य फ़ोन नंबर' : 'Invalid Phone Number',
          language === 'hi' 
            ? 'कृपया एक वैध 10-अंकों का भारतीय मोबाइल नंबर दर्ज करें' 
            : 'Please enter a valid 10-digit Indian mobile number'
        );
        return;
      }

      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert(
        language === 'hi' ? 'सफलता' : 'Success', 
        language === 'hi' ? 'खाता सफलतापूर्वक बनाया गया' : 'Account created successfully!'
      );
      router.replace('/home');
    } catch (error: any) {
      Alert.alert(
        language === 'hi' ? 'साइन अप त्रुटि' : 'Signup Error', 
        error.message
      );
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        {/* Language Toggle */}
        <TouchableOpacity 
          style={styles.languageToggle} 
          onPress={() => setLanguage(language === 'hi' ? 'en' : 'hi')}
        >
          <Text style={styles.languageToggleText}>
            {language === 'hi' ? 'English' : 'हिन्दी'}
          </Text>
        </TouchableOpacity>

        {/* Logo and Branding */}
        <View style={styles.logoContainer}>
          <Image 
            source={require('../assets/images/react-logo.png')} 
            style={styles.logo} 
            resizeMode="contain" 
          />
        </View>

        {/* Title */}
        <Text style={styles.title}>
          {strings[language].title}
        </Text>
        <Text style={styles.subtitle}>
          {strings[language].subtitle}
        </Text>

        {/* Phone Number Input */}
        <View style={styles.inputContainer}>
          <Ionicons name="call" size={20} color="#4CAF50" style={styles.inputIcon} />
          <TextInput
            placeholder={strings[language].phonePlaceholder}
            value={phone}
            onChangeText={setPhone}
            style={styles.input}
            keyboardType="phone-pad"
            maxLength={10}
          />
        </View>

        {/* Email Input */}
        <View style={styles.inputContainer}>
          <Ionicons name="mail" size={20} color="#4CAF50" style={styles.inputIcon} />
          <TextInput
            placeholder={strings[language].emailPlaceholder}
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        {/* Password Input */}
        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed" size={20} color="#4CAF50" style={styles.inputIcon} />
          <TextInput
            placeholder={strings[language].passwordPlaceholder}
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
            style={styles.input}
          />
          <TouchableOpacity 
            onPress={() => setShowPassword(!showPassword)}
            style={styles.passwordToggle}
          >
            <Ionicons 
              name={showPassword ? "eye-off" : "eye"} 
              size={20} 
              color="#666" 
            />
          </TouchableOpacity>
        </View>

        {/* Action Buttons */}
        <TouchableOpacity 
          onPress={isSignup ? handleSignup : handleLogin}
          style={styles.primaryButton}
        >
          <Text style={styles.primaryButtonText}>
            {isSignup ? strings[language].signupButton : strings[language].loginButton}
          </Text>
        </TouchableOpacity>

        {/* Toggle between Login and Signup */}
        <TouchableOpacity 
          onPress={() => setIsSignup(!isSignup)}
          style={styles.toggleButton}
        >
          <Text style={styles.toggleButtonText}>
            {isSignup 
              ? strings[language].toggleLogin
              : strings[language].toggleSignup}
          </Text>
        </TouchableOpacity>

        {/* Alternative Login Options */}
        <View style={styles.alternativeLoginContainer}>
          <Text style={styles.orText}>
            {language === 'hi' ? 'या फिर' : 'Or'}
          </Text>
          <View style={styles.alternativeButtons}>
            {/* OTP Login */}
            <TouchableOpacity style={styles.alternativeButton}>
              <Ionicons name="phone-portrait" size={24} color="#2196F3" />
              <Text style={styles.alternativeButtonText}>
                {language === 'hi' ? 'OTP लॉगिन' : 'OTP Login'}
              </Text>
            </TouchableOpacity>

            {/* Local Language Support */}
            <TouchableOpacity style={styles.alternativeButton}>
              <Ionicons name="language" size={24} color="#4CAF50" />
              <Text style={styles.alternativeButtonText}>
                {language === 'hi' ? 'क्षेत्रीय भाषा' : 'Regional Language'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 25,
  },
  languageToggle: {
    position: 'absolute',
    top: 50,
    right: 20,
    backgroundColor: '#4CAF50',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  languageToggleText: {
    color: 'white',
    fontWeight: 'bold',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 150,
    height: 150,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2C3E50',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#7F8C8D',
    textAlign: 'center',
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  inputIcon: {
    paddingHorizontal: 15,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#2C3E50',
  },
  passwordToggle: {
    paddingHorizontal: 15,
  },
  primaryButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  toggleButton: {
    alignItems: 'center',
    marginTop: 20,
  },
  toggleButtonText: {
    color: '#4CAF50',
    fontSize: 16,
  },
  alternativeLoginContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  orText: {
    color: '#7F8C8D',
    marginBottom: 15,
  },
  alternativeButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  alternativeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  alternativeButtonText: {
    marginLeft: 10,
    color: '#4CAF50',
  },
});

export default LoginScreen;