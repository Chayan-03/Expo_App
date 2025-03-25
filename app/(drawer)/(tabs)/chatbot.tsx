// import React, { useState, useRef } from 'react';
// import { 
//   View, 
//   Text, 
//   TextInput, 
//   TouchableOpacity, 
//   StyleSheet, 
//   ScrollView, 
//   KeyboardAvoidingView, 
//   Platform 
// } from 'react-native';
// import { GoogleGenerativeAI } from "@google/generative-ai";
// import { Mic, Send, RefreshCw } from 'lucide-react';
// import * as Speech from 'expo-speech';
// import Voice from '@react-native-voice/voice';

// const FarmerChatbotScreen = () => {
//   const [messages, setMessages] = useState([
//     {
//       id: 0,
//       text: "नमस्ते! मैं आपकी कृषि संबंधी समस्याओं में मदद करने के लिए यहाँ हूँ। (Hello! I'm here to help you with your agricultural queries.)",
//       isBot: true
//     }
//   ]);
//   const [inputText, setInputText] = useState('');
//   const [isListening, setIsListening] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const scrollViewRef = useRef<ScrollView>(null);

//   // Initialize Gemini AI
//   const genAI = new GoogleGenerativeAI('AIzaSyBnaKP_EdrnAPH1qlR1nzAokz9DTrMnJDQ');

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

//       // Generate content with context for Indian farmers
//       const prompt = `You are an AI assistant helping an Indian farmer. Provide a helpful, practical, and culturally sensitive response to the following query. 
//       Use simple language, preferably mix of English and Hindi. Include actionable advice:
      
//       Query: ${inputText}`;

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
//         text: "माफ़ कीजिए, एक त्रुटि हुई है। कृपया फिर प्रयास करें। (Sorry, an error occurred. Please try again.)", 
//         isBot: true 
//       };
//       setMessages(prev => [...prev, errorMessage]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Speech to Text functionality
//   const startVoiceRecognition = async () => {
//     setIsListening(true);
//     try {
//       await Voice.start('hi-IN'); // Start listening in Hindi
//     } catch (error) {
//       console.error('Voice recognition error:', error);
//       setIsListening(false);
//     }
//   };

//   // Voice recognition results
//   Voice.onSpeechResults = (e) => {
//     if (e.value && e.value.length > 0) {
//       const recognizedText = e.value[0];
//       setInputText(recognizedText);
//     }
//     setIsListening(false);
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
//         text: "नमस्ते! मैं आपकी कृषि संबंधी समस्याओं में मदद करने के लिए यहाँ हूँ। (Hello! I'm here to help you with your agricultural queries.)",
//         isBot: true
//       }
//     ]);
//   };

//   return (
//     <KeyboardAvoidingView 
//       style={styles.container}
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//     >
//       {/* Chat Messages */}
//       <ScrollView
//         ref={scrollViewRef}
//         onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
//         style={styles.messagesContainer}
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
//             <Text style={styles.loadingText}>AI is thinking...</Text>
//           </View>
//         )}
//       </ScrollView>

//       {/* Input Area */}
//       <View style={styles.inputContainer}>
//         {/* Clear Chat Button */}
//         <TouchableOpacity onPress={clearChat} style={styles.iconButton}>
//           <RefreshCw color="#007BFF" size={24} />
//         </TouchableOpacity>

//         {/* Text Input */}
//         <TextInput
//           style={styles.input}
//           value={inputText}
//           onChangeText={setInputText}
//           placeholder="अपना सवाल यहाँ लिखें (Type your question here)"
//           placeholderTextColor="#888"
//           multiline
//         />

//         {/* Voice Input Button */}
//         <TouchableOpacity 
//           onPress={startVoiceRecognition} 
//           style={styles.iconButton}
//         >
//           <Mic 
//             color={isListening ? 'red' : '#007BFF'} 
//             size={24} 
//           />
//         </TouchableOpacity>

//         {/* Send Button */}
//         <TouchableOpacity 
//           onPress={sendMessage} 
//           style={styles.iconButton}
//         >
//           <Send color="#007BFF" size={24} />
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
//     flex: 1,
//     padding: 10,
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
//   },
//   loadingText: {
//     color: '#666',
//     fontStyle: 'italic',
//   },
// });

// export default FarmerChatbotScreen;




