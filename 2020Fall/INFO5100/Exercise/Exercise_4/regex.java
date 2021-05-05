package Exercise_4;
import java.util.regex.Matcher;
import java.util.regex.Pattern;


class regex {
    String email_validation = "^[0-9?A-z0-9?]+(\\.)?[0-9?A-z0-9?]+@[A-z]+\\.[A-z]{3}.?[A-z]{0,3}$";
    String pwd_validation = "^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8}$";
    String date_validation = "^[0-9]{1,2}/[0-9]{1,2}/[0-9]{4}$";
    String image_validation = "^\\w+\\.(gif|png|jpg|jpeg)$";
    String phone_validation = "^[(][0-9]{3}[)]-[0-9]{3}-[0-9]{4}$";

}
