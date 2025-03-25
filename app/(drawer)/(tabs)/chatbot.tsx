// import React, { useState, useEffect, useRef } from 'react';
// import { 
//   View, 
//   Text, 
//   TextInput, 
//   TouchableOpacity, 
//   StyleSheet, 
//   ScrollView, 
//   KeyboardAvoidingView, 
//   Platform,
//   ActivityIndicator,
//   Alert
// } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { GoogleGenerativeAI } from "@google/generative-ai";
// import * as Speech from 'expo-speech';
// import { Audio } from 'expo-av';

// const FarmerChatbotScreen: React.FC = () => {
//   // Initial messages with bilingual welcome message
//   const [messages, setMessages] = useState([
//     {
//       id: 0,
//       text: "नमस्ते किसान मित्र! मैं आपकी कृषि संबंधी समस्याओं में मदद करने के लिए यहाँ हूँ। \n(Hello farmer friend! I'm here to help you with your agricultural queries.)",
//       isBot: true
//     }
//   ]);
  
//   const [inputText, setInputText] = useState('');
//   const [isListening, setIsListening] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [recording, setRecording] = useState<Audio.Recording | null>(null);
  
//   const scrollViewRef = useRef<ScrollView>(null);

//   // Initialize Gemini AI (IMPORTANT: Replace with your actual API key)
//   const genAI = new GoogleGenerativeAI('AIzaSyBnaKP_EdrnAPH1qlR1nzAokz9DTrMnJDQ');

//   // Scroll to bottom of chat
//   useEffect(() => {
//     scrollViewRef.current?.scrollToEnd({ animated: true });
//   }, [messages]);

//   // Send message to AI
//   const sendMessage = async () => {
//     if (inputText.trim() === '') return;

//     // Add user message
//     const userMessage = { 
//       id: messages.length, 
//       text: inputText, 
//       isBot: false 
//     };
//     setMessages(prev => [...prev, userMessage]);
//     setInputText('');
//     setIsLoading(true);

//     try {
//       // Get the generative model
//       const model = genAI.getGenerativeModel({ 
//         model: "gemini-2.0-flash",
//       });

//       // Contextual prompt for Indian farmers
//       const prompt = `You are an AI agricultural assistant helping an Indian farmer. 
//       Provide practical, culturally sensitive, and region-specific agricultural advice. 
//       Use a mix of Hindi and English. Include:
//       - Specific crop recommendations
//       - Local farming techniques
//       - Seasonal agricultural insights
//       - Sustainable farming practices
      
//       Farmer's Query: ${inputText}`;

//       const result = await model.generateContent(prompt);
//       const botResponse = result.response.text();

//       // Add bot response
//       const botMessage = { 
//         id: messages.length + 1, 
//         text: botResponse, 
//         isBot: true 
//       };
//       setMessages(prev => [...prev, botMessage]);

//       // Speak the response
//       speakResponse(botResponse);
//     } catch (error) {
//       console.error('Error:', error);
//       const errorMessage = { 
//         id: messages.length + 1, 
//         text: "माफ़ कीजिए, एक त्रुटि हुई है। कृपया फिर प्रयास करें। \n(Sorry, an error occurred. Please try again.)", 
//         isBot: true 
//       };
//       setMessages(prev => [...prev, errorMessage]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Request microphone permissions
//   const requestMicrophonePermission = async () => {
//     if (Platform.OS !== 'web') {
//       const { status } = await Audio.requestPermissionsAsync();
//       return status === 'granted';
//     }
//     return false;
//   };

//   // Start voice recording
//   const startVoiceRecognition = async () => {
//     try {
//       // Request permission
//       const hasPermission = await requestMicrophonePermission();
//       if (!hasPermission) {
//         Alert.alert(
//           "माइक्रोफोन अनुमति",
//           "कृपया ध्वनि रिकॉर्डिंग के लिए माइक्रोफोन अनुमति दें। \n(Please grant microphone permission for voice recording.)"
//         );
//         return;
//       }

//       // Start recording
//       setIsListening(true);
//       const { recording } = await Audio.Recording.createAsync(
//         Audio.RecordingOptionsPresets.HIGH_QUALITY
//       );
//       setRecording(recording);
//     } catch (error) {
//       console.error('Voice recording error:', error);
//       setIsListening(false);
//       Alert.alert(
//         "त्रुटि \n(Error)", 
//         "ध्वनि रिकॉर्डिंग में समस्या। \n(Problem with voice recording.)"
//       );
//     }
//   };

