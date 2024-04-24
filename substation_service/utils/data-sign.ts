import * as crypto from "crypto";
import * as fs from 'fs';
import { TextEncoder } from "util";

export class DataSigner{

    encoder: TextEncoder;
    sign: crypto.Sign;
    substationId: string;
    key: crypto.KeyObject;

    constructor(substationId: string){
        this.substationId = substationId;
        this.encoder = new TextEncoder();
         //Possible problem -> Create instance for every data sign
    }
    
    async signData(data: string) : Promise<string> {
        if(this.key == undefined) this.key = await this.getPrivateKey()
        this.sign = crypto.createSign('RSA-SHA256');
        this.sign.write(data)
        this.sign.end()
        return this.sign.sign(this.key, 'hex');
    }

    private async getPrivateKey() : Promise<crypto.KeyObject>{
        const key = await this.importEcKey();
        return crypto.KeyObject.from(key);
    }
    
    private async importEcKey() {
        // fetch the part of the PEM string between header and footer
        const pemHeader = "-----BEGIN PRIVATE KEY-----";
        const pemFooter = "-----END PRIVATE KEY-----";
        const pem = fs.readFileSync('./keys/rsakey-'+this.substationId+'.pem', 'utf-8');
        const pemContents = pem.substring(
          pemHeader.length,
          pem.length - pemFooter.length - 1,
        );
        // base64 decode the string to get the binary data
        // convert from a binary string to an ArrayBuffer
        const binaryDer = Buffer.from(pemContents, 'base64')
        
        return crypto.subtle.importKey(
          "pkcs8",
          binaryDer,
          {
            name: "RSA-PSS",
            hash: "SHA-256"
          },
          true,
          ["sign"],
        );
    }

    private str2ab(str: string) {
        const buf = new ArrayBuffer(str.length);
        const bufView = new Uint8Array(buf);
        for (let i = 0, strLen = str.length; i < strLen; i++) {
            bufView[i] = str.charCodeAt(i);
        }
        return buf;
    }

    private ab2str(buf: ArrayBuffer) {
        return String.fromCharCode.apply(null, Array.from(new Uint8Array(buf)));
    }

}

 