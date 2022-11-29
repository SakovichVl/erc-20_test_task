import { FC, useCallback, useEffect, useState, useRef } from "react";

import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import { Contract, ethers } from "ethers";

import DefaultButton from "../DefaultButton";
import Table from "../Table";

import { HEAD_ITEMS } from "../../const/headItems";

import { Info, MainPageWrapper } from "./MainPage.styles";
import { TOKEN_ABI, TOKEN_ADDRESS } from "../../const/token";
import TransactionForm from "../TransactionForm";

const Injected = new InjectedConnector({
  supportedChainIds: [5],
});

const provider = new ethers.providers.WebSocketProvider(
  "wss://eth-goerli.g.alchemy.com/v2/1IuB4X2Wl8s9HuD8IZobleeZT5zwyFSO"
);

type TransactionType = {
  hash: string;
  walletFrom: string;
  walletTo: string;
  amount: string;
  type: string;
};

const tokenContract = new Contract(TOKEN_ADDRESS, TOKEN_ABI, provider);

const MainPage: FC = () => {
  const { activate, deactivate, account } = useWeb3React();
  const ref = useRef<TransactionType[]>([]);
  const [isDisable, setIsDisable] = useState(false);
  const [transactions, setTransactions] = useState([
    {
      hash: "",
      walletFrom: "",
      walletTo: "",
      amount: "",
      type: "",
    },
  ]);

  useEffect(() => {
    provider.on("block", async (blockNumber) => {
      try {
        const transferEvent = await tokenContract.queryFilter(
          "Transfer",
          blockNumber - 1,
          blockNumber
        );
        if (transferEvent.length === 0) return;

        const newTX = {
          hash: transferEvent[0].transactionHash,
          walletFrom: transferEvent[0].args![0],
          walletTo: transferEvent[0].args![1],
          amount: transferEvent[0].args![2]._hex,
          type: transferEvent[0].event!,
        };

        const repeat = ref.current.find((el) => el.hash === newTX.hash);
        if (repeat) return;

        setTransactions((prevValues) => [...prevValues, newTX]);
        ref.current = [...ref.current, newTX];
      } catch (e) {
        console.log(e);
      }
    });
  }, []);

  useEffect(() => {
    provider.on("block", async (blockNumber) => {
      try {
        const transferEvent = await tokenContract.queryFilter(
          "Mint",
          blockNumber - 1,
          blockNumber
        );
        if (transferEvent.length === 0) return;

        const newTX = {
          hash: transferEvent[0].transactionHash,
          walletFrom: transferEvent[0].args![0],
          walletTo: transferEvent[0].args![1],
          amount: transferEvent[0].args![2]._hex,
          type: transferEvent[0].event!,
        };

        const repeat = ref.current.find((el) => el.hash === newTX.hash);
        if (repeat) return;

        setTransactions((prevValues) => [...prevValues, newTX]);
        ref.current = [...ref.current, newTX];
      } catch (e) {
        console.log();
      }
    });
  }, [transactions]);

  const connect = useCallback(async () => {
    setIsDisable(true);
    try {
      await activate(Injected).then(() => {});
    } catch (error) {
      console.log("Error on connecting: ", error);
    } finally {
      setIsDisable(false);
    }
  }, [activate]);

  const disconnect = useCallback(async () => {
    try {
      await deactivate();
    } catch (ex) {
      console.log("Error on disconnnect: ", ex);
    }
  }, [deactivate]);

  return (
    <MainPageWrapper>
      {!account && (
        <DefaultButton
          text={"Connect wallet"}
          onClick={connect}
          disabled={isDisable}
        />
      )}
      {account && <Info>Wallet address: {account}</Info>}
      {account && (
        <DefaultButton text="Disconnect wallet" onClick={disconnect} />
      )}
      {account && (
        <TransactionForm
          provider={provider}
          account={account}
          tokenContract={tokenContract}
        />
      )}
      {account && <Table headItems={HEAD_ITEMS} items={transactions} />}
    </MainPageWrapper>
  );
};

export default MainPage;
