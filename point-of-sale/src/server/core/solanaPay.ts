import {connection, program} from "./connection";
import {Commitment, Connection, PublicKey, Transaction} from "@solana/web3.js";
import {CreateTransferFields} from "@solana/pay/src/createTransfer";
import {getAssociatedTokenAddress, TOKEN_PROGRAM_ID} from "@solana/spl-token";
import {Amount, Memo, Recipient, References, SPLToken} from "@solana/pay/src/types";
import {BN, utils, Wallet, web3} from "@project-serum/anchor";
import {PROGRAM_ID} from "../IDL/common";
import BigNumber from "bignumber.js";

export interface CreateExchangeFields {
    recipient: PublicKey;
    amount: BigNumber;
    splToken: PublicKey;
    reference: PublicKey | PublicKey[]
}

export async function createExchange(
    connection:Connection, sender: PublicKey,
    { recipient, amount, splToken,reference}: CreateExchangeFields,
    { commitment }: { commitment?: Commitment } = {}
):Promise<Transaction>{

    const buyerDepositTokenAccount=await getAssociatedTokenAddress(splToken,sender)
    const merchantTokenAccount=await getAssociatedTokenAddress(splToken,recipient)

    const [vault_account_pda, vault_account_bump] =
        await PublicKey.findProgramAddress(
            [Buffer.from(utils.bytes.utf8.encode('token_seed'))],
            new PublicKey(PROGRAM_ID)
        );

    const [escrow_account_pda, escrow_account_bump] =
        await PublicKey.findProgramAddress(
            [Buffer.from(utils.bytes.utf8.encode('escrow'))],
            program.programId
        );
    const [vault_authority_pda, _vault_authority_bump] =
        await PublicKey.findProgramAddress(
            [Buffer.from(utils.bytes.utf8.encode('vault_auth'))],
            program.programId
        );
    // let otherAccount=
    // if (reference) {
    //     if (!Array.isArray(reference)) {
    //         reference = [reference];
    //     }
    //
    //     for (const pubkey of reference) {
    //         transaction.keys.push({ pubkey, isWritable: false, isSigner: false });
    //     }
    // }

    let transaction=await program.methods.exchange().accounts({
        buyer: sender,
        buyerDepositTokenAccount: buyerDepositTokenAccount,
        merchantReceiveTokenAccount: merchantTokenAccount,
        merchant: recipient,
        escrowAccount: escrow_account_pda,
        vaultAccount: vault_account_pda,
        vaultAuthority: vault_authority_pda,
        tokenProgram: TOKEN_PROGRAM_ID,
    }).transaction();
    transaction.feePayer = sender;
    transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
    return transaction
}


export interface InitializeReq {
    buyer: PublicKey;
    amount: BigNumber;
    splToken: PublicKey;
    reference: PublicKey | PublicKey[]
}

export async function initialize(
    connection:Connection, sender: Wallet,
    { buyer, amount, splToken,reference}: InitializeReq,
    { commitment }: { commitment?: Commitment } = {}
):Promise<string>{

    const merchantTokenAccount=await getAssociatedTokenAddress(splToken,sender.publicKey)

    const [vault_account_pda, vault_account_bump] =
        await PublicKey.findProgramAddress(
            [Buffer.from(utils.bytes.utf8.encode('token_seed'))],
            new PublicKey(PROGRAM_ID)
        );

    const [escrow_account_pda, escrow_account_bump] =
        await PublicKey.findProgramAddress(
            [Buffer.from(utils.bytes.utf8.encode('escrow'))],
            program.programId
        );
    const [vault_authority_pda, _vault_authority_bump] =
        await PublicKey.findProgramAddress(
            [Buffer.from(utils.bytes.utf8.encode('vault_auth'))],
            program.programId
        );

    const tx = await program.methods
        .initialize(new BN(amount.toString()))
        .accounts({
            merchant: sender.publicKey,
            mint: splToken,
            vaultAccount: vault_account_pda,
            vaultAuthority: vault_authority_pda,
            merchantReceiveTokenAccount: merchantTokenAccount,
            escrowAccount: escrow_account_pda,
            systemProgram: web3.SystemProgram.programId,
            rent: web3.SYSVAR_RENT_PUBKEY,
            tokenProgram: TOKEN_PROGRAM_ID,
        })
        .signers([sender.payer])
        .rpc({commitment: "confirmed"});

    console.log(`[INFO] Showing the logs:${tx}`);
    return tx
}
