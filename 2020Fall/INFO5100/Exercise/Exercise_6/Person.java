package Exercise_6;

import javax.crypto.*;
import javax.crypto.spec.GCMParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import java.security.*;

public class Person {
    public String name;
    private KeyGenerator keyGenerator;
    private SecretKeySpec KeySpec;
    private byte[] iv = new byte[12];
    private SecureRandom secureRandom = new SecureRandom();
    private SecretKey Key;
    private KeyPair pair;
    private PublicKey publicKey;
    private PrivateKey privateKey;
    private KeyPairGenerator keyPairGen;
    private PublicKey swithed_pk;

    public SecretKeySpec getKeySpec(){
        return KeySpec;
    }
    public byte[] getIv(){
        return iv;
    }

    public byte[] AES_sendMessage(String msg) {
        byte[] Encrypted_Text = new byte[0];
        System.out.println("Plaintext : " + msg);
        try {
            // Get Cipher Instance
            Cipher cipher = Cipher.getInstance("AES/GCM/NoPadding");
            this.KeySpec  = new SecretKeySpec(Key.getEncoded(),"AES");
            GCMParameterSpec parameterSpec = new GCMParameterSpec(128, iv);
            //Initializing a Cipher object
            cipher.init(Cipher.ENCRYPT_MODE, KeySpec,parameterSpec);
            Encrypted_Text = cipher.doFinal(msg.getBytes());
            System.out.println(this.name+" sent a encrypted text :");
            System.out.println(new String(Encrypted_Text));
        } catch (Exception e) {
            e.printStackTrace();
        }
        //send encrypted message to someone
        return Encrypted_Text;
    }

    public void AES_receiveMessage(byte[] Encrypted_Text,SecretKeySpec new_keySpec,byte[] new_iv){
        System.out.println(this.name + " has received this encrypted text.");
        System.out.println(this.name+" received a encrypted text : ");
        System.out.println(new String(Encrypted_Text));
        try{
            // Get Cipher Instance
            Cipher cipher = Cipher.getInstance("AES/GCM/NoPadding");
            GCMParameterSpec parameterSpec = new GCMParameterSpec(128, new_iv);
            // Initialize Cipher for DECRYPT_MODE
            // Perform Decryption
            cipher.init(Cipher.DECRYPT_MODE, new_keySpec,parameterSpec);
            byte[] decryptedText = cipher.doFinal(Encrypted_Text);
            String Decrypted_Text = new String(decryptedText);
            System.out.println(this.name+" had read the message after decrypted :");
            System.out.println(Decrypted_Text);

        }catch (Exception e){
            e.printStackTrace();
        }
        System.out.println("____________________________");
    }

    public void AES_setup(){
        try{
            //Creating key generator object
            this.keyGenerator = KeyGenerator.getInstance("AES");
            //Generate the key
            this.Key = this.keyGenerator.generateKey();
        }
        catch (Exception e){
            e.printStackTrace();
        }
    }

    public void swith_publicKey(PublicKey key){
        //get the public key from my listener
        this.swithed_pk = key;
    }

    public PublicKey get_publickKey(){
        //Get the my public key
        return publicKey;
    }

    public byte[] RSA_sendMessage(String msg){
        byte[] Encrypted_Text = new byte[0];
        System.out.println("Plaintext : " + msg);
        try {
            //Creating a Cipher object
            Cipher cipher = Cipher.getInstance("RSA/ECB/PKCS1Padding");
            //Initializing a Cipher object
            cipher.init(Cipher.ENCRYPT_MODE, swithed_pk);
            Encrypted_Text = cipher.doFinal(msg.getBytes());

            System.out.println(this.name+" sent a encrypted text :");
            System.out.println(new String(Encrypted_Text));
        } catch (Exception e) {
            e.printStackTrace();
        }
        //send encrypted message to someone
        return Encrypted_Text;
    }

    public void RSA_receiveMessage(byte[] Encrypted_Text){
        System.out.println(this.name + " has received this encrypted text.");
        try{
            // Get Cipher Instance
            Cipher cipher = Cipher.getInstance("RSA/ECB/PKCS1Padding");
            //Initializing the same cipher for decryption
            cipher.init(Cipher.DECRYPT_MODE, privateKey);
            // Perform Decryption
            byte[] decryptedText = cipher.doFinal(Encrypted_Text);
            System.out.println(this.name+" had read the message after decrypted :");
            System.out.println(new String(decryptedText));
        }catch (Exception e){
            e.printStackTrace();
        }
        System.out.println("____________________________");
    }

    public Object[] RSA_sendMessagewithSignature(String msg){
        //Send message with signture
        // Encrypt a message
        byte[] bytes = RSA_sendMessage(msg);
        byte[] digitalSignature= new byte[0];
        try {
            // Create a signature
            Signature sign = Signature.getInstance("SHA256withRSA");
            sign.initSign(privateKey);
            sign.update(bytes);
            //sign with current message
            digitalSignature = sign.sign();
            System.out.println(this.name+" sent a encrypted text with signature:");
            System.out.println( new String(digitalSignature));
        } catch (Exception e) {
            e.printStackTrace();
        }
        //pack signature and message together
        Object[] packed_msg = new Object[2];
        packed_msg[0] = digitalSignature;
        packed_msg[1] = bytes;
        return packed_msg;
    }

    public void verifySignature(Object[] a){
        //Receive the package of message from someone
        try{
            byte[] bytes = (byte[]) a[1];
            byte[] signature = (byte[]) a[0];
            Signature sign = Signature.getInstance("SHA256withRSA");
            sign.initVerify(swithed_pk);
            sign.update(bytes);
            //Verifying the signature
            boolean bool = sign.verify(signature);
            //if ture, read the message
            if(bool) {
                System.out.println("Signature verified");
                RSA_receiveMessage(bytes);
            } else {
                System.out.println("Signature failed");
            }

        }catch (Exception e){
            e.printStackTrace();
        }
    }

    public void RSA_setup(){
        try {
            //Creating KeyPair generator object
            this.keyPairGen = KeyPairGenerator.getInstance("RSA");
            //Initializing the key pair generator
            keyPairGen.initialize(2048, secureRandom);

            //Generate the pair of keys
            this.pair = keyPairGen.generateKeyPair();

            //Getting the public key from the key pair
            this.publicKey = pair.getPublic();
            this.privateKey = pair.getPrivate();
        }
        catch (Exception e){
            e.printStackTrace();
        }
    }

    Person (String name){
        this.name = name;
    }
}
