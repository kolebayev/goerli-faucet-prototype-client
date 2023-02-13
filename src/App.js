import { useState } from 'react';
import { Layout, Button, Form, Input, Card, Collapse, Alert } from 'antd';
import Countdown from 'react-countdown';

import { validateInputEthAddress } from './utils/utils';
import useWindowDimensions from './utils/useWindowDimensions';

import logoFull from './images/logo-full.svg';
import logoShort from './images/logo-short.svg';
import ethereum from './images/ethereum.svg';
import './App.scss';

const { Header, Footer, Content } = Layout;
const { Panel } = Collapse;

function App() {
  const [form] = Form.useForm();
  const [submitState, setSubmitState] = useState(false);
  const { height, width } = useWindowDimensions();

  const collapseCopy = [
    {
      header: 'What is Chainstack faucet?',
      text: 'Chainstack Faucet provides developers with small amounts of testnet tokens for use in developing and testing decentralized applications (dApps) on a blockchain. A testnet is a testing environment for developers to test their applications before deploying them to a live, public blockchain. Testnet tokens are used as a way to simulate real tokens and to test the functionality of a dApp without using real assets or incurring real financial risk.',
    },
    {
      header: 'How to use faucet tokens?',
      text: 'Developers can use testnet tokens to test the functionality of their dApps, such as testing transactions, smart contracts, and other features. The tokens dispensed by a testnet token faucet can be used in a similar manner to real tokens, allowing developers to test their dApps in a real-world environment. When the development and testing are completed, the testnet tokens can be discarded, and the dApp can be deployed to the live, public blockchain.',
    },
  ];

  return (
    <Layout className="app">
      <Header className="header">
        <div className="header_main">
          <img
            src={width > 600 ? logoFull : logoShort}
            className="header_main_app-logo"
            alt="Chainstack labs"
          />
          <Button type="primary">Log in to Chainstack</Button>
        </div>
        <div className="header_subheader">
          <div>Fuel your decentralized future with </div>
          <div>Chainstack Faucet</div>
        </div>
      </Header>

      <Content className="content">
        <Card className="card">
          <div className="card_header">
            Receive up to 0.2 ETH
            <br />
            on{' '}
            <span>
              <img
                src={ethereum}
                className="eth-icon"
                alt="ethereum sepolia testnet"
              />
            </span>
            Sepolia testnet each 24&nbsp;hours
          </div>
          <Form
            layout="vertical"
            size="large"
            className="faucet-form"
            form={form}
            onFinish={() => {
              setSubmitState(true);
              console.log('Form Submitted');
            }}
            name="basicform"
          >
            <Form.Item
              name="walletAdress"
              rules={[
                {
                  message: 'Correct wallet adress is required.',
                  validator: (_, value) => {
                    if (value && validateInputEthAddress(value)) {
                      return Promise.resolve();
                    } else {
                      return Promise.reject('Some message here');
                    }
                  },
                },
              ]}
            >
              <Input placeholder="Enter wallet address 0x..." />
            </Form.Item>
            <Form.Item>
              {submitState === false ? (
                <Button
                  block
                  type="primary"
                  onClick={() => {
                    // setSubmitState(false);
                  }}
                  htmlType="submit"
                >
                  Get tokens
                </Button>
              ) : (
                <Alert
                  message={<span>Tokens successfully sent</span>}
                  description={
                    <span>
                      Next faucet is available after{' '}
                      <Countdown
                        onComplete={() => setSubmitState(false)}
                        date={Date.now() + 24 * 60 * 59.999 * 1000}
                        // date={Date.now() + 5 * 1000}
                        renderer={({ hours, minutes, seconds, completed }) =>
                          !completed && (
                            <span>
                              {hours < 10 ? '0' + hours : hours}:
                              {minutes < 10 ? '0' + minutes : minutes}:
                              {seconds < 10 ? '0' + seconds : seconds}
                            </span>
                          )
                        }
                      />
                    </span>
                  }
                  type="success"
                  showIcon
                />
              )}
            </Form.Item>
          </Form>
        </Card>
      </Content>
      <Footer className="footer">
        <Collapse>
          {collapseCopy.map((item, idx) => {
            return (
              <Panel header={item.header} key={idx}>
                <div>{item.text}</div>
              </Panel>
            );
          })}
        </Collapse>
        <div>Chainstack © 2023</div>
      </Footer>
    </Layout>
  );
}

export default App;
