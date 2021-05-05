package Exercise_1;
import java.util.Arrays;
import java.util.Random;

public class main {

    static String select_schedule(){
        //Randomly select the type of student
        String[] Schedule = {"Full Time", "Part Time"};
        Random random = new Random();
        int select = random.nextInt(Schedule.length);
        return Schedule[select];
    }

    static int[] select_score(){
        int[] score_array = new int[15];
        for (int i=0;i<score_array.length;i++){
            score_array[i] = getRandomNumber(0,101);
        }

        return score_array;
    }

    private static int getRandomNumber(int min, int max) {
        //Randomly create score for students
        return (int) ((Math.random() * (max - min)) + min);
    }


    public static void main(String[] args) {
        Session s = new Session();
        //s.setStudentSet("A","Full Time", new int[] {1,2,3,4,5});
        for (int i = 0; i < 20; i++) {
            String name_tmp = String.valueOf((char) ((int) ('A') + i));
            String Schedule_tmp = select_schedule();
            int[] score_tmp = select_score();
            System.out.println(name_tmp + ", " + Schedule_tmp+", "+ Arrays.toString(score_tmp));
            s.setStudentSet(name_tmp,Schedule_tmp, score_tmp);
        }
        //s.printAll();
        System.out.println("_____________________________________________________________");
        System.out.println("Calculate average quiz scores per student for the whole class");
        s.calAvg();
        System.out.println("_____________________________________________________________");
        System.out.println("Print the list of quiz scores in ascending order");
        s.sortQuiz();
        System.out.println("_____________________________________________________________");
        System.out.println("Print the names of part-time students");
        s.printPartTime();
        System.out.println("_____________________________________________________________");
        System.out.println("Print the exam scores of full-time students");
        s.printFullTime();
    }
}
