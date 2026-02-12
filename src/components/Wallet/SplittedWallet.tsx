import { BeaconEvent, defaultEventCallbacks } from "@tezos-x/octez.connect-sdk"
import { BeaconWallet } from "@tezos-x/octez.js-dapp-wallet"
import { TezosToolkit } from "@tezos-x/octez.js"
import Config from "../../Config"
import { useEffect } from "react"
import { Button, Card, Row, Col } from "react-bootstrap"
import UserInfo from "../Faucet/UserInfo"
import { Network, TestnetContext, UserContext } from "../../lib/Types"

function SplittedWallet({
  user,
  testnetContext,
  network,
}: {
  user: UserContext
  testnetContext: TestnetContext
  network: Network
}) {
  /**
   * Set user address and balances on wallet connection
   */
  const setup = async (userAddress: string): Promise<void> => {
    user.setUserAddress(userAddress)

    const balance = await testnetContext.Tezos.tz.getBalance(userAddress)
    user.setUserBalance(balance.toNumber())
  }

  const wallet = new BeaconWallet({ name: Config.application.name })

  // active account event
  wallet.client.subscribeToEvent(BeaconEvent.ACTIVE_ACCOUNT_SET, async (account) => {
    await setup(account.address)
  });


  const connectWallet = async (): Promise<void> => {
    if (!network.networkType) {
      console.error("No network defined.")
      return
    }

    try {
      const permissions = await wallet.client.requestPermissions();
    } catch (err: any) {
      console.log("Could not connect to wallet:\n", err.message);
    }

  }

  useEffect(() => {
    ;(async () => {
      // creates a wallet instance
      testnetContext.Tezos.setWalletProvider(wallet)
      testnetContext.setWallet(wallet)

      const activeAccount = await wallet.client.getActiveAccount()
      if (activeAccount) {
        const userAddress = activeAccount.address
        await setup(userAddress)
      }

    })()
  }, [])

  const disconnectWallet = async (): Promise<void> => {

    user.setUserAddress("")
    user.setUserBalance(0)

    try {
      await wallet.client.disconnect();
    } catch (err: any) {
      console.log("Could not disconnect from wallet:\n", err.message);
    }

    window.location.reload()
  }

  return (
    <Card>
      <Card.Header>My wallet</Card.Header>
      <Card.Body>
        {user.userAddress ? (
          <Row className="d-flex gy-2 flex-wrap align-items-center">
            <Col>
              <UserInfo user={user} displayBalance={false} />
            </Col>

            <Col>
              <Button variant="outline-danger" onClick={disconnectWallet}>
                Disconnect
              </Button>
            </Col>
          </Row>
        ) : (
          <Button variant="outline-primary" onClick={connectWallet}>
            Connect wallet
          </Button>
        )}
      </Card.Body>
    </Card>
  )
}

export default SplittedWallet
