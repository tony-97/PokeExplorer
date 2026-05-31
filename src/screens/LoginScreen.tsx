import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/actions';
import { RootState } from '../store/store';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const loginError = useSelector((state: RootState) => state.loginError);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    dispatch(login(username, password));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MaterialDesignIcons
          name="account-circle"
          size={64}
          color="#1976D2"
          style={{ marginBottom: 8 }}
        />
        <Text style={styles.title}>Iniciar sesión</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Usuario"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
        leftIcon={<MaterialDesignIcons name="account" size={20} color="#888" />}
      />
      <View style={styles.passwordRow}>
        <TextInput
          style={[styles.input, { flex: 1, color: '#222' }]}
          placeholder="Contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          placeholderTextColor="#888"
        />
        <TouchableOpacity
          onPress={() => setShowPassword(v => !v)}
          style={styles.eyeIcon}
        >
          <MaterialDesignIcons
            name={showPassword ? 'eye' : 'eye-off'}
            size={24}
            color="#888"
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <MaterialDesignIcons
          name="login"
          size={24}
          color="#fff"
          style={{ marginRight: 8 }}
        />
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
      {loginError ? <Text style={styles.error}>{loginError}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#F5F5F5',
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    color: '#1976D2',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    width: 280,
    height: 44,
    borderColor: '#E0E0E0',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  passwordRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 280,
    marginBottom: 16,
  },
  eyeIcon: {
    marginLeft: 8,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1976D2',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    marginTop: 16,
    fontSize: 16,
  },
});
