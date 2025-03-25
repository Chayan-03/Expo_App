import React, { useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { ChevronRight, Video, Tractor, FileText, PlayCircle } from 'lucide-react';

const governmentSchemes = [
  {
    id: 1,
    title: 'PM Kisan Samman Nidhi Yojana',
    description: 'Direct income support of ₹6,000 per year to farmers',
    link: 'https://pmkisan.gov.in/'
  },
  {
    id: 2,
    title: 'Pradhan Mantri Fasal Bima Yojana',
    description: 'Crop insurance scheme to protect farmers from crop losses',
    link: 'https://pmfby.gov.in/'
  }
];

const latestMachinery = [
  {
    id: 1,
    name: 'Smart Tractor X2000',
    description: 'Advanced GPS-enabled tractor with precision farming features',
    image: '/api/placeholder/200/150'
  },
  {
    id: 2,
    name: 'Automated Seed Drill',
    description: 'Precision planting with reduced seed and fertilizer waste',
    image: '/api/placeholder/200/150'
  }
];

const youtubeVideos = [
  {
    id: 1,
    title: 'Modern Farming Techniques',
    channel: 'Krishi Vibhag',
    thumbnailUrl: '/api/placeholder/300/200',
    videoUrl: 'https://www.youtube.com/watch?v=example'
  },
  {
    id: 2,
    title: 'Sustainable Agriculture Practices',
    channel: 'Agricultural Ministry',
    thumbnailUrl: '/api/placeholder/300/200',
    videoUrl: 'https://www.youtube.com/watch?v=example'
  }
];

const FarmersDashboard = () => {
  const [selectedSection, setSelectedSection] = useState('schemes');

  const openLink = (url: string) => {
    Linking.openURL(url);
  };

  const renderSchemes = () => (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Government Schemes</Text>
      {governmentSchemes.map(scheme => (
        <TouchableOpacity 
          key={scheme.id} 
          style={styles.cardContainer}
          onPress={() => openLink(scheme.link)}
        >
          <View style={styles.cardContent}>
            <FileText color="#2ecc71" size={24} />
            <View style={styles.cardTextContainer}>
              <Text style={styles.cardTitle}>{scheme.title}</Text>
              <Text style={styles.cardDescription}>{scheme.description}</Text>
            </View>
            <ChevronRight color="#95a5a6" />
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderMachinery = () => (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Latest Agricultural Machinery</Text>
      {latestMachinery.map(machine => (
        <View key={machine.id} style={styles.machineCard}>
          <Image 
            source={{ uri: machine.image }} 
            style={styles.machineImage} 
          />
          <View style={styles.machineTextContainer}>
            <Text style={styles.machineTitle}>{machine.name}</Text>
            <Text style={styles.machineDescription}>{machine.description}</Text>
          </View>
        </View>
      ))}
    </View>
  );

  const renderVideos = () => (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Government Agriculture Videos</Text>
      {youtubeVideos.map(video => (
        <TouchableOpacity 
          key={video.id} 
          style={styles.videoCard}
          onPress={() => openLink(video.videoUrl)}
        >
          <Image 
            source={{ uri: video.thumbnailUrl }} 
            style={styles.videoThumbnail} 
          />
          <View style={styles.videoTextContainer}>
            <Text style={styles.videoTitle}>{video.title}</Text>
            <Text style={styles.videoChannel}>{video.channel}</Text>
          </View>
          <PlayCircle color="#3498db" size={24} />
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Kisan Seva</Text>
        <Text style={styles.headerSubtitle}>Your Agricultural Information Hub</Text>
      </View>

      <View style={styles.navigationContainer}>
        <TouchableOpacity 
          style={[
            styles.navButton, 
            selectedSection === 'schemes' && styles.activeNavButton
          ]}
          onPress={() => setSelectedSection('schemes')}
        >
          <FileText 
            color={selectedSection === 'schemes' ? '#2ecc71' : '#7f8c8d'}
            size={20} 
          />
          <Text style={styles.navButtonText}>Schemes</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[
            styles.navButton, 
            selectedSection === 'machinery' && styles.activeNavButton
          ]}
          onPress={() => setSelectedSection('machinery')}
        >
          <Tractor 
            color={selectedSection === 'machinery' ? '#3498db' : '#7f8c8d'}
            size={20} 
          />
          <Text style={styles.navButtonText}>Machinery</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[
            styles.navButton, 
            selectedSection === 'videos' && styles.activeNavButton
          ]}
          onPress={() => setSelectedSection('videos')}
        >
          <Video 
            color={selectedSection === 'videos' ? '#e74c3c' : '#7f8c8d'}
            size={20} 
          />
          <Text style={styles.navButtonText}>Videos</Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {selectedSection === 'schemes' && renderSchemes()}
        {selectedSection === 'machinery' && renderMachinery()}
        {selectedSection === 'videos' && renderVideos()}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6f7',
  },
  headerContainer: {
    backgroundColor: '#2ecc71',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 15,
  },
  headerTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    color: 'white',
    fontSize: 14,
    marginTop: 5,
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  activeNavButton: {
    backgroundColor: '#e8f5e9',
  },
  navButtonText: {
    marginLeft: 8,
    color: '#7f8c8d',
    fontWeight: '500',
  },
  scrollContainer: {
    flex: 1,
    paddingTop: 15,
  },
  sectionContainer: {
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#2c3e50',
  },
  cardContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  cardTextContainer: {
    flex: 1,
    marginLeft: 15,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  cardDescription: {
    fontSize: 14,
    color: '#7f8c8d',
    marginTop: 5,
  },
  machineCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  machineImage: {
    width: '100%',
    height: 200,
  },
  machineTextContainer: {
    padding: 15,
  },
  machineTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  machineDescription: {
    fontSize: 14,
    color: '#7f8c8d',
    marginTop: 5,
  },
  videoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 15,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  videoThumbnail: {
    width: 100,
    height: 80,
    borderRadius: 8,
  },
  videoTextContainer: {
    flex: 1,
    marginLeft: 15,
  },
  videoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  videoChannel: {
    fontSize: 14,
    color: '#7f8c8d',
    marginTop: 5,
  },
});

export default FarmersDashboard;