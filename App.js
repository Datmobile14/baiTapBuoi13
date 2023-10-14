import React, { useState } from "react";
import { Button, View, Text, TextInput, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [ttDangNhap, setTTDangNhap] = useState("");

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 40 }}>Thong tin dang nhap: {ttDangNhap}</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />

      <Button
        title="Luu thong tin"
        onPress={async () => {
          if (username.trim() === "" || password.trim() === "") {
            console.log("Vui lòng điền đầy đủ thông tin!");
            return;
          }

          let dangNhap = {
            username: username,
            password: password,
          };

          try {
            const jsonValue = JSON.stringify(dangNhap);
            await AsyncStorage.setItem("dangnhap", jsonValue);

            console.log("Đã lưu");
          } catch (e) {
            console.log(e);
          }
        }}
      />

      <Button
        title="Lay thong tin"
        onPress={async () => {
          try {
            const jsonValue = await AsyncStorage.getItem("dangnhap");

            let tt = JSON.parse(jsonValue);
            setTTDangNhap(tt.username + " - " + tt.password);
          } catch (e) {
            console.log(e);
          }
        }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 40,
    width: 200,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});