//   // Stop recording and process
//   const stopVoiceRecognition = async () => {
//     setIsListening(false);
//     if (recording) {
//       await recording.stopAndUnloadAsync();
//       const uri = recording.getURI();
      
//       // TODO: Implement actual transcription service
//       Alert.alert(
//         "ध्वनि रिकॉर्डिंग \n(Voice Recording)",
//         "ध्वनि रिकॉर्ड की गई है। वास्तविक अनुवाद सेवा लागू करें। \n(Voice recorded. Implement actual transcription service.)"
//       );
      
//       setRecording(null);
//     }
//   };

//   // Text to Speech for bot responses
//   const speakResponse = (text: string) => {
//     Speech.speak(text, {
//       language: 'hi', // Hindi language
//       pitch: 1,
//       rate: 0.8
//     });
//   };

//   // Clear chat history
//   const clearChat = () => {
//     setMessages([
//       {
//         id: 0,
//         text: "नमस्ते किसान मित्र! मैं आपकी कृषि संबंधी समस्याओं में मदद करने के लिए यहाँ हूँ। \n(Hello farmer friend! I'm here to help you with your agricultural queries.)",
//         isBot: true
//       }
//     ]);
//   };

//   return (
//     <KeyboardAvoidingView 
//       style={styles.container}
//       behavior={Platform.OS === "ios" ? "padding" : "height"}
//     >
//       {/* Chat Messages */}
//       <ScrollView 
//         ref={scrollViewRef}
//         contentContainerStyle={styles.messagesContainer}
//       >
//         {messages.map((message) => (
//           <View 
//             key={message.id} 
//             style={[
//               styles.messageBubble, 
//               message.isBot ? styles.botMessage : styles.userMessage
//             ]}
//           >
//             <Text style={styles.messageText}>{message.text}</Text>
//           </View>
//         ))}
        
//         {isLoading && (
//           <View style={styles.loadingIndicator}>
//             <Text style={styles.loadingText}>AI सोच रहा है... \n(AI is thinking...)</Text>
//             <ActivityIndicator size="small" color="#666" />
//           </View>
//         )}
//       </ScrollView>

//       {/* Input Area */}
//       <View style={styles.inputContainer}>
//         {/* Clear Chat Button */}
//         <TouchableOpacity style={styles.iconButton} onPress={clearChat}>
//           <Ionicons name="trash" size={24} color="red" />
//         </TouchableOpacity>

//         {/* Text Input */}
//         <TextInput
//           style={styles.input}
//           value={inputText}
//           onChangeText={setInputText}
//           placeholder="अपना संदेश यहाँ लिखें... \n(Type your message here...)"
//           multiline
//           placeholderTextColor="#888"
//         />

//         {/* Voice Input Button */}
//         <TouchableOpacity 
//           style={styles.iconButton} 
//           onPress={isListening ? stopVoiceRecognition : startVoiceRecognition}
//         >
//           <Ionicons 
//             name={isListening ? "stop" : "mic"} 
//             size={24} 
//             color={isListening ? "red" : "black"} 
//           />
//         </TouchableOpacity>

