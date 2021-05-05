package Exercise_7;

public class Question_3 {

    static <E extends Comparable<E>> void findMax(E[] input){
        E max = input[0];
        for (E e : input){
            // Compare with the max value
            if (max.compareTo(e) < 0){
                max = e;
            }
        }

        System.out.println("The max value is: "+max);
    }

    public static void main(String[] args){
        Integer[] test3 = {5,14,534,213,54745,2123,3325,1233,2,24};
        findMax(test3);
    }
}
