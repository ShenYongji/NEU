package Exercise_2;

public class main {
    public static void main(String[] args){
        Shape t= new Triangle(3,4,5,6);
        double Area_t = t.calculateArea();
        double Perimeter_t= t.calculatePerimeter();
        t.showLoc();
        System.out.println(Area_t);
        System.out.println(Perimeter_t);
        Shape r= new Rectangle(10,20);
        double Area_r = r.calculateArea();
        double Perimeter_r= r.calculatePerimeter();
        r.showLoc();
        System.out.println(Area_r);
        System.out.println(Perimeter_r);
        Shape c= new Circle(3);
        double Area_c = c.calculateArea();
        double Perimeter_c= c.calculatePerimeter();
        c.showLoc();
        System.out.println(Area_c);
        System.out.println(Perimeter_c);
        Shape s= new Square(10,10);
        double Area_s = s.calculateArea();
        double Perimeter_s= s.calculatePerimeter();
        s.showLoc();
        System.out.println(Area_s);
        System.out.println(Perimeter_s);
    }
}
