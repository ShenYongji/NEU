package Exercise_4;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class main {
    public static void main(String[] args) {
        regex reg = new regex();
        System.out.println("Check email address");
        System.out.println("Regex: "+ reg.email_validation);
        // 1 - Positive
        String email1 = "yongjishenmm@gmail.com";
        System.out.println("Positive Case: "+email1);
        System.out.println(Pattern.matches(reg.email_validation, email1));
        // 1 - Negative
        String email2 = "yongjishenmm@gmailcom";
        System.out.println("Negative Case: "+email2);
        System.out.println(Pattern.matches(reg.email_validation, email2));

        System.out.println("_____________________________________");
        System.out.println("Check strength of password");
        //2 - Positive
        System.out.println("8 characters length\n" +
                "2 letters in Upper Case\n" +
                "1 Special Character (!@#$&*)\n" +
                "2 numerals (0-9)\n" +
                "3 letters in Lower Case");
        System.out.println("Regex: "+ reg.pwd_validation);
        String pwd1 = "AV!23abc";
        System.out.println("Positive Case: "+pwd1);
        System.out.println(Pattern.matches(reg.pwd_validation, pwd1));
        //2 - Negative
        String pwd2 = "AV!23ABC";
        System.out.println("Negative Case: "+pwd2);
        System.out.println(Pattern.matches(reg.pwd_validation, pwd2));
        System.out.println("_____________________________________");

        System.out.println("Check date");
        System.out.println("Regular expression for date format dd/mm/yyyy");
        //3 - Positive
        System.out.println("Regex: "+ reg.date_validation);
        String date1 = "11/13/2020";
        System.out.println("Positive Case: "+date1);
        System.out.println(Pattern.matches(reg.date_validation, date1));
        //3 - Negative
        String date2 = "2020/11/13";
        System.out.println("Negative Case: "+date2);
        System.out.println(Pattern.matches(reg.date_validation, date2));
        System.out.println("_____________________________________");


        System.out.println("Check the format of file");
        //4 - Positive
        System.out.println("Regex: "+ reg.image_validation);
        String img1 = "isimage.png";
        System.out.println("Positive Case: "+img1);
        System.out.println(Pattern.matches(reg.image_validation, img1));
        //4 - Negative
        String img2 = "notimage.java";
        System.out.println("Negative Case: "+img2);
        System.out.println(Pattern.matches(reg.image_validation, img2));
        System.out.println("_____________________________________");


        System.out.println("Check the format of phone number");
        System.out.println("Regular expression for phone format (123)-456-7890");
        //5 - Positive
        System.out.println("Regex: "+ reg.phone_validation);
        String phone1 = "(123)-456-7890";
        System.out.println("Positive Case: "+phone1);
        System.out.println(Pattern.matches(reg.phone_validation, phone1));
        //5 - Negative
        String phone2 = "(123)4567890";
        System.out.println("Negative Case: "+phone2);
        System.out.println(Pattern.matches(reg.phone_validation, phone2));
        System.out.println("_____________________________________");
    }
}