//         {/* Send Button */}
//         <TouchableOpacity style={styles.iconButton} onPress={sendMessage}>
//           <Ionicons name="send" size={24} color="black" />
//         </TouchableOpacity>
//       </View>
//     </KeyboardAvoidingView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F5F5F5',
//   },
//   messagesContainer: {
//     flexGrow: 1,
//     padding: 10,
//     justifyContent: 'flex-end',
//   },
//   messageBubble: {
//     maxWidth: '80%',
//     padding: 10,
//     borderRadius: 10,
//     marginVertical: 5,
//   },
//   userMessage: {
//     alignSelf: 'flex-end',
//     backgroundColor: '#DCF8C6',
//   },
//   botMessage: {
//     alignSelf: 'flex-start',
//     backgroundColor: '#FFFFFF',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   messageText: {
//     fontSize: 16,
//     color: '#333',
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 10,
//     backgroundColor: 'white',
//     borderTopWidth: 1,
//     borderTopColor: '#E0E0E0',
//   },
//   input: {
//     flex: 1,
//     minHeight: 50,
//     maxHeight: 120,
//     borderWidth: 1,
//     borderColor: '#CCCCCC',
//     borderRadius: 20,
//     paddingHorizontal: 15,
//     marginHorizontal: 10,
//     backgroundColor: 'white',
//   },
//   iconButton: {
//     padding: 10,
//   },
//   loadingIndicator: {
//     alignSelf: 'flex-start',
//     backgroundColor: '#F0F0F0',
//     padding: 10,
//     borderRadius: 10,
//     marginVertical: 5,
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   loadingText: {
//     color: '#666',
//     fontStyle: 'italic',
//     marginRight: 10,
//   },
// });

// export default FarmerChatbotScreen;




import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView, 
  KeyboardAvoidingView, 
  Platform,
  ActivityIndicator,
  Alert,
  Dimensions
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { GoogleGenerativeAI } from "@google/generative-ai";
import * as Speech from 'expo-speech';
import { Audio } from 'expo-av';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

const FarmerChatbotScreen: React.FC = () => {
  // Initial messages with enhanced welcome message
  const [messages, setMessages] = useState([
    {
      id: 0,
      text: "🌾 किसान दोस्त, आपका स्वागत है! मैं आपकी कृषि यात्रा में सहायक हूँ। \n(Welcome, farmer friend! I'm here to support your agricultural journey.)",
      isBot: true,
      type: 'welcome'
    }
  ]);
  
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [language, setLanguage] = useState<'hi' | 'en'>('hi');
  
  const scrollViewRef = useRef<ScrollView>(null);

  // Initialize Gemini AI (IMPORTANT: Replace with your actual API key)
  const genAI = new GoogleGenerativeAI('AIzaSyBnaKP_EdrnAPH1qlR1nzAokz9DTrMnJDQ');

  // Scroll to bottom of chat
  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  // Language toggle function
  const toggleLanguage = () => {
    setLanguage(prev => prev === 'hi' ? 'en' : 'hi');
  };

  // Clear chat history
  const clearChat = () => {
    setMessages([
      {
        id: 0,
        text: "🌾 किसान दोस्त, आपका स्वागत है! मैं आपकी कृषि यात्रा में सहायक हूँ। \n(Welcome, farmer friend! I'm here to support your agricultural journey.)",
        isBot: true,
        type: 'welcome'
      }
    ]);
  };

  // Text to Speech for bot responses
  const speakResponse = (text: string) => {
    Speech.speak(text, {
      language: language,
      pitch: 1,
      rate: 0.8
    });
  };

  // Send message to AI
  const sendMessage = async () => {
    if (inputText.trim() === '') return;

    // Add user message
    const userMessage = { 
      id: messages.length, 
      text: inputText, 
      isBot: false,
      type: 'user'
    };
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      // Get the generative model
      const model = genAI.getGenerativeModel({ 
        model: "gemini-2.0-flash",
      });

      // Enhanced contextual prompt
      const prompt = `You are an advanced AI agricultural assistant for Indian farmers. 
      Provide practical, culturally sensitive, and region-specific agricultural advice. 
      Use a mix of Hindi and English. Adapt your tone to be supportive and encouraging.
      Include:
      - Specific crop recommendations for different regions
      - Local farming techniques
      - Seasonal agricultural insights
      - Sustainable and economic farming practices
      - Simple, actionable advice
      - Do not answer in long , just answer in a way that farmer are able to understand and implement ur solution 
      
      Language Preference: ${language === 'hi' ? 'Respond primarily in Hindi with English translation' : 'Respond in clear, simple English'}
      
      Farmer's Query: ${inputText}`;

      const result = await model.generateContent(prompt);
      const botResponse = result.response.text();

      // Add bot response
      const botMessage = { 
        id: messages.length + 1, 
        text: botResponse, 
        isBot: true,
        type: 'bot'
      };
      setMessages(prev => [...prev, botMessage]);

      // Speak the response
      speakResponse(botResponse);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = { 
        id: messages.length + 1, 
        text: "🚨 क्षमा करें, एक त्रुटि हुई है। कृपया पुनः प्रयास करें। \n(Sorry, an error occurred. Please try again.)", 
        isBot: true,
        type: 'error'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Request microphone permissions
  const requestMicrophonePermission = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await Audio.requestPermissionsAsync();
      return status === 'granted';
    }
    return false;
  };

  // Start voice recording
  const startVoiceRecognition = async () => {
    try {
      const hasPermission = await requestMicrophonePermission();
      if (!hasPermission) {
        Alert.alert(
          "माइक्रोफोन अनुमति",
          "कृपया ध्वनि रिकॉर्डिंग के लिए माइक्रोफोन अनुमति दें। \n(Please grant microphone permission for voice recording.)"
        );
        return;
      }

      setIsListening(true);
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
    } catch (error) {
      console.error('Voice recording error:', error);
      setIsListening(false);
      Alert.alert(
        "त्रुटि \n(Error)", 
        "ध्वनि रिकॉर्डिंग में समस्या। \n(Problem with voice recording.)"
      );
    }
  };

  // Stop recording and process
  const stopVoiceRecognition = async () => {
    setIsListening(false);
    if (recording) {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      
      Alert.alert(
        "ध्वनि रिकॉर्डिंग \n(Voice Recording)",
        "ध्वनि रिकॉर्ड की गई है। वास्तविक अनुवाद सेवा लागू करें। \n(Voice recorded. Implement actual transcription service.)"
      );
      
      setRecording(null);
    }
  };

  // Enhanced UI Rendering
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>किसान सहायक 🌱 (Farmer Assistant)</Text>
        <TouchableOpacity onPress={toggleLanguage} style={styles.languageToggle}>
          <Text style={styles.languageToggleText}>
            {language === 'hi' ? 'EN' : 'हिं'}
          </Text>
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView 
        style={styles.chatContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {/* Chat Messages */}
        <ScrollView 
          ref={scrollViewRef}
          contentContainerStyle={styles.messagesContainer}
          showsVerticalScrollIndicator={false}
        >
          {messages.map((message) => (
            <Animated.View 
              key={message.id} 
              entering={FadeIn}
              exiting={FadeOut}
              style={[
                styles.messageBubble, 
                message.isBot ? styles.botMessage : styles.userMessage,
                message.type === 'welcome' && styles.welcomeMessage,
                message.type === 'error' && styles.errorMessage
              ]}
            >
              <Text style={styles.messageText}>{message.text}</Text>
            </Animated.View>
          ))}
          
          {isLoading && (
            <Animated.View 
              style={styles.loadingIndicator}
              entering={FadeIn}
              exiting={FadeOut}
            >
              <ActivityIndicator size="small" color="#4CAF50" />
              <Text style={styles.loadingText}>AI सोच रहा है... (AI is thinking...)</Text>
            </Animated.View>
          )}
        </ScrollView>

        {/* Input Area */}
        <View style={styles.inputContainer}>
          {/* Clear Chat Button */}
          <TouchableOpacity 
            style={styles.actionButton} 
            onPress={clearChat}
          >
            <MaterialIcons name="clear-all" size={24} color="#FF5252" />
          </TouchableOpacity>

          {/* Text Input */}
          <TextInput
            style={styles.input}
            value={inputText}
            onChangeText={setInputText}
            placeholder={language === 'hi' 
              ? "अपना संदेश यहाँ लिखें..." 
              : "Type your message here..."}
            multiline
            placeholderTextColor="#888"
          />

          {/* Voice Input Button */}
          <TouchableOpacity 
            style={styles.actionButton} 
            onPress={isListening ? stopVoiceRecognition : startVoiceRecognition}
          >
            <Ionicons 
              name={isListening ? "stop-circle" : "mic-circle"} 
              size={36} 
              color={isListening ? "#FF5252" : "#4CAF50"} 
            />
          </TouchableOpacity>

          {/* Send Button */}
          <TouchableOpacity 
            style={styles.actionButton} 
            onPress={sendMessage}
            disabled={inputText.trim() === ''}
          >
            <Ionicons 
              name="send-sharp" 
              size={24} 
              color={inputText.trim() === '' ? "#CCCCCC" : "#4CAF50"} 
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F5E9', // Light green background
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? 50 : 30,
    paddingBottom: 15,
    backgroundColor: '#4CAF50', // Green header
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
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
  },
  chatContainer: {
    flex: 1,
  },
  messagesContainer: {
    flexGrow: 1,
    padding: 15,
    justifyContent: 'flex-end',
  },
  messageBubble: {
    maxWidth: '85%',
    padding: 12,
    borderRadius: 15,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#DCF8C6', // Light green for user messages
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF', // White for bot messages
  },
  welcomeMessage: {
    backgroundColor: '#E3F2FD', // Light blue for welcome message
    alignSelf: 'center',
    width: '90%',
    textAlign: 'center',
  },
  errorMessage: {
    backgroundColor: '#FFEBEE', // Light red for error messages
    borderWidth: 1,
    borderColor: '#FF5252',
  },
  messageText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 22,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  input: {
    flex: 1,
    minHeight: 50,
    maxHeight: 120,
    borderWidth: 1,
    borderColor: '#4CAF50',
    borderRadius: 25,
    paddingHorizontal: 15,
    marginHorizontal: 10,
    backgroundColor: '#F1F8E9', // Very light green
  },
  actionButton: {
    padding: 5,
  },
  loadingIndicator: {
    alignSelf: 'flex-start',
    backgroundColor: '#F0F0F0',
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  loadingText: {
    color: '#666',
    fontStyle: 'italic',
    marginLeft: 10,
  },
});

export default FarmerChatbotScreen;