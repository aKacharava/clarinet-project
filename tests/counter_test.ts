
import { Clarinet, Tx, Chain, Account, types } from 'https://deno.land/x/clarinet@v0.28.0/index.ts';
import { assertEquals } from 'https://deno.land/std@0.90.0/testing/asserts.ts';

Clarinet.test({
    name: "Ensure that <...>",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        let sender = accounts.get("deployer")!.address;

        let block = chain.mineBlock([
          Tx.contractCall("counter", "hello-world", [], sender),
          /*
           * Add transactions with:
           * Tx.contractCall(...)
           */
        ]);
        console.log(block);
        let inner = block.receipts[0].result.expectOk();
        let tuple: any = inner.expectTuple();
        tuple["msg"].expectAscii("Hello world!");
        tuple["tip"].expectUint(1);
        tuple["sender"].expectPrincipal("ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM");
/*
        block = chain.mineBlock([
            /* 
             * Add transactions with: 
             * Tx.contractCall(...)
            */
        ]);
        assertEquals(block.receipts.length, 0);
        assertEquals(block.height, 3);
        */
    },
});
