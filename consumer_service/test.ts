import { DataVerifier } from "./utils/data-verify";
const signer = new DataVerifier();
const data = "test-data";

signer.verifyData("test-data","173c21bbf38c9b5a717c4d0fd401d6056cb6e368891df75b7b5db26e95c7330aa1ca5c7e147959bcf1f3f92ce91acc9899ffe0e9055bd9bd41cb93e9349404b07639d5cec7c01f2ee3168dff8b278ad4eac96603dd72705b40ffa69c76b7d5fb4b7640491ba9e618d5303ce98c3c21c7a8a9f15c175fbb146e2c06c42566395415c6b8f88d88f7e0f827c6c2434a395ab5d4f2fa2f22b3972dfd9e24630cbf989488e85aa3a95f5aed75836efbb76474ef59df68dbcb5d474cfbbc197016f0ba123f1f1c44157d3535b1ff170fc1dffeb4b58b263fd1f60d4232517900c65fe459e2af0a29e3b3b885650d4492f7a3a468c18c5b6bee03096e92b72d5f316b91","substation1").then(signed =>{
    console.log(signed);
});