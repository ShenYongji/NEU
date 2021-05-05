package Exercise_1;
import java.util.*;


 class Student {
    // Parent class
    public Object[] setAStudent(String name, String StudyingSchedule, int[] score){
        Object[] tmp_student = new Object[3];
        return tmp_student;
    }

    void printname(){};

    void printexam(){};

}

class Full_Time extends Student{
     // Data structure for full time student
    HashMap<String,int[]> ft_list = new HashMap<String,int[]>();
    @Override
    public Object[] setAStudent(String name, String StudyingSchedule, int[] score){

        Object[] tmp_student = new Object[3];
        tmp_student[0] = name;
        tmp_student[1] = StudyingSchedule;
        tmp_student[2] = score;
        this.ft_list.put(name,score);

        return tmp_student;
    }
    @Override
    void printexam(){
        for (String name: this.ft_list.keySet()){
            String key = name;
            String value = Arrays.toString(this.ft_list.get(name));
            System.out.println(key + ": " + value);
        }
    }

}

class Part_Time extends Student{
    // Data structure for part time student
    List<String> pt_list = new ArrayList<String>();
    @Override
    public Object[] setAStudent(String name, String StudyingSchedule, int[] score){

        Object[] tmp_student = new Object[3];
        tmp_student[0] = name;
        tmp_student[1] = StudyingSchedule;
        tmp_student[2] = score;
        pt_list.add(name);
        return tmp_student;
    }
    @Override
    void printname(){
        for(String name:pt_list)
            System.out.println(name);
    }
}


