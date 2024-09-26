/**
 * Turntable.js - Main logic for spinning the turntable and managing options.
 * The turntable now spins a random number of degrees, with a stationary pointer at the top.
 * The spinning starts fast and slows down gradually at the end.
 */

import React, { useState, useEffect, useRef } from 'react';
import { View, TouchableOpacity, Text, Animated, Easing } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Audio } from 'expo-av';
import TurntableVisual from './TurntableVisual';
import OptionInput from './OptionInput';
import styles from '../styles';

const Turntable = () => {
  const [spinValue] = useState(new Animated.Value(0));
  const [selectedOption, setSelectedOption] = useState(null);
  const [options, setOptions] = useState([]);
  const [rotationAngle, setRotationAngle] = useState(0); // Track current rotation angle
  const [sound, setSound] = useState(); // Store the sound object
  const sectionAngle = 360 / options.length; // Calculate the angle of each section

  const lastPlayedSection = useRef(null); // Keep track of the last section that triggered the sound
  const lastSoundPlayedTime = useRef(0); // Keep track of when the sound was last played
  const minSoundInterval = 100; // Minimum time interval between sound plays (in milliseconds)

  // Key for AsyncStorage
  const STORAGE_KEY = '@options_list';

  useEffect(() => {
    loadOptions();
    return () => {
      if (sound) {
        sound.unloadAsync(); // Unload sound on component unmount
      }
    };
  }, [sound]);

  // Load sound file
  async function loadSound() {
    const { sound } = await Audio.Sound.createAsync(
      require('../../assets/sounds/click.mp3') // Replace with your sound file path
    );
    setSound(sound);
  }

  useEffect(() => {
    loadSound();
  }, []);

  const loadOptions = async () => {
    try {
      const savedOptions = await AsyncStorage.getItem(STORAGE_KEY);
      if (savedOptions !== null) {
        const parsedOptions = JSON.parse(savedOptions);
        setOptions(parsedOptions);
      }
    } catch (error) {
      console.error('Error loading options from storage:', error);
    }
  };

  const saveOptions = async (newOptions) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newOptions));
    } catch (error) {
      console.error('Error saving options to storage:', error);
    }
  };

  const updateOptions = (inputValues) => {
    const updatedOptions = inputValues
      .map((value) => value.trim())
      .filter((value) => value); // Filter out empty inputs

    setOptions(updatedOptions);
    saveOptions(updatedOptions); // Save updated options list
  };

  const playClickSound = async () => {
    const currentTime = Date.now();
    if (currentTime - lastSoundPlayedTime.current >= minSoundInterval) {
      // Ensure that enough time has passed since the last sound play
      if (sound) {
        await sound.replayAsync();
      }
      lastSoundPlayedTime.current = currentTime; // Update the time the sound was last played
    }
  };

  const checkForSectionCrossing = (currentAngle) => {
    const normalizedAngle = currentAngle % 360;
    const currentSection = Math.floor(normalizedAngle / sectionAngle);

    if (currentSection !== lastPlayedSection.current) {
      playClickSound();
      lastPlayedSection.current = currentSection;
    }
  };

  // Function to spin the turntable a random number of degrees with fast deceleration at the start and slow at the end
  const spinTurntable = () => {
    if (options.length === 0) return;

    const randomDegrees = Math.floor(Math.random() * 360) + 720; // Spin at least two full rotations + random degrees
    const newRotationAngle = rotationAngle + randomDegrees; // Add to the current rotation

    setRotationAngle(newRotationAngle); // Update the rotation angle state
    lastPlayedSection.current = null; // Reset the section tracker

    // Custom easing: Start fast, slow down gradually at the end
    Animated.timing(spinValue, {
      toValue: newRotationAngle,
      duration: 5000, // Duration of the spin (5 seconds, can be adjusted)
      easing: Easing.out(Easing.cubic), // Use cubic easing for a fast-to-slow effect
      useNativeDriver: true,
    }).start(() => {
      const segmentAngle = 360 / options.length;
      const normalizedAngle = newRotationAngle % 360; // Normalize the angle between 0 and 360
      const selectedIndex = Math.floor((360 - normalizedAngle) / segmentAngle) % options.length;
      setSelectedOption(options[selectedIndex]); // Select the option based on the angle
    });

    // Set up a listener for each animation frame
    spinValue.addListener(({ value }) => {
      checkForSectionCrossing(value);
    });
  };

  const spin = spinValue.interpolate({
    inputRange: [0, 360],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      {/* Option inputs */}
      <OptionInput onUpdateOptions={updateOptions} initialOptions={options} />

      {/* Stationary pointer */}
      <View style={styles.pointer}>
        <Text style={styles.pointerText}>▼</Text>
      </View>

      {/* Rotating turntable */}
      <Animated.View style={{ transform: [{ rotate: spin }] }}>
        <TurntableVisual options={options} />
      </Animated.View>

      {/* Spin button */}
      <TouchableOpacity style={styles.spinButton} onPress={spinTurntable}>
        <Text style={styles.spinText}>Spin</Text>
      </TouchableOpacity>

      {/* Display the selected option */}
      {selectedOption && <Text style={styles.resultText}>You selected: {selectedOption}</Text>}
    </View>
  );
};

export default Turntable;
