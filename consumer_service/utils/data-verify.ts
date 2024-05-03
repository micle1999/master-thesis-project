import * as crypto from "crypto";
import * as fs from 'fs';
import { TextEncoder } from "util";

export class DataVerifier{

    encoder: TextEncoder;
    verify: crypto.Verify;
    keys: Map<string, crypto.KeyObject>;

    constructor(){
        this.encoder = new TextEncoder();
        this.keys = new Map<string, crypto.KeyObject>();
    }
    
    async verifyData(data: string, digest: string, substationId: string) : Promise<boolean> {
        
        this.verify = crypto.createVerify('RSA-SHA256');
        let key = this.keys.get(substationId);
        
        if(key == undefined){
            key = await this.getPublicKey(substationId); 
            this.keys.set(substationId, key);
        }
        
        this.verify.write(data)
        this.verify.end()
        
        const verified = this.verify.verify(key, digest, 'hex');
        return verified
    }

    private async getPublicKey(substationId: string) : Promise<crypto.KeyObject>{
        const key = await this.importEcKey(substationId);
        return crypto.KeyObject.from(key);
    }
    
    private async importEcKey(substationId: string) {
        // fetch the part of the PEM string between header and footer
        const pemHeader = "-----BEGIN PUBLIC KEY-----";
        const pemFooter = "-----END PUBLIC KEY-----";
        const pem = fs.readFileSync('./keys/rsakey-public-'+substationId+'.pem', 'utf-8');
        const pemContents = pem.substring(
          pemHeader.length,
          pem.length - pemFooter.length - 1,
        );
        // base64 decode the string to get the binary data
        // convert from a binary string to an ArrayBuffer
        const binaryDer = Buffer.from(pemContents, 'base64')
        
        return crypto.subtle.importKey(
          "spki",
          binaryDer,
          {
            name: "RSA-PSS",
            hash: "SHA-256"
          },
          true,
          ["verify"],
        );
    }

}

 