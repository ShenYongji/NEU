package Exercise_7;

import java.util.Scanner;

public class Question_2 {

    static <E> E[] exchange(E[] e){
        System.out.println("Original List:");
        int index = 0;
        //find the total amount of elements
        for (E element : e){
            System.out.print(element+" ");
            index++;
        }
        System.out.println();
        System.out.println("This array has "+index+" elements");
        System.out.println("Enter the positions that you want to exchange");
        Scanner input = new Scanner(System.in);
        //asking user to select the positions
        System.out.println("First position");
        int pos1 = input.nextInt();
        System.out.println("Second position");
        int pos2 = input.nextInt();
        //Swapping
        if (pos1-1 >= 0 && pos2 -1 <= index) {
            E tmp = e[pos1-1];
            e[pos1-1] = e[pos2-1];
            e[pos2-1] = tmp;
        }else{
            System.out.println("Index is out of range");
        }
        return e;
    }

    public static void main(String[] args){
        Integer[] test2 = {1,2,3,4,5,6,7,8,9,10,11,12,13,14,15};
        System.out.println("List after Swapped:");
        test2 = exchange(test2);
        for (Integer i : test2){
            System.out.print(i+" ");
        }
    }
}
