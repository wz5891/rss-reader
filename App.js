import React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, Text, IconRegistry, Card } from '@ui-kitten/components';
import { Button, Icon } from '@ui-kitten/components';

import { EvaIconsPack } from '@ui-kitten/eva-icons';

const HomeScreen = () => (
  <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <LoginButton></LoginButton>

    <Card>
      <Text>
        The Maldives, officially the Republic of Maldives, is a small country in South Asia,
        located in the Arabian Sea of the Indian Ocean.
        It lies southwest of Sri Lanka and India, about 1,000 kilometres (620 mi) from the Asian continent
      </Text>
    </Card>
  </Layout>
);

const FacebookIcon = (props) => (
  <Icon name='facebook' {...props} />
);
const LoginButton = () => (
  <Button accessoryLeft={FacebookIcon}>Login with Facebook</Button>
);

export default () => (
  <>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider {...eva} theme={eva.light}>
      <HomeScreen />
    </ApplicationProvider>
  </>
);
