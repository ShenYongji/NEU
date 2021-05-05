package Exercise_3;

public class main {

    public static void main(String[] args){

        System.out.println("Circle");
        circle c= new circle(10);
        double Area_c = c.calculateArea();
        double Perimeter_c= c.calculatePerimeter();
        System.out.println(Area_c);
        System.out.println(Perimeter_c);
        //Saving
        c.serializable("./src/Exercise_3/Exercise_3_circle.txt",c);
        //Reading
        circle new_c = c.deserialization("./src/Exercise_3/Exercise_3_circle.txt");
        System.out.println(new_c.area);
        System.out.println(new_c.circumference);
        System.out.println("**************************");

        System.out.println("Triangle");
        Triangle t= new Triangle(3,4,5,6);
        double Area_t = t.calculateArea();
        double Perimeter_t= t.calculatePerimeter();
        System.out.println(Area_t);
        System.out.println(Perimeter_t);
        //Saving
        t.serializable("./src/Exercise_3/Exercise_3_triangle.txt",t);
        //Reading
        Triangle new_t = t.deserialization("./src/Exercise_3/Exercise_3_triangle.txt");
        System.out.println(new_t.area);
        System.out.println(new_t.Perimeter);
        System.out.println("**************************");

        System.out.println("Rectangle");
        Rectangle r= new Rectangle(10,20);
        double Area_r = r.calculateArea();
        double Perimeter_r= r.calculatePerimeter();
        System.out.println(Area_r);
        System.out.println(Perimeter_r);
        //Saving
        r.serializable("./src/Exercise_3/Exercise_3_Rectangle.txt",r);
        //Reading
        Rectangle new_r = r.deserialization("./src/Exercise_3/Exercise_3_Rectangle.txt");
        System.out.println(new_r.area);
        System.out.println(new_r.perimeter);
        System.out.println("**************************");

        System.out.println("Square");
        Square s= new Square(10,10);
        double Area_s = s.calculateArea();
        double Perimeter_s= s.calculatePerimeter();
        System.out.println(Area_s);
        System.out.println(Perimeter_s);
        //Saving
        s.serializable("./src/Exercise_3/Exercise_3_Square.txt",s);
        //Reading
        Rectangle new_s = s.deserialization("./src/Exercise_3/Exercise_3_Square.txt");
        System.out.println(new_s.area);
        System.out.println(new_s.perimeter);
        System.out.println("**************************");
    }
}
