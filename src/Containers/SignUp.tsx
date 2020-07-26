import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useFormik} from 'formik';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  ImageRequireSource,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useDispatch} from 'react-redux';
import * as Yup from 'yup';
import {loginUser} from '../Action';
import {RootStackParamList} from '../App';
import Colors from '../Theme/Colors';
import Fonts from '../Theme/Fonts';

const illustration = require('../../Assets/Images/Login.png') as ImageRequireSource;

type SignUpNavigationProp = StackNavigationProp<RootStackParamList, 'SignUp'>;

export interface SignUpProps {
  navigation: SignUpNavigationProp;
}

const ValidationSchema = Yup.object().shape({
  email: Yup.string().email('email').required('email'),
  password: Yup.string().required('password'),
});

const SignUp: React.FC<SignUpProps> = ({navigation}) => {
  const {navigate} = useNavigation();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: () => {
      setLoading(true);
      auth()
        .createUserWithEmailAndPassword(values.email, values.password)
        .then(() => {
          setLoading(false);
          dispatch(
            loginUser({
              email: values.email,
            }),
          );
          navigation.replace('Tabs');
        })
        .catch((error) => {
          if (error.code === 'auth/email-already-in-use') {
            Alert.alert('That email address is already in use!');
          }

          if (error.code === 'auth/invalid-email') {
            Alert.alert('That email address is invalid!');
          }

          Alert.alert(error.code);
          setLoading(false);
        });
    },
    validationSchema: ValidationSchema,
  });

  const {
    errors,
    touched,
    values,
    handleChange,
    handleSubmit,
    handleBlur,
  } = formik;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      enabled
      style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle={'dark-content'} />
      <SafeAreaView style={styles.container}>
        <Image source={illustration} style={styles.img} />
        <ScrollView
          style={styles.content}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          showsVerticalScrollIndicator={false}>
          <View style={styles.title}>
            <View style={styles.verticalPadding}>
              <Text style={styles.SignUpText}>Sign Up</Text>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <View style={styles.textRow}>
              <Text style={styles.fieldTitle}>Email</Text>
            </View>
            <View style={styles.fullWidth}>
              <TextInput
                style={[
                  styles.input,
                  styles.removeMargin,
                  errors.email && touched.email ? styles.error : {},
                ]}
                onChangeText={handleChange('email') as (text: string) => void}
                onBlur={handleBlur('email') as (event: Event) => void}
                value={values.email}
                blurOnSubmit={false}
                autoCapitalize={'words'}
                autoCorrect={false}
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <View style={styles.textRow}>
              <Text style={styles.fieldTitle}>Password</Text>
            </View>
            <View style={styles.fullWidth}>
              <TextInput
                style={[
                  styles.input,
                  styles.removeMargin,
                  errors.password && touched.password ? styles.error : {},
                ]}
                onChangeText={
                  handleChange('password') as (text: string) => void
                }
                onBlur={handleBlur('password') as (event: Event) => void}
                value={values.password}
                blurOnSubmit={false}
                secureTextEntry
              />
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => handleSubmit()}
              style={styles.filledBtn}>
              <Text
                style={[styles.loginBtnText, loading && styles.marginRight10]}>
                SignUp
              </Text>
              {loading && <ActivityIndicator color={Colors.black} />}
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <Text>Already have an account ?</Text>
            <TouchableOpacity onPress={() => navigate('Login')}>
              <Text style={styles.signUpBtnText}>Login</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  img: {
    width: '90%',
    height: '50%',
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  SignUpText: {
    fontSize: Fonts.l,
    fontFamily: Fonts.bold,
    color: Colors.black,
    alignSelf: 'center',
  },
  content: {marginHorizontal: 25},
  title: {marginTop: 20},
  verticalPadding: {paddingVertical: 5},
  inputContainer: {marginTop: 15},
  textRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  removeMargin: {marginHorizontal: 0},
  input: {
    height: 55,
    borderWidth: 1,
    borderColor: Colors.darkGrey,
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    fontSize: Fonts.sm,
    color: Colors.darkGrey,
  },
  fullWidth: {width: '100%'},
  error: {borderColor: 'red'},
  buttonContainer: {alignItems: 'center', marginTop: 25},
  filledBtn: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
    borderWidth: 1,
    borderRadius: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  signUpBtnText: {
    fontFamily: Fonts.semiBold,
    color: Colors.primary,
    marginTop: 10,
  },
  loginBtnText: {
    fontFamily: Fonts.semiBold,
    color: Colors.black,
  },
  fieldTitle: {
    fontFamily: Fonts.regular,
    color: Colors.black,
  },
  marginRight10: {marginRight: 10},
});
