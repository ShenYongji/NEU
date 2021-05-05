package Exercise_5;

public class Structural_Patterns {
    //Adapter pattern
    public static void main(String[] args){


        US_Voltage us_v = new US_Voltage();
        Voltage_Adapter va = new Voltage_Adapter();

        computer computer_CN = new computer();
        computer_CN.inputpower(va.Transfer_Voltage_US_TO_CN(us_v));
    }
}

class computer{
    //A traveller brings his computer from CN to US
    //This computer is designed for using 220V
    void inputpower(CN_Voltage voltage){
        System.out.println("The current voltage is: "+voltage.getVoltage());
    }
}

class US_Voltage{
    private int voltage = 120;
    public int getVoltage(){
        return voltage;
    }
    public US_Voltage(){
        System.out.println("120V in US standard for Now");
    }
}

class CN_Voltage{
    private int voltage = 220;
    public int getVoltage(){
        return voltage;
    }

    public CN_Voltage(){
        System.out.println("220V in CN standard for Now");
    }
}

interface Voltage{
    void print_Voltage();
}

class Voltage_Adapter implements Voltage{
    @Override
    public void print_Voltage() {
        System.out.println("Voltage_Adapter is created");
    }

    public CN_Voltage Transfer_Voltage_US_TO_CN(US_Voltage voltage){
        CN_Voltage CN_v = new CN_Voltage();
        System.out.println("Transferred from US to CN!");
        return CN_v;
    }

    public US_Voltage Transfer_Voltage_CN_TO_US(CN_Voltage voltage){
        US_Voltage us_v = new US_Voltage();
        System.out.println("Transferred from CN to US!");
        return us_v;
    }

    public Voltage_Adapter(){
        print_Voltage();
    }
}
