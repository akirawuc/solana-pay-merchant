export type SolanaPay = {
  "version": "0.1.0",
  "name": "solana_pay",
  "instructions": [
    {
      "name": "initialize",
      "accounts": [
        {
          "name": "merchant",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "mint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "vaultAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "merchantReceiveTokenAccount",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "escrowAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "change to pda, like the vault account above."
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "buyerAmount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "cancel",
      "accounts": [
        {
          "name": "merchant",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "vaultAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "escrowAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "exchange",
      "accounts": [
        {
          "name": "buyer",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "buyerDepositTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "merchantReceiveTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "merchant",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "escrowAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "escrowAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "merchantKey",
            "type": "publicKey"
          },
          {
            "name": "merchantReceiveTokenAccount",
            "type": "publicKey"
          },
          {
            "name": "paymentAuthority",
            "type": "publicKey"
          },
          {
            "name": "buyerAmount",
            "type": "u64"
          },
          {
            "name": "createTime",
            "type": "i64"
          },
          {
            "name": "endTime",
            "type": "i64"
          }
        ]
      }
    }
  ]
};

export const IDL: SolanaPay = {
  "version": "0.1.0",
  "name": "solana_pay",
  "instructions": [
    {
      "name": "initialize",
      "accounts": [
        {
          "name": "merchant",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "mint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "vaultAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "merchantReceiveTokenAccount",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "escrowAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "change to pda, like the vault account above."
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "buyerAmount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "cancel",
      "accounts": [
        {
          "name": "merchant",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "vaultAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "escrowAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "exchange",
      "accounts": [
        {
          "name": "buyer",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "buyerDepositTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "merchantReceiveTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "merchant",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "escrowAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "escrowAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "merchantKey",
            "type": "publicKey"
          },
          {
            "name": "merchantReceiveTokenAccount",
            "type": "publicKey"
          },
          {
            "name": "paymentAuthority",
            "type": "publicKey"
          },
          {
            "name": "buyerAmount",
            "type": "u64"
          },
          {
            "name": "createTime",
            "type": "i64"
          },
          {
            "name": "endTime",
            "type": "i64"
          }
        ]
      }
    }
  ]
};
