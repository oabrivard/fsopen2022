import { Pressable, View } from 'react-native';
import { useNavigate } from 'react-router-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import Text from './Text';
import FormikTextInput from './FormikTextInput';
import theme from '../theme';
import useSignUp from '../hooks/useSignUp';
import useSignIn from '../hooks/useSignIn';

const initialValues = {
  username: '',
  password: '',
  passwordConfirm: '',
};

const SignUpForm = ({ onSubmit }) => {
  return (
    <View>
      <FormikTextInput name="username" placeholder="Username" />
      <FormikTextInput name="password" placeholder="Password" secureTextEntry />
      <FormikTextInput name="passwordConfirm" placeholder="Password confirmation" secureTextEntry />
      <Pressable onPress={onSubmit}>
        <View style={{flexDirection: 'row', marginTop: 10}}>
          <View style={{backgroundColor: theme.colors.primary, borderRadius: 5, flexGrow:1, margin: 10}}>
            <Text style={{padding: 15, color: 'white', textAlign: 'center'}}>Sign up</Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required'),
  password: yup
    .string()
    .length(5, 'Password must be at least 5 characters')
    .required('Password is required'),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Password confirmation must match password')
    .required('Password confirmation is required')  
});

export const SignUpContainer = ({ onSubmit }) => {
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
    </Formik>
  );
}

const SignUp = () => {
  const [signUp] = useSignUp();
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const { signUpData }  = await signUp({ username, password });
      console.log('sign up data: ', signUpData);
      const { signInData }  = await signIn({ username, password });
      console.log('sign in data: ', signInData);
      navigate('/');
    } catch (e) {
      console.log(e);
    }
  };

  return <SignUpContainer onSubmit={onSubmit} />;
};

export default SignUp;