package Exercise_5;


public class Behavioral_Patterns {
    //Command pattern
    public static void main(String[] args){

        //Main entrance for control panel
        // light object
        light light = new light();
        // ac object
        aircondition ac = new aircondition();

        //control panel
        ControlPanel controlPanel = new ControlPanel();

        // 0 to turn on the light
        controlPanel.setCommand(0, new LightOnCommond(light));
        // 1 to turn on the light
        controlPanel.setCommand(1, new LightOffCommond(light));
        // 2 to turn on the ac
        controlPanel.setCommand(2, new ACOnCommond(ac));
        // 3 to turn on the ac
        controlPanel.setCommand(3, new ACOffCommond(ac));


        controlPanel.keyPressed(0);
        controlPanel.keyPressed(2);
        controlPanel.keyPressed(3);

    }
}

class light{
    String status;
    public void turnon(){
        this.status = "on";
        System.out.println("The light is "+status);
    }

    public void turnoff(){
        this.status = "off";
        System.out.println("The light is "+status);
    }
}


class aircondition {
    String status;
    public void turnon(){
        this.status = "on";
        System.out.println("The AC is "+status);
    }

    public void turnoff(){
        this.status = "off";
        System.out.println("The AC is "+status);
    }
}

interface command{
    void execute();
}

class LightOffCommond implements command {
    private light light;

    public LightOffCommond(light light) {
        this.light = light;
    }

    @Override
    public void execute() {
        light.turnoff();
    }
}

class LightOnCommond implements command {
    private light light;

    public LightOnCommond(light light) {
        this.light = light;
    }

    @Override
    public void execute() {
        light.turnoff();
    }
}

class ACOffCommond implements command {
    private aircondition aircondition;

    public ACOffCommond(aircondition aircondition) {
        this.aircondition = aircondition;
    }

    @Override
    public void execute() {
        aircondition.turnoff();
    }

}

class ACOnCommond implements command {
    private aircondition aircondition;

    public ACOnCommond(aircondition aircondition) {
        this.aircondition = aircondition;
    }

    @Override
    public void execute() {
        aircondition.turnon();
    }

}


class ControlPanel {
    private static final int CONTROL_SIZE = 4;
    private command[] commands;

    public ControlPanel() {
        commands = new command[CONTROL_SIZE];
        for (int i = 0; i < CONTROL_SIZE; i++) {
            commands[i] = null;
        }
    }
    public void setCommand(int index, command command) {
        commands[index] = command;
    }
    public void keyPressed(int index) {
        commands[index].execute();
    }

}