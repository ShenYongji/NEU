package Exercise_6;

public class main {


    public static void main(String[] args){
        //Create two objects - Alice and Bob
        Person Alice = new Person("Alice");
        Person Bob = new Person("Bob");


        System.out.println("Demonstrate symmetric encryption and decryption of message sent between Alice and Bob");
        System.out.println("Use AES-256 encryption with GCM/NoPadding cipher");
        //Set up AES for them;
        Alice.AES_setup();
        Bob.AES_setup();
        //Alice sends a message to Bob
        Bob.AES_receiveMessage(Alice.AES_sendMessage("Hello, this is Alice"),Alice.getKeySpec(),Alice.getIv());
        //Bob sends a message to Alice
        Alice.AES_receiveMessage(Bob.AES_sendMessage("Hello, this is Bob"),Bob.getKeySpec(),Bob.getIv());


        System.out.println("****************************");
        System.out.println("Demonstrate asymmetric encryption and decryption of message sent between Alice and Bob");
        System.out.println("Use RSA-2048 encryption ECB/PKCS1Padding");
        //Set up RSA for them;
        Alice.RSA_setup();
        Bob.RSA_setup();
        //Public key switched
        Alice.swith_publicKey(Bob.get_publickKey());
        Bob.swith_publicKey(Alice.get_publickKey());
        //Alice sends a message to Bob
        Bob.RSA_receiveMessage(Alice.RSA_sendMessage("I have received your publickey"));
        //Bob sends a message to Alice
        Alice.RSA_receiveMessage(Bob.RSA_sendMessage("Me too"));


        System.out.println("****************************");
        System.out.println("Demonstrate signing a message and validating the signature using RSA-2048 keys between Alice and Bob");
        //Set up RSA for them;
        Alice.RSA_setup();
        Bob.RSA_setup();
        //Public key switched
        Alice.swith_publicKey(Bob.get_publickKey());
        Bob.swith_publicKey(Alice.get_publickKey());
        //Alice sends a message with signature to Bob
        Bob.verifySignature(Alice.RSA_sendMessagewithSignature("Signed my message"));
        //Bob sends a message with signature to Alice
        Alice.verifySignature(Bob.RSA_sendMessagewithSignature("Validated your signature"));
    }
}
