package Exercise_2;
import java.lang.Math.*;

abstract class Shape {
    static String loc = "Shape";
    abstract double calculateArea();
    abstract double calculatePerimeter();
    abstract void showLoc();
}


class Triangle extends Shape{
    int side1;
    int side2;
    int base;
    int height;

    @Override
    double calculateArea() {
        double area = (base*height)/2;
        return area;
    }

    @Override
    double calculatePerimeter() {
        double Perimeter = side1+side2+base;
        return Perimeter;
    }

    void setLoc() {
        loc = "Triangle";
    }

    @Override
    void showLoc() {
        System.out.println(loc);
    }
    public Triangle(int side1,int side2,int base,int height){
        setLoc();
        this.side1 = side1;
        this.side2 = side2;
        this.base = base;
        this.height = height;
    }
}

class Rectangle extends Shape{
    int x;
    int y;
    @Override
    double calculateArea() {
        double area = x*y;
        return area;
    }

    @Override
    double calculatePerimeter() {
        double perimeter = 2*(x+y);
        return perimeter;
    }

    void setLoc() {
        loc = "Rectangle";
    }

    @Override
    void showLoc() {
        System.out.println(loc);
    }

    public Rectangle(int x, int y){
        setLoc();
        this.x = x;
        this.y = y;
    }
}
class Circle extends Shape{
    double r;
    @Override
    double calculateArea() {
        double area = Math.PI * r * r;
        return area;
    }

    @Override
    double calculatePerimeter() {
        double circumference = 2 * Math.PI * r;
        return circumference;
    }

    void setLoc() {
        loc = "Circle";
    }

    @Override
    void showLoc() {
        System.out.println(loc);
    }

    public Circle(double r){
        setLoc();
        this.r = r;
    }
}

class Square extends Rectangle{
    public Square(int x, int y) {
        super(x,y);
    }

    @Override
    void setLoc() {
        loc = "Square";
    }
}
