import NfcManager, {
  NfcTech,
  Ndef,
  NfcA,
} from 'react-native-nfc-manager';

const countChar = (strang, c) => {
  var result = 0;
  var i = 0;
  for (i; i < strang.length; i++) {
    if (strang[i] === c) {
      result++;
    }
  }
  return result;
};

// converts seconds into hh:mm:ss form
const timeConverter = time => {
  let h =
    parseInt(time / 3600) >= 10
      ? `${parseInt(time / 3600)}:`
      : `0${parseInt(time / 3600)}:`;
  let m =
    parseInt((time % 3600) / 60) >= 10
      ? `${parseInt((time % 3600) / 60)}:`
      : `0${parseInt((time % 3600) / 60)}:`;
  let s = time % 60 >= 10 ? `${time % 60}` : `0${time % 60}`;
  return h + m + s;
};

const readNdef = async () => {
  console.log('reading');
  try {
    // register for the NFC tag with NDEF in it
    await NfcManager.requestTechnology(NfcTech.Ndef);
    // the resolved tag object will contain `ndefMessage` property
    const tag = await NfcManager.getTag();
    let payload = tag.ndefMessage[0].payload;
    let message = '';
    for (let i = 0; i < payload.length; i++) {
      message += String.fromCharCode(payload[i]);
    }
    console.warn('Tag found', message);
    return tag;
  } catch (e) {
    console.log(e.message);
  } finally {
    // stop the nfc scanning
    NfcManager.cancelTechnologyRequest();
  }
};

const writeNdef = async () => {
  // let result = false;

  // try {
  //   // STEP 1
  //   await NfcManager.requestTechnology(NfcTech.NfcA);

  //   const bytes = Ndef.encodeMessage([Ndef.textRecord('unlock')]);

  //   if (bytes) {
  //     await NfcManager.nfcAHandler // STEP 2
  //       .transceive(bytes); // STEP 3
  //     result = true;
  //   }
  // } catch (ex) {
  //   console.warn(ex);
  // } finally {
  //   // STEP 4
  //   NfcManager.cancelTechnologyRequest();
  // }

  // return result;

  let result = false;

  try {
    // STEP 1
    await NfcManager.requestTechnology(NfcTech.Ndef);

    const bytes = Ndef.encodeMessage([Ndef.textRecord('unlock')]);

    if (bytes) {
      await NfcManager.ndefHandler // STEP 2
        .writeNdefMessage(bytes); // STEP 3
      result = true;
    }
  } catch (ex) {
    console.warn(ex);
  } finally {
    // STEP 4
    NfcManager.cancelTechnologyRequest();
  }

  return result;
};

module.exports = {
  countChar: countChar,
  timeConverter: timeConverter,
  readNdef: readNdef,
  writeNdef: writeNdef,
};
