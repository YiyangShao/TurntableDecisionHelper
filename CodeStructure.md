## Files:
1. `App.js`: The root component of the app. Responsible for rendering the main components of the decision helper.
2. `src/components/Turntable.js`: Handles the logic of the turntable and integrates other components.
   - Options are auto-saved to AsyncStorage and reflected in real-time on the turntable and input fields.
   - The turntable spins a random number of degrees, and a fixed black pointer at the top selects the result.
   - Plays a sound when the pointer crosses the border of each section, with throttled sound playback for high-frequency spins.
3. `src/components/TurntableVisual.js`: Displays the animated turntable as a pie chart, including split lines between sections, rotating option text, and different colors for each section.
4. `src/components/OptionInput.js`: Handles input for adding multiple decision options, each with its own input line and remove button.
5. `src/styles.js`: Contains shared styles for all components, with updated dimensions for the larger turntable and fixed pointer positioning.
6. `assets/sounds/click.mp3`: The sound file that plays when the pointer crosses a section.
