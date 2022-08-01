import { TextInput as NativeTextInput } from 'react-native';

//const styles = StyleSheet.create({});

const TextInput = ({ style, ...props }) => {
  const textInputStyle = [style];

  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;