# IPFS Signer

Sign, store, and verify user-signed messages with IPFS and Ethereum wallets in the browser. Mostly local-first.
It also explores common IPFS patterns in the browser:
- Verified retrieval of UnixFS CIDs with Helia
- Packing and unpacking CAR files in the browser
- Trustless gateway retrieval (with Helia and other libs)

## Who's signing?

User signatures (that is  require some notion of user identity. In its first version, the app uses the [WalletConnect](https://walletconnect.com/) standard and SDK for signing arbitrary messages using crypto wallets. This has the benefit of tapping into the already existing EVM userbase which already has a crypto wallet set up.

However, WalletConnect requires a connection to their servers which gets in the way of signing being a purely local operation.  

Identity is much broader than crypto wallets and exploring alternatives would be useful. Examples include:
- [Web Authentication API (WebAuthn)](https://developer.mozilla.org/en-US/docs/Web/API/Web_Authentication_API) as a building block for signing arbitrary messages. 
- [Web Crypto API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API) as a lower-level building block for non-extractable keys
- [Passkeys](https://fidoalliance.org/passkeys/)


## Getting started

To get up and running locally:

```sh
npm install
npm run dev
```