// import React, { useState, useRef } from 'react';
// import { 
//   View, 
//   Text, 
//   TextInput, 
//   TouchableOpacity, 
//   StyleSheet, 
//   ScrollView, 
//   KeyboardAvoidingView, 
//   Platform 
// } from 'react-native';
// import { GoogleGenerativeAI } from "@google/generative-ai";
// import { Mic, Send, RefreshCw } from 'lucide-react';
// import * as Speech from 'expo-speech';
// import Voice from '@react-native-voice/voice';

// const FarmerChatbotScreen: React.FC = () => {
//   const [messages, setMessages] = useState([
//     {
//       id: 0,
//       text: "नमस्ते! मैं आपकी कृषि संबंधी समस्याओं में मदद करने के लिए यहाँ हूँ। (Hello! I'm here to help you with your agricultural queries.)",
//       isBot: true
//     }
//   ]);
//   const [inputText, setInputText] = useState('');
//   const [isListening, setIsListening] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const scrollViewRef = useRef<ScrollView>(null);

//   // Initialize Gemini AI
//   const genAI = new GoogleGenerativeAI('AIzaSyBnaKP_EdrnAPH1qlR1nzAokz9DTrMnJDQ');

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
//         model: "gemini-pro",  // Updated model name
//       });

//       // Generate content with context for Indian farmers
//       const prompt = `You are an AI assistant helping an Indian farmer. Provide a helpful, practical, and culturally sensitive response to the following query. 
//       Use simple language, preferably mix of English and Hindi. Include actionable advice:
      
//       Query: ${inputText}`;

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
//         text: "माफ़ कीजिए, एक त्रुटि हुई है। कृपया फिर प्रयास करें। (Sorry, an error occurred. Please try again.)", 
//         isBot: true 
//       };
//       setMessages(prev => [...prev, errorMessage]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Speech to Text functionality
//   const startVoiceRecognition = async () => {
//     setIsListening(true);
//     try {
//       await Voice.start('hi-IN'); // Start listening in Hindi
//     } catch (error) {
//       console.error('Voice recognition error:', error);
//       setIsListening(false);
//     }
//   };

//   // Voice recognition results
//   Voice.onSpeechResults = (e: any) => {
//     if (e.value && e.value.length > 0) {
//       const recognizedText = e.value[0];
//       setInputText(recognizedText);
//     }
//     setIsListening(false);
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
//         text: "नमस्ते! मैं आपकी कृषि संबंधी समस्याओं में मदद करने के लिए यहाँ हूँ। (Hello! I'm here to help you with your agricultural queries.)",
//         isBot: true
//       }
//     ]);
//   };

//   return (
//     <KeyboardAvoidingView 
//       style={styles.container}
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//     >
//       {/* Chat Messages */}
//       <ScrollView
//         ref={scrollViewRef}
//         onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
//         style={styles.messagesContainer}
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
//             <Text style={styles.loadingText}>AI is thinking...</Text>
//           </View>
//         )}
//       </ScrollView>

//       {/* Input Area */}
//       <View style={styles.inputContainer}>
//         {/* Clear Chat Button */}
//         <TouchableOpacity onPress={clearChat} style={styles.iconButton}>
//           <RefreshCw color="#007BFF" size={24} />
//         </TouchableOpacity>

//         {/* Text Input */}
//         <TextInput
//           style={styles.input}
//           value={inputText}
//           onChangeText={setInputText}
//           placeholder="अपना सवाल यहाँ लिखें (Type your question here)"
//           placeholderTextColor="#888"
//           multiline
//         />

//         {/* Voice Input Button */}
//         <TouchableOpacity 
//           onPress={startVoiceRecognition} 
//           style={styles.iconButton}
//         >
//           <Mic 
//             color={isListening ? 'red' : '#007BFF'} 
//             size={24} 
//           />
//         </TouchableOpacity>

//         {/* Send Button */}
//         <TouchableOpacity 
//           onPress={sendMessage} 
//           style={styles.iconButton}
//         >
//           <Send color="#007BFF" size={24} />
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
//     flex: 1,
//     padding: 10,
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
//   },
//   loadingText: {
//     color: '#666',
//     fontStyle: 'italic',
//   },
// });

// export default FarmerChatbotScreen;






// import React, { useState, useRef } from 'react';
// import { 
//   View, 
//   Text, 
//   TextInput, 
//   TouchableOpacity, 
//   StyleSheet, 
//   ScrollView, 
//   KeyboardAvoidingView, 
//   Platform 
// } from 'react-native';
// import { GoogleGenerativeAI } from "@google/generative-ai";
// import { Mic as MicIcon, Send as SendIcon, RefreshCw as RefreshCwIcon } from 'lucide-react-native';
// import * as Speech from 'expo-speech';
// import Voice from '@react-native-voice/voice';

