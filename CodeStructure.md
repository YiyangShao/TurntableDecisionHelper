## Files:
1. `App.js`: The root component of the app. Responsible for rendering the main components of the decision helper.
2. `src/components/Turntable.js`: Handles the logic of the turntable and integrates other components.
   - Options are auto-saved to AsyncStorage and reflected in real-time on the turntable and input fields, including removals.
3. `src/components/TurntableVisual.js`: Displays the animated turntable and its options, arranged in an even pie chart layout.
4. `src/components/OptionInput.js`: Handles input for adding multiple decision options, each with its own input line and remove button. Automatically updates the turntable when options are added or removed. Reflects loaded options in input fields.
5. `src/styles.js`: Contains shared styles for all components, including the circular layout for the turntable options.
