import {Connection, Keypair} from '@solana/web3.js';
import {CLUSTER_ENDPOINT, PRIVATE_KEY} from './env';
import {AnchorProvider, BorshCoder, Program, Wallet} from "@project-serum/anchor";
import {IDL, SolanaPay} from "../IDL/solana_pay";
import {PROGRAM_ID} from "../IDL/common";

export const connection = new Connection(CLUSTER_ENDPOINT || 'https://api.devnet.solana.com', 'confirmed');

const keypair=Keypair.fromSecretKey(Uint8Array.from(PRIVATE_KEY))
export const wallet=new Wallet(keypair)
const provider = new AnchorProvider(connection, wallet, AnchorProvider.defaultOptions())
console.log(`your wallet publickey is ${provider.wallet.publicKey.toBase58()}`)
export const program = new Program(
    IDL,
    PROGRAM_ID,
    provider,
    new BorshCoder(IDL)
) as Program<SolanaPay>;