// const FarmerChatbotScreen: React.FC = () => {
//   const [messages, setMessages] = useState([
//     {
//       id: 0,
//       text: "नमस्ते! मैं आपकी कृषि संबंधी समस्याओं में मदद करने के लिए यहाँ हूँ। (Hello! I'm here to help you with your agricultural queries.)",
//       isBot: true
//     }
//   ]);
//   const [inputText, setInputText] = useState('');
//   const [isListening, setIsListening] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const scrollViewRef = useRef<ScrollView>(null);

//   // Initialize Gemini AI
//   const genAI = new GoogleGenerativeAI('AIzaSyBnaKP_EdrnAPH1qlR1nzAokz9DTrMnJDQ');

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
//         model: "gemini-pro",
//       });

//       // Generate content with context for Indian farmers
//       const prompt = `You are an AI assistant helping an Indian farmer. Provide a helpful, practical, and culturally sensitive response to the following query. 
//       Use simple language, preferably mix of English and Hindi. Include actionable advice:
      
//       Query: ${inputText}`;

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
//         text: "माफ़ कीजिए, एक त्रुटि हुई है। कृपया फिर प्रयास करें। (Sorry, an error occurred. Please try again.)", 
//         isBot: true 
//       };
//       setMessages(prev => [...prev, errorMessage]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Speech to Text functionality
//   const startVoiceRecognition = async () => {
//     setIsListening(true);
//     try {
//       await Voice.start('hi-IN'); // Start listening in Hindi
//     } catch (error) {
//       console.error('Voice recognition error:', error);
//       setIsListening(false);
//     }
//   };

//   // Voice recognition results
//   Voice.onSpeechResults = (e: any) => {
//     if (e.value && e.value.length > 0) {
//       const recognizedText = e.value[0];
//       setInputText(recognizedText);
//     }
//     setIsListening(false);
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
//         text: "नमस्ते! मैं आपकी कृषि संबंधी समस्याओं में मदद करने के लिए यहाँ हूँ। (Hello! I'm here to help you with your agricultural queries.)",
//         isBot: true
//       }
//     ]);
//   };

//   return (
//     <KeyboardAvoidingView 
//       style={styles.container}
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//     >
//       {/* Chat Messages */}
//       <ScrollView
//         ref={scrollViewRef}
//         onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
//         style={styles.messagesContainer}
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
//             <Text style={styles.loadingText}>AI is thinking...</Text>
//           </View>
//         )}
//       </ScrollView>

//       {/* Input Area */}
//       <View style={styles.inputContainer}>
//         {/* Clear Chat Button */}
//         <TouchableOpacity onPress={clearChat} style={styles.iconButton}>
//           <RefreshCwIcon color="#007BFF" size={24} />
//         </TouchableOpacity>

//         {/* Text Input */}
//         <TextInput
//           style={styles.input}
//           value={inputText}
//           onChangeText={setInputText}
//           placeholder="अपना सवाल यहाँ लिखें (Type your question here)"
//           placeholderTextColor="#888"
//           multiline
//         />

//         {/* Voice Input Button */}
//         <TouchableOpacity 
//           onPress={startVoiceRecognition} 
//           style={styles.iconButton}
//         >
//           <MicIcon 
//             color={isListening ? 'red' : '#007BFF'} 
//             size={24} 
//           />
//         </TouchableOpacity>

//         {/* Send Button */}
//         <TouchableOpacity 
//           onPress={sendMessage} 
//           style={styles.iconButton}
//         >
//           <SendIcon color="#007BFF" size={24} />
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
//     flex: 1,
//     padding: 10,
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
//   },
//   loadingText: {
//     color: '#666',
//     fontStyle: 'italic',
//   },
// });

// export default FarmerChatbotScreen;





// import React, { useState, useRef } from 'react';
// import { 
//   View, 
//   Text, 
//   TextInput, 
//   TouchableOpacity, 
//   StyleSheet, 
//   ScrollView, 
//   KeyboardAvoidingView, 
//   Platform 
// } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { GoogleGenerativeAI } from "@google/generative-ai";
// import * as Speech from 'expo-speech';
// import Voice from '@react-native-voice/voice';

// const FarmerChatbotScreen: React.FC = () => {
//   const [messages, setMessages] = useState([
//     {
//       id: 0,
//       text: "नमस्ते! मैं आपकी कृषि संबंधी समस्याओं में मदद करने के लिए यहाँ हूँ। (Hello! I'm here to help you with your agricultural queries.)",
//       isBot: true
//     }
//   ]);
//   const [inputText, setInputText] = useState('');
//   const [isListening, setIsListening] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const scrollViewRef = useRef<ScrollView>(null);

