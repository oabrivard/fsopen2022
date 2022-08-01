import { StyleSheet, View } from 'react-native';
import { useField } from 'formik';
import TextInput from './TextInput';
import Text from './Text';

const styles = StyleSheet.create({
  inputBox: {
    borderStyle:'solid',
    borderWidth: 1,
    borderColor: '#D3D3D3',
    padding: 5,
    margin: 10
  },
  errorText: {
    marginTop: -5,
    marginLeft: 10,
    color: 'red'
  },
});

const FormikTextInput = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name);
  const showError = meta.touched && meta.error;

  return (<>
      <View style={showError ? {...styles.inputBox, borderColor:'red'} : styles.inputBox}>
        <TextInput
          onChangeText={value => helpers.setValue(value)}
          onBlur={() => helpers.setTouched(true)}
          value={field.value}
          error={showError}
          {...props}
        />
      </View>
      {showError && <Text style={styles.errorText}>{meta.error}</Text>}
    </>
  );
};

export default FormikTextInput;