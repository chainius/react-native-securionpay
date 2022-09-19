import * as React from 'react';

import { StyleSheet, View, Text, Button } from 'react-native';
import { Init, LaunchPayment } from 'react-native-securionpay-sdk';

Init('<api key>', '<bundleidentifier for ios | signature >');

export default function App() {
  const [result, setResult] = React.useState<string | undefined>();

  var launch = function () {
    // test data from https://securionpay.com/docs/testing
    LaunchPayment(
      '4012001800000016', // cardnumber
      '12', // exp month
      '2022', // exp year
      '123', // cvv
      1000, // amount multuplied by 100
      'EUR' // currency
    )
      .then((x) => {
        setResult(JSON.stringify(x));
        console.log(x);
      })
      .catch((x) => {
        setResult(JSON.stringify(x.message));
        console.log(x);
      });
  };

  return (
    <View style={styles.container}>
      <Text>{result}</Text>
      <Button title="Pay" onPress={launch}>
        Pay
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