//   // Initialize Gemini AI
//   const genAI = new GoogleGenerativeAI('AIzaSyBnaKP_EdrnAPH1qlR1nzAokz9DTrMnJDQ');

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

//       // Generate content with context for Indian farmers
//       const prompt = `You are an AI assistant helping an Indian farmer. Provide a helpful, practical, and culturally sensitive response to the following query. 
//       Use simple language, preferably mix of English and Hindi. Include actionable advice:
      
//       Query: ${inputText}`;

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
//         text: "माफ़ कीजिए, एक त्रुटि हुई है। कृपया फिर प्रयास करें। (Sorry, an error occurred. Please try again.)", 
//         isBot: true 
//       };
//       setMessages(prev => [...prev, errorMessage]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Speech to Text functionality
//   const startVoiceRecognition = async () => {
//     setIsListening(true);
//     try {
//       await Voice.start('hi-IN'); // Start listening in Hindi
//     } catch (error) {
//       console.error('Voice recognition error:', error);
//       setIsListening(false);
//     }
//   };

//   // Voice recognition results
//   Voice.onSpeechResults = (e: any) => {
//     if (e.value && e.value.length > 0) {
//       const recognizedText = e.value[0];
//       setInputText(recognizedText);
//     }
//     setIsListening(false);
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
//         text: "नमस्ते! मैं आपकी कृषि संबंधी समस्याओं में मदद करने के लिए यहाँ हूँ। (Hello! I'm here to help you with your agricultural queries.)",
//         isBot: true
//       }
//     ]);
//   };

//   return (
//     <KeyboardAvoidingView 
//       style={styles.container}
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//     >
//       {/* Chat Messages */}
//       <ScrollView
//         ref={scrollViewRef}
//         onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
//         style={styles.messagesContainer}
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
//             <Text style={styles.loadingText}>AI is thinking...</Text>
//           </View>
//         )}
//       </ScrollView>

//       {/* Input Area */}
//       <View style={styles.inputContainer}>
//         {/* Clear Chat Button */}
//         <TouchableOpacity onPress={clearChat} style={styles.iconButton}>
//           <Ionicons name="refresh" color="#007BFF" size={24} />
//         </TouchableOpacity>

//         {/* Text Input */}
//         <TextInput
//           style={styles.input}
//           value={inputText}
//           onChangeText={setInputText}
//           placeholder="अपना सवाल यहाँ लिखें (Type your question here)"
//           placeholderTextColor="#888"
//           multiline
//         />

//         {/* Voice Input Button */}
//         <TouchableOpacity 
//           onPress={startVoiceRecognition} 
//           style={styles.iconButton}
//         >
//           <Ionicons 
//             name="mic" 
//             color={isListening ? 'red' : '#007BFF'} 
//             size={24} 
//           />
//         </TouchableOpacity>

//         {/* Send Button */}
//         <TouchableOpacity 
//           onPress={sendMessage} 
//           style={styles.iconButton}
//         >
//           <Ionicons name="send" color="#007BFF" size={24} />
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
//     flex: 1,
//     padding: 10,
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
//   },
//   loadingText: {
//     color: '#666',
//     fontStyle: 'italic',
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
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { GoogleGenerativeAI } from "@google/generative-ai";
import * as Speech from 'expo-speech';
import { Audio } from 'expo-av';

