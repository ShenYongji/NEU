package Exercise_7;

import java.util.ArrayList;

public class Question_1 {
    static < E >void ArrayCheck(E[] e){
        ArrayList <Integer> odd = new ArrayList<>();
        ArrayList <Integer> prime = new ArrayList<>();
        ArrayList <Integer> palindromes = new ArrayList<>();
        for (E element : e){
            if (element instanceof Integer) {

                //check if is odd number
                if ((Integer) element % 2 == 1) {
                    odd.add((Integer) element);
                }

                //check if is prime number
                int count = 0;
                for (int i = 1; i <= (Integer) element; i++ ){
                    if ((Integer) element %i == 0){
                        count ++;
                    }
                }
                if (count == 2){
                    prime.add((Integer) element);
                }

                //check if is palindrome
                String num = String.valueOf(element);
                if (new StringBuffer(num).reverse().toString().equalsIgnoreCase(num)) {
                    palindromes.add((Integer) element);
                }
            }
        }
        //display the array
        if (!odd.isEmpty()) {
            System.out.println(odd);
        }
        if (!prime.isEmpty()) {
            System.out.println(prime);
        }
        if (!palindromes.isEmpty()) {
            System.out.println(palindromes);
        }
    }

    public static void main(String[] args) {
        Integer [] test1 = {1,2,3,4,5,6,7,8,9,10,11,12,13,14,15};
        ArrayCheck(test1);
    }

}
