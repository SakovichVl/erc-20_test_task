import { ChangeEvent, FC, FormEvent, memo, useCallback, useState } from "react";

import { Contract, ethers } from "ethers";
import { useWeb3React } from "@web3-react/core";

import DefaultButton from "../DefaultButton";

import {
  Form,
  FormWrapper,
  Input,
  InputWrapper,
  Label,
  Title,
} from "./TransactionForm.styles";

type TransactionFormProps = {
  account: string;
  provider: ethers.providers.WebSocketProvider;
  tokenContract: Contract;
};

const TransactionForm: FC<TransactionFormProps> = ({
  account,
  provider,
  tokenContract,
}) => {
  const [values, setValues] = useState({ wallet: "", amount: "" });
  const { library } = useWeb3React();

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (!library) return;
      const signer = await library.getSigner();
      const tokenSigner = tokenContract.connect(signer);
      const tokenAmount = ethers.utils.parseUnits(values.amount, 18);

      try {
        const transaction = await tokenSigner.transfer(
          values.wallet,
          tokenAmount
        );
        console.log(transaction);
      } catch (e) {
        console.log(e);
      }
    },
    [library, tokenContract, values.amount, values.wallet]
  );

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  }, []);

  return (
    <FormWrapper>
      <Title>Send Transaction</Title>
      <Form onSubmit={handleSubmit}>
        <InputWrapper>
          <Label>
            To:
            <Input name="wallet" onChange={onChange} />
          </Label>
          <Label>
            Amount:
            <Input name="amount" onChange={onChange} />
          </Label>
        </InputWrapper>
        <DefaultButton type="submit" text="Send" />
      </Form>
    </FormWrapper>
  );
};

export default memo(TransactionForm);