const FarmerChatbotScreen: React.FC = () => {
  // Initial messages with bilingual welcome message
  const [messages, setMessages] = useState([
    {
      id: 0,
      text: "नमस्ते किसान मित्र! मैं आपकी कृषि संबंधी समस्याओं में मदद करने के लिए यहाँ हूँ। \n(Hello farmer friend! I'm here to help you with your agricultural queries.)",
      isBot: true
    }
  ]);
  
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  
  const scrollViewRef = useRef<ScrollView>(null);

  // Initialize Gemini AI (IMPORTANT: Replace with your actual API key)
  const genAI = new GoogleGenerativeAI('AIzaSyBnaKP_EdrnAPH1qlR1nzAokz9DTrMnJDQ');

  // Scroll to bottom of chat
  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  // Send message to AI
  const sendMessage = async () => {
    if (inputText.trim() === '') return;

    // Add user message
    const userMessage = { 
      id: messages.length, 
      text: inputText, 
      isBot: false 
    };
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      // Get the generative model
      const model = genAI.getGenerativeModel({ 
        model: "gemini-2.0-flash",
      });

      // Contextual prompt for Indian farmers
      const prompt = `You are an AI agricultural assistant helping an Indian farmer. 
      Provide practical, culturally sensitive, and region-specific agricultural advice. 
      Use a mix of Hindi and English. Include:
      - Specific crop recommendations
      - Local farming techniques
      - Seasonal agricultural insights
      - Sustainable farming practices
      
      Farmer's Query: ${inputText}`;

      const result = await model.generateContent(prompt);
      const botResponse = result.response.text();

      // Add bot response
      const botMessage = { 
        id: messages.length + 1, 
        text: botResponse, 
        isBot: true 
      };
      setMessages(prev => [...prev, botMessage]);

      // Speak the response
      speakResponse(botResponse);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = { 
        id: messages.length + 1, 
        text: "माफ़ कीजिए, एक त्रुटि हुई है। कृपया फिर प्रयास करें। \n(Sorry, an error occurred. Please try again.)", 
        isBot: true 
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
      // Request permission
      const hasPermission = await requestMicrophonePermission();
      if (!hasPermission) {
        Alert.alert(
          "माइक्रोफोन अनुमति",
          "कृपया ध्वनि रिकॉर्डिंग के लिए माइक्रोफोन अनुमति दें। \n(Please grant microphone permission for voice recording.)"
        );
        return;
      }

      // Start recording
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
      
      // TODO: Implement actual transcription service
      Alert.alert(
        "ध्वनि रिकॉर्डिंग \n(Voice Recording)",
        "ध्वनि रिकॉर्ड की गई है। वास्तविक अनुवाद सेवा लागू करें। \n(Voice recorded. Implement actual transcription service.)"
      );
      
      setRecording(null);
    }
  };

  // Text to Speech for bot responses
  const speakResponse = (text: string) => {
    Speech.speak(text, {
      language: 'hi', // Hindi language
      pitch: 1,
      rate: 0.8
    });
  };

  // Clear chat history
  const clearChat = () => {
    setMessages([
      {
        id: 0,
        text: "नमस्ते किसान मित्र! मैं आपकी कृषि संबंधी समस्याओं में मदद करने के लिए यहाँ हूँ। \n(Hello farmer friend! I'm here to help you with your agricultural queries.)",
        isBot: true
      }
    ]);
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {/* Chat Messages */}
      <ScrollView 
        ref={scrollViewRef}
        contentContainerStyle={styles.messagesContainer}
      >
        {messages.map((message) => (
          <View 
            key={message.id} 
            style={[
              styles.messageBubble, 
              message.isBot ? styles.botMessage : styles.userMessage
            ]}
          >
            <Text style={styles.messageText}>{message.text}</Text>
          </View>
        ))}
        
        {isLoading && (
          <View style={styles.loadingIndicator}>
            <Text style={styles.loadingText}>AI सोच रहा है... \n(AI is thinking...)</Text>
            <ActivityIndicator size="small" color="#666" />
          </View>
        )}
      </ScrollView>

      {/* Input Area */}
      <View style={styles.inputContainer}>
        {/* Clear Chat Button */}
        <TouchableOpacity style={styles.iconButton} onPress={clearChat}>
          <Ionicons name="trash" size={24} color="red" />
        </TouchableOpacity>

        {/* Text Input */}
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="अपना संदेश यहाँ लिखें... \n(Type your message here...)"
          multiline
          placeholderTextColor="#888"
        />

        {/* Voice Input Button */}
        <TouchableOpacity 
          style={styles.iconButton} 
          onPress={isListening ? stopVoiceRecognition : startVoiceRecognition}
        >
          <Ionicons 
            name={isListening ? "stop" : "mic"} 
            size={24} 
            color={isListening ? "red" : "black"} 
          />
        </TouchableOpacity>

        {/* Send Button */}
        <TouchableOpacity style={styles.iconButton} onPress={sendMessage}>
          <Ionicons name="send" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  messagesContainer: {
    flexGrow: 1,
    padding: 10,
    justifyContent: 'flex-end',
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#DCF8C6',
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  messageText: {
    fontSize: 16,
    color: '#333',
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
    borderColor: '#CCCCCC',
    borderRadius: 20,
    paddingHorizontal: 15,
    marginHorizontal: 10,
    backgroundColor: 'white',
  },
  iconButton: {
    padding: 10,
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
    marginRight: 10,
  },
});

export default FarmerChatbotScreen;