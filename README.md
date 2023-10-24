# Sign to IPFS

This app demonstrates how to sign, store, and validate user signed (cryptog messages with IPFS. 

From a technical perspective, it explores the following patterns:
- [WalletConnect](https://walletconnect.com/) 

## Who's signing?

User signatures (that is  require some notion of user identity. In its first version, the app uses the WalletConnect standard and SDK for signing arbitrary messages using crypto wallets. This has the benefit of tapping into the already existing EVM userbase which already has a crypto wallet set up.

Identity is much broader than crypto wallets and exploring alternatives would be useful. Examples include:
- [Web Authentication API (WebAuthn)](https://developer.mozilla.org/en-US/docs/Web/API/Web_Authentication_API) as a building block for signing arbitrary messages. 
- [Web Crypto API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API) as a lower level building block for non-extractable keys
- [Passkeys](https://fidoalliance.org/passkeys/)
