import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  ActivityIndicator, 
  TouchableOpacity, 
  Image,
  Platform 
} from 'react-native';
import LottieView from 'lottie-react-native';
import { 
  Cloud, Sun, CloudRain, Wind, Droplet, 
  Cloud as CloudIcon, 
  Thermometer 
} from 'lucide-react-native';

// Enhanced Mock Data for Indian Agricultural Context
const MOCK_MSP_DATA = [
  { 
    crop: 'गेहूँ (Wheat)', 
    msp: '₹2275/क्विंटल', 
    change: '+2.3%', 
    icon: '🌾' 
  },
  { 
    crop: 'धान (Rice)', 
    msp: '₹1940/क्विंटल', 
    change: '+1.5%', 
    icon: '🍚' 
  },
  { 
    crop: 'कपास (Cotton)', 
    msp: '₹5450/क्विंटल', 
    change: '+3.1%', 
    icon: '🌿' 
  },
];

const MOCK_FARMER_CROPS = [
  { 
    name: 'गेहूँ (Wheat)', 
    area: '5 एकड़', 
    expectedYield: '75 क्विंटल', 
    health: 'अच्छा (Good)',
    icon: '🌾' 
  },
  { 
    name: 'कपास (Cotton)', 
    area: '3 एकड़', 
    expectedYield: '45 क्विंटल', 
    //health: 'संतोषजनक (Satisfactory)',
    health: 'अच्छा (Good)',
    icon: '🌿' 
  },
];

