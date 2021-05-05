package Exercise_3;

import java.io.*;

abstract class Shape implements java.io.Serializable{

    void serializable(String filename, Shape object){
        try{
            //Saving of object in a file
            FileOutputStream file = new FileOutputStream(filename);
            ObjectOutputStream out = new ObjectOutputStream(file);

            // Method for serialization of object
            out.writeObject(object);

            out.close();
            file.close();
            System.out.println(object.getClass().getName());
            System.out.println("Object has been serialized");
        }catch(IOException ex){
            System.out.println("IOException is caught");
        }
    }

    abstract Shape deserialization(String filename);

    abstract double calculatePerimeter();

    abstract double calculateArea();
}

class Triangle extends Shape{
    //Triangle class from Shape
    int side1;
    int side2;
    int base;
    int height;
    double area;
    double Perimeter;

    @Override
    //Calculate area for triangle
    double calculateArea() {
        this.area = (base*height)/2;
        return this.area;
    }

    @Override
    //Calculate Perimeter for triangle
    double calculatePerimeter() {
        this.Perimeter = side1+side2+base;
        return this.Perimeter;
    }
    @Override
    //Deserialization for triangle
    Triangle deserialization(String filename) {
        try
        {
            // Reading the object from a file
            FileInputStream file = new FileInputStream(filename);
            ObjectInputStream in = new ObjectInputStream(file);

            // Method for deserialization of object
            Triangle newobject = (Triangle)in.readObject();

            in.close();
            file.close();

            System.out.println("Object has been deserialized ");
            System.out.println("side1 = " + newobject.side1);
            System.out.println("side2 = " + newobject.side2);
            System.out.println("base = " + newobject.base);
            System.out.println("height = " + newobject.height);
            System.out.println("area = " + newobject.area);
            System.out.println("Perimeter = " + newobject.Perimeter);
            return newobject;
        }
        catch(IOException ex)
        {
            System.out.println("IOException is caught");
        }
        catch(ClassNotFoundException ex)
        {
            System.out.println("ClassNotFoundException is caught");
        }
        return null;
    }
    //Initialization
    public Triangle(int side1,int side2,int base,int height){
            this.side1 = side1;
            this.side2 = side2;
            this.base = base;
            this.height = height;
        }

}



class circle extends Shape{
    //Circle class from Shape
    double r;
    double area;
    double circumference;

    @Override
    //Calculate area for circle
    double calculateArea() {
        this.area = Math.PI * r * r;
        return this.area;
    }

    @Override

    circle deserialization(String filename) {
        try
        {
            // Reading the object from a file
            FileInputStream file = new FileInputStream(filename);
            ObjectInputStream in = new ObjectInputStream(file);

            // Method for deserialization of object
            circle newobject = (circle)in.readObject();

            in.close();
            file.close();

            System.out.println("Object has been deserialized ");
            System.out.println("r = " + newobject.r);
            System.out.println("area = " + newobject.area);
            System.out.println("circumference = " + newobject.circumference);
            return newobject;
        }
        catch(IOException ex)
        {
            System.out.println("IOException is caught");
        }

        catch(ClassNotFoundException ex)
        {
            System.out.println("ClassNotFoundException is caught");
        }
        return null;
    }

    @Override
    //Calculate perimeter for circle
    double calculatePerimeter() {
        this.circumference = 2 * Math.PI * r;
        return this.circumference;
    }
    //Initialization
    public circle(double r){
        this.r = r;
    }
}



class Rectangle extends Shape{
    //Rectangle from Shape
    int x;
    int y;
    double area;
    double perimeter;
    //Initialization
    public Rectangle(int x, int y){
        this.x = x;
        this.y = y;
    }

    @Override
    // Calculate area for rectangle
    double calculateArea() {
        this.area = x*y;
        return this.area;
    }

    @Override
    //Perimeter
    double calculatePerimeter() {
        this.perimeter = 2*(x+y);
        return this.perimeter;
    }

    @Override
    Rectangle deserialization(String filename) {
        try
        {
            // Reading the object from a file
            FileInputStream file = new FileInputStream(filename);
            ObjectInputStream in = new ObjectInputStream(file);

            // Method for deserialization of object
            Rectangle newobject = (Rectangle)in.readObject();

            in.close();
            file.close();

            System.out.println("Object has been deserialized ");
            System.out.println("x = " + newobject.x);
            System.out.println("y = " + newobject.y);
            System.out.println("area = " + newobject.area);
            System.out.println("perimeter = " + newobject.perimeter);
            return newobject;
        }
        catch(IOException ex)
        {
            System.out.println("IOException is caught");
        }

        catch(ClassNotFoundException ex)
        {
            System.out.println("ClassNotFoundException is caught");
        }
        return null;
    }
}


class Square extends Rectangle{
    public Square(int x, int y) {
        super(x,y);
    }
}
