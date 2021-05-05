package Exercise_5;

public class Creational_Patterns {
    // Factory Method pattern
    // Assuming a factory can create three different colors of car
    public static void main(String[] args){
        System.out.println("This is an example of Factory Method pattern in Creational Patterns");
        Carfactory cf = new Carfactory();
        cf.SetColor("White");
        ColorPool cp1 = cf.CreatingCar();
        cp1.PrintColor();

        cf.SetColor("Red");
        ColorPool cp2 = cf.CreatingCar();
        cp2.PrintColor();

        cf.SetColor("Blue");
        ColorPool cp3 = cf.CreatingCar();
        cp3.PrintColor();
    }
}

class Carfactory{
    String color;
    void SetColor(String color){
        this.color = color;
    }

    ColorPool CreatingCar(){
        ColorPool object;
        if (color == null){
            object = null;
        }
        else{
            if(color.equalsIgnoreCase("White")){
                object = new white();
            }
            else if (color.equalsIgnoreCase("Blue")){
                object = new blue();
            }
            else if (color.equalsIgnoreCase("Red")){
                object = new red();
            }
            else{
                object = null;
            }
        }
        return object;
    }
}

interface ColorPool{
    void PrintColor();
}

class red implements ColorPool {
    @Override
    public void PrintColor() {
        System.out.println("ColorPool -> Red");
        System.out.println("The red car is created");
    }
}

class blue implements ColorPool{
    @Override
    public void PrintColor() {
        System.out.println("ColorPool -> Blue");
        System.out.println("The blue car is created");
    }
}

class white implements ColorPool{
    @Override
    public void PrintColor() {
        System.out.println("ColorPool -> White");
        System.out.println("The white car is created");
    }
}