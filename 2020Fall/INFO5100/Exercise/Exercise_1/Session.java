package Exercise_1;
import java.util.*;

//@SuppressWarnings("ALL")
public class Session {
    List<Object[]> Students_list = new ArrayList<Object[]>();
    Student ft = new Full_Time();
    Student pt = new Part_Time();

    void setStudentSet(String name, String StudyingSchedule, int[] score){
        if (StudyingSchedule == "Full Time"){
            this.Students_list.add(this.ft.setAStudent(name,StudyingSchedule,score));

        }
        else if (StudyingSchedule == "Part Time"){
            this.Students_list.add(this.pt.setAStudent(name,StudyingSchedule,score));
        }
    }

//    public void printAll(){
//        for (Object[] Student : Students_list){
//            System.out.println(Student[0]);
//            System.out.println(Student[1]);
//            System.out.println(Arrays.toString((int[]) Student[2]));
//            System.out.println("________________________");
//        }
//    }
//
    public void calAvg(){
        for (Object[] Student : this.Students_list) {
            double avg = Arrays.stream((int[]) Student[2]).average().getAsDouble();
            System.out.println("The average quiz score of "+Student[0]+" is "+String.format("%.2f", avg));
        }
    }


    public void sortQuiz(){
        for (Object[] Student : this.Students_list) {
            Arrays.sort((int[]) Student[2]);
            System.out.println("The quiz scores in ascending order of "+Student[0]+" is "+Arrays.toString((int[]) Student[2]));
        }
    }

    public void printPartTime(){
        this.pt.printname();
    }


    public void printFullTime(){
        this.ft.printexam();
    }
}