const AGRICULTURAL_ALERTS = [
  {
    id: 1,
    title: 'मौसम चेतावनी (Weather Alert)',
    description: 'अगले 3 दिनों में हल्की बारिश की संभावना',
    severity: 'low',
    icon: '🌧️'
  },
  {
    id: 2,
    title: 'फसल स्वास्थ्य (Crop Health)',
    description: 'कपास में कीट नियंत्रण की आवश्यकता',
    severity: 'medium',
    icon: '🐞'
  }
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
  const [language, setLanguage] = useState<'hi' | 'en'>('hi');

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

  const getWeatherIcon = (condition: string) => {
    const conditionLower = condition.toLowerCase();
    if (conditionLower.includes('sun') || conditionLower.includes('clear')) {
      return <Sun color="#FFA500" size={36} />;
    } else if (conditionLower.includes('rain')) {
      return <CloudRain color="#1E90FF" size={36} />;
    } else if (conditionLower.includes('cloud')) {
      return <CloudIcon color="#708090" size={36} />;
    } else {
      return <Cloud color="#708090" size={36} />;
    }
  };

  const Card = ({ children, style, title }: { 
    children: React.ReactNode, 
    style?: any,
    title?: string 
  }) => (
    <View style={[styles.cardContainer, style]}>
      {title && <Text style={styles.cardTitle}>{title}</Text>}
      {children}
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Language Toggle */}
      <View style={styles.languageToggle}>
        <TouchableOpacity 
          onPress={() => setLanguage('hi')}
          style={[
            styles.languageButton, 
            language === 'hi' && styles.activeLanguageButton
          ]}
        >
          <Text>हिं</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={() => setLanguage('en')}
          style={[
            styles.languageButton, 
            language === 'en' && styles.activeLanguageButton
          ]}
        >
          <Text>Eng</Text>
        </TouchableOpacity>
      </View>

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>
            {language === 'hi' ? 'नमस्ते, किसान!' : 'Hello, Farmer!'}
          </Text>
          <Text style={styles.dateText}>
            {new Date().toLocaleDateString('en-IN', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </Text>
        </View>
        <TouchableOpacity>
          <Image 
            source={require('@/assets/images/adaptive-icon.png')} 
            style={styles.profileImage} 
          />
        </TouchableOpacity>
      </View>

      {/* Agricultural Alerts */}
      <Card title={language === 'hi' ? 'महत्वपूर्ण सूचनाएं' : 'Important Alerts'}>
        {AGRICULTURAL_ALERTS.map((alert) => (
          <View key={alert.id} style={styles.alertItem}>
            <Text style={styles.alertIcon}>{alert.icon}</Text>
            <View style={styles.alertContent}>
              <Text style={styles.alertTitle}>{alert.title}</Text>
              <Text style={styles.alertDescription}>{alert.description}</Text>
            </View>
          </View>
        ))}
      </Card>

      {/* Weather Section */}
      <Card title={language === 'hi' ? 'मौसम अपडेट' : 'Weather Update'}>
        {loading ? (
          <ActivityIndicator size="large" color="#2196F3" />
        ) : weatherData ? (
          <View style={styles.weatherContent}>
            <View style={styles.weatherHeader}>
              <Text style={styles.cityName}>New Delhi</Text>
              {getWeatherIcon(weatherData.current.condition.text)}
            </View>
            <View style={styles.weatherDetails}>
              <View style={styles.weatherDetailItem}>
                <Thermometer color="#FF5722" size={24} />
                <Text>{weatherData.current.temp_c}°C</Text>
              </View>
              <View style={styles.weatherDetailItem}>
                <Droplet color="#2196F3" size={24} />
                <Text>{weatherData.current.humidity}%</Text>
              </View>
              <View style={styles.weatherDetailItem}>
                <Wind color="#9C27B0" size={24} />
                <Text>{weatherData.current.wind_kph} km/h</Text>
              </View>
            </View>
            <Text style={styles.conditionText}>
              {weatherData.current.condition.text}
            </Text>
          </View>
        ) : (
          <Text>Unable to fetch weather data.</Text>
        )}
      </Card>

      {/* MSP Prices Section */}
      <Card title={language === 'hi' ? 'वर्तमान एमएसपी मूल्य' : 'Current MSP Prices'}>
        {MOCK_MSP_DATA.map((crop, index) => (
          <View key={index} style={styles.mspItem}>
            <View style={styles.cropIconAndName}>
              <Text style={styles.cropIcon}>{crop.icon}</Text>
              <Text style={styles.cropName}>{crop.crop}</Text>
            </View>
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
      <Card title={language === 'hi' ? 'मेरी फसलें' : 'My Crops'}>
        {MOCK_FARMER_CROPS.map((crop, index) => (
          <View key={index} style={styles.cropItem}>
            <View style={styles.cropIconAndName}>
              <Text style={styles.cropIcon}>{crop.icon}</Text>
              <Text style={styles.cropName}>{crop.name}</Text>
            </View>
            <View style={styles.cropDetails}>
              <Text>
                {language === 'hi' ? 'क्षेत्र' : 'Area'}: {crop.area}
              </Text>
              <Text>
                {language === 'hi' ? 'अनुमानित उपज' : 'Expected Yield'}: {crop.expectedYield}
              </Text>
              <Text>
                {language === 'hi' ? 'स्वास्थ्य' : 'Health'}: {crop.health}
              </Text>
            </View>
          </View>
        ))}
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8',
    paddingTop: Platform.OS === 'ios' ? 50 : 30,
    paddingHorizontal: 16,
  },
  languageToggle: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 10,
  },
  languageButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginLeft: 10,
    borderRadius: 20,
    backgroundColor: '#E0E0E0',
  },
  activeLanguageButton: {
    backgroundColor: '#2196F3',
    color: 'white',
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
    padding: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2c3e50',
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
  dateText: {
    fontSize: 14,
    color: '#666',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  alertItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    padding: 10,
  },
  alertIcon: {
    fontSize: 24,
    marginRight: 10,
  },
  alertContent: {
    flex: 1,
  },
  alertTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  alertDescription: {
    color: '#666',
  },
  weatherContent: {
    alignItems: 'center',
  },
  weatherHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 15,
  },
  cityName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  weatherDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  weatherDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  conditionText: {
    fontSize: 16,
    color: '#666',
  },
  mspItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  cropIconAndName: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cropIcon: {
    fontSize: 24,
    marginRight: 10,
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
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  cropDetails: {
    alignItems: 'flex-end',
  },
});