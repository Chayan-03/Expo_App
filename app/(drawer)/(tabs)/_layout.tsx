// import { Tabs } from 'expo-router';
// import React from 'react';
// import { Platform } from 'react-native';
// import Ionicons from '@expo/vector-icons/Ionicons';
// import { HapticTab } from '@/components/HapticTab';
// import { IconSymbol } from '@/components/ui/IconSymbol';
// import TabBarBackground from '@/components/ui/TabBarBackground';
// import { Colors } from '@/constants/Colors';
// import { useColorScheme } from '@/hooks/useColorScheme';
// import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
// import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

// export default function TabLayout() {
//   const colorScheme = useColorScheme();

//   return (
//     <Tabs
//       screenOptions={{
//         tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
//         headerShown: false,
//         tabBarButton: HapticTab,
//         tabBarBackground: TabBarBackground,
//         tabBarStyle: Platform.select({
//           ios: {
            
//             position: 'absolute',
//           },
//           default: {},
//         }),
//       }}>
//       <Tabs.Screen
//         name="home"
//         options={{
//           title: 'Home',
//           tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
//         }}
//       />
//       <Tabs.Screen
//         name="explore"
//         options={{
//           title: 'Explore',
//           tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
//         }}
//       />
//       <Tabs.Screen
//         name="marketplace"
//         options={{
//           title: 'Market',
//           tabBarIcon: ({ color }) => <FontAwesome5 name="rupee-sign" size={24} color="orange" />,
//         }}
//       />
//       <Tabs.Screen
//         name="chatbot"
//         options={{
//           title: 'Ask',
//           tabBarIcon: ({ color }) => <Ionicons name="chatbox" size={24} color="grey"  />,
//         }}
//       />
//       <Tabs.Screen
//         name="farmdetails"
//         options={{
//           title: 'Farm',
//           tabBarIcon: ({ color }) => <FontAwesome6 name="sun-plant-wilt" size={24} color="green"  />,
//         }}
//       />
//     </Tabs>
//   );
// }





import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, View, Text, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

// Custom Tab Icon with Label
const CustomTabIcon = ({ 
  Icon, 
  iconName, 
  label, 
  color, 
  iconType = 'default' 
}: {
  Icon?: any, 
  iconName: any, // TODO: Replace 'any' with proper type from IconSymbol component
  label: string, 
  color: string, 
  iconType?: 'default' | 'sf' | 'fontawesome5' | 'fontawesome6' | 'materialCommunity'
}) => {
  const renderIcon = () => {
    const iconProps = { 
      size: 24, 
      color: color 
    };

    switch(iconType) {
      case 'sf':
        return <IconSymbol size={28} name={iconName} color={color} />;
      case 'fontawesome5':
        return <FontAwesome5 name={iconName} {...iconProps} />;
      case 'fontawesome6':
        return <FontAwesome6 name={iconName} {...iconProps} />;
      case 'materialCommunity':
        return <MaterialCommunityIcons name={iconName} {...iconProps} />;
      default:
        return <Ionicons name={iconName} {...iconProps} />;
    }
  };

  return (
    <View style={styles.tabIconContainer}>
      {renderIcon()}
      <Text style={[styles.tabLabel, { color }]}>{label}</Text>
    </View>
  );
};

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const activeColor = Colors[colorScheme ?? 'light'].tint;
  const inactiveColor = '#888';

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: activeColor,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: [
          Platform.select({
            ios: {
              position: 'absolute',
              backgroundColor: 'rgba(255,255,255,0.9)',
              borderTopWidth: 0.5,
              borderTopColor: '#E0E0E0',
            },
            default: {
              backgroundColor: 'white',
              borderTopWidth: 0.5,
              borderTopColor: '#E0E0E0',
            }
          }),
          styles.tabBar
        ],
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'मुख्य पृष्ठ (Home)',
          tabBarIcon: ({ color }) => (
            <CustomTabIcon 
              iconType="sf" 
              iconName="house.fill" 
              label="होम" 
              color={color} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'खोजें (Explore)',
          tabBarIcon: ({ color }) => (
            <CustomTabIcon 
              iconType="sf" 
              iconName="paperplane.fill" 
              label="खोजें" 
              color={color} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="marketplace"
        options={{
          title: 'बाजार (Market)',
          tabBarIcon: ({ color }) => (
            <CustomTabIcon 
              iconType="fontawesome5" 
              iconName="rupee-sign" 
              label="बाजार" 
              color={color} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="chatbot"
        options={{
          title: 'सहायता (Support)',
          tabBarIcon: ({ color }) => (
            <CustomTabIcon 
              iconName="chatbox-outline" 
              label="सहायता" 
              color={color} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="farmdetails"
        options={{
          title: 'फार्म (Farm)',
          tabBarIcon: ({ color }) => (
            <CustomTabIcon 
              iconType="materialCommunity"
              iconName="sprout" 
              label="फार्म" 
              color={color} 
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 70,
    paddingBottom: 10,
    paddingTop: 5,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tabIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabLabel: {
    fontSize: 10,
    marginTop: 4,
    fontWeight: '500',
  },
});