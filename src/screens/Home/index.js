/*
 *
 * @author DatTD
 * Created on Wed Jul 15 2020
 * Copyright (c) 2020 ApecSoft
 *
 */
import React, {useEffect, useState, useRef} from 'react';
import {View, ActivityIndicator, Text, Alert, Picker} from 'react-native';
import {Images} from '@config/index';
import styles from './styles';
import {Header, InputCustom} from '@components';
import QRCode from 'react-native-qrcode-svg';
import {TouchableOpacity} from 'react-native-gesture-handler';
import RNFS from 'react-native-fs';
import CameraRoll from '@react-native-community/cameraroll';
import Share from 'react-native-share';
import RNSmtpMailer from 'react-native-smtp-mailer';
// import RNPickerSelect from 'react-native-picker-select';
import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded,
} from 'react-native-admob';

export default function Home(props) {
  const [value, setValue] = useState('anh nho em');
  const [infoEmail, setInfoEmail] = useState({
    subject: '',
    recipients: '',
    body: '',
  });
  const [time, setTime] = useState({
    hour: new Date().getHours(),
    minute: new Date().getMinutes(),
    second: new Date().getSeconds(),
  });
  const [loading, setLoading] = useState(false);
  const [selectedValue, setSelectedValue] = useState('java');
  const viewRef = useRef();
  const onCreateSendEmail = async () => {
    var file = '';
    setLoading(true);
    viewRef.current.toDataURL((data) => {
      RNFS.writeFile(
        RNFS.CachesDirectoryPath + '/image.png',
        data,
        'base64',
      ).then((success) => {
        console.log('vaooo');
        file = RNFS.CachesDirectoryPath + '/image.png';
        console.log('file', file);

        RNSmtpMailer.sendMail({
          mailhost: 'smtp.gmail.com',
          port: '465',
          ssl: true,
          username: 'anhlnmor@gmail.com',
          password: 'Nguyenanh@1998',
          from: 'incognito',
          recipients: infoEmail?.recipients,
          subject: infoEmail?.subject,
          htmlBody: infoEmail?.body,
          attachmentPaths: [file], // optional
          attachmentNames: ['test.jpg'],
        })
          .then((success) => {
            setLoading(false);
            Alert.alert('Success');
          })
          .catch((err) => {
            setLoading(false);
            Alert.alert(err);
          });
      });
    });
  };

  const saveImage = () => {
    viewRef.current.toDataURL((data) => {
      RNFS.writeFile(RNFS.CachesDirectoryPath + '/thuynham.png', data, 'base64')
        .then((success) => {
          return CameraRoll.saveToCameraRoll(
            RNFS.CachesDirectoryPath + '/thuynham.png',
            'photo',
          );
        })
        .then(() => {
          console.log('saved');
        });
    });
  };

  const shareQR = () => {
    viewRef.current.toDataURL((data) => {
      const shareImageBase64 = {
        title: 'QR',
        message: 'Share QR',
        url: `data:image/png;base64,${data}`,
      };
      Share.open(shareImageBase64);
    });
  };

  // useEffect(() => {
  //   let setTimer = setInterval(() => {
  //     setTime({
  //       hour: new Date().getHours(),
  //       minute: new Date().getMinutes(),
  //       second: new Date().getSeconds(),
  //     });
  //   }, 1000);
  //   return () => clearInterval(setTimer);
  // }, []);

  // useEffect(() => {
  //   let realTime = `${time?.hour}:${time?.minute}:${time?.second}`;
  //   if (realTime == '22:45:0') {
  //     onCreateSendEmail();
  //   }
  // }, [time]);

  console.log('info', infoEmail);
  return (
    <View style={styles.container}>
      <Header contentTitle="Create QR" />
      <View style={styles.content}>
        <InputCustom placeholder="Message QR Code" onChangeText={setValue} />
        <InputCustom
          placeholder="Subject"
          onChangeText={(text) => setInfoEmail({...infoEmail, subject: text})}
        />
        <InputCustom
          placeholder="Recipientse"
          onChangeText={(text) =>
            setInfoEmail({...infoEmail, recipients: text})
          }
        />
        <InputCustom
          placeholder="Description"
          onChangeText={(text) => setInfoEmail({...infoEmail, body: text})}
        />
        <AdMobBanner
          adSize="leaderboard"
          adUnitID="ca-app-pub-3940256099942544/6300978111"
          testDevices={[AdMobBanner.simulatorId]}
          onAdFailedToLoad={(error) => console.error(error)}
        />
        <View style={styles.containerPicker}></View>
        <View style={styles.viewQR} collapsable={false}>
          <QRCode
            value={value || 'a'}
            // logo={Images.ic_thuy}
            logoSize={30}
            logoBackgroundColor="transparent"
            size={200}
            color="#000"
            getRef={(c) => (viewRef.current = c)}
          />
        </View>
        <View style={styles.viewBtn}>
          <TouchableOpacity onPress={saveImage} style={styles.btnSave}>
            <Text style={styles.colorText}>Save to Album</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={shareQR} style={styles.btnShare}>
            <Text style={styles.colorText}>Share QR</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.viewSendMail}>
          <TouchableOpacity
            // disabled={loading}
            onPress={onCreateSendEmail}
            style={loading ? styles.btnSendEmail : styles.btnShare}>
            <Text style={styles.colorText}>Send Mail</Text>
            {loading && <ActivityIndicator size="small" color="#fff" />}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
