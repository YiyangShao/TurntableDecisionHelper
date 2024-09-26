## Files:
1. `App.js`: The root component of the app. Responsible for rendering the main components of the decision helper.
2. `src/components/Turntable.js`: Handles the logic of the turntable and integrates other components.
   - Options are auto-saved to AsyncStorage and reflected in real-time on the turntable and input fields.
   - The turntable arranges the options as an even pie chart, with split lines between sections.
3. `src/components/TurntableVisual.js`: Displays the animated turntable as a pie chart, including split lines between sections and rotating text in the middle of each section.
4. `src/components/OptionInput.js`: Handles input for adding multiple decision options, each with its own input line and remove button.
5. `src/styles.js`: Contains shared styles for all components.
