package Exercise_0;

import java.util.Scanner;
import java.util.ArrayList;
public class Exercise_0 {
    /*
    1. Declare 10 classes based on objects around you
     - Include 2 nested classes

    2. Each class must have at least 8 fields & 3 methods (no logic inside methods is fine, i.e., empty methods or just a print statement)

    3. Print a statement in constructor to indicate creation of each instance, preferably identify each instance with unique id/name

    4. Create a Main method to instantiate at least 3 objects of each class
     */

    public static void main(String[] args){
        System.out.println("Exercise 0 by Yongji Shen");
        System.out.println("________ITEMS ON THE STUDY TABLE__________");
        //1
        studytable t1 = new studytable();
        studytable.books book= t1.new books("GRE general Test","ETS",3,21.99,"Mc Graw Hill",7,241);
        book.printbookinfo();
        book.askisHelp();
        //2
        studytable.laptop laptop = t1.new laptop("Apple",1200.00,2015,"White",15.00,true,false);
        laptop.printComputerInfo();
        laptop.ChargeSuggestion();
        System.out.println("__________________________________________");
        //3
        NEUclass neu = new NEUclass();
        neu.NEUclassask();
        neu.printinfo();
        neu.printend();
        //4
        cola cola1 = new cola();
        cola1.printinfo();
        cola1.printNutrition();
        cola1.printend();
        //5
        mouse G = new mouse();
        G.printinfo();
        G.printinfo2();
        G.printend();
        //6
        myrefrigerator ref =new myrefrigerator();
        ref.printinfo();
        ref.printinfo2();
        ref.printend();
        //7
        email e = new email();
        e.printend();
        //8
        desktopApps dAs = new desktopApps();
        dAs.printlist();
        dAs.printend();
        //9
        coffeemaker cm = new coffeemaker();
        cm.print();
        cm.printCupList();
        cm.printend();
        //10
        phone p = new phone();
        p.print();
        p.printend();
    }
}


class studytable{
    //First class - nested class
    class books{
        String title;
        String organization;
        int version;
        double price;
        String author;
        int numofChapter;
        int numofPage;
        boolean ishelped;


        void printbookinfo(){
            String info ="The name of book is <"+ title +"-"+organization+">,the version of this book is "+version + ", the price of this book is $"+price;
            System.out.println(info);
            System.out.println("This book has "+ numofChapter +" chapters, and " + numofPage + " pages.");
        }
        void askisHelp(){
            Scanner isGradeup = new Scanner(System.in);
            System.out.println("Do you think <"+ title +"> helps you in your exam? (1/0)");
            int isUp = isGradeup.nextInt();
            this.ishelped = (isUp == 1) ? true: false;
            printHelp();
        }


        void printHelp(){
            if (ishelped == true){
                System.out.println("This book helped me on the exam");
            }
            else{
                System.out.println("This book did not help me on the exam");
            }
        }

        // constructor
        public books(String title, String organization,int version, double price,String author, int numofChapter,int numofPage){
            this.title =title;
            this.organization = organization;
            this.version = version;
            this.price =price;
            this.author = author;
            this.numofChapter = numofChapter;
            this.numofPage = numofPage;
            System.out.println("Class Studytable - Class books");
        }
    }
    // Second Class - nested class
    class laptop{
        String brand;
        double price;
        int yearofmake;
        String color;

        double currentbatteryStatus;
        boolean isOperating;
        boolean isCharging;
        boolean isNeedtocharge;

        boolean Needtocharge(boolean isOperating,boolean isCharging,double currentbatteryStatus) {
            boolean isNeed;
            if (isCharging) {
                isNeed = false;
            } else {
                if (isOperating && currentbatteryStatus < 30.00) {
                    isNeed = true;
                } else {
                    isNeed = false;
                }
            }
            return isNeed;
        }

        void printComputerInfo(){
            System.out.println(brand +", " +price +", " + yearofmake +", " + color +", " + currentbatteryStatus);
        }

        void ChargeSuggestion(){
            //System.out.println(isNeedtocharge);
            if (isNeedtocharge){
                System.out.println("This computer needs to be charged");
            }
            else{
                System.out.println("This computer does not need to be charged");
            }
        }
        // constructor
        public laptop(String brand,double price,int yearofmake,String color,double currentbatteryStatus,boolean isOperating,boolean isCharging){

            this.brand=brand;
            this.price=price;
            this.yearofmake=yearofmake;
            this.color=color;

            this.currentbatteryStatus=currentbatteryStatus;
            this.isOperating=isOperating;
            this.isCharging=isCharging;
            this.isNeedtocharge = Needtocharge(this.isOperating,this.isCharging,this.currentbatteryStatus);
            System.out.println("Class Studytable - Class laptop");
        }

    }
}

//Third Class
class NEUclass {
    String myname;
    String classname;
    String nameIDE;
    String versionIDE;
    String feelinghwk;
    String language;
    String feelingIDE;
    String Noofclass = "Here is the end of third class";

    void NEUclassask(){
        Scanner IDE = new Scanner(System.in);
        System.out.println("What is your name?");
        this.myname = IDE.nextLine();
        System.out.println("What class are you taking");
        this.classname = IDE.nextLine();
        System.out.println("How do you feel about this assignment?(0 - 100)");
        this.feelinghwk = IDE.nextLine();
        //System.out.println(this.feelinghwk);
        System.out.println("What programming language are you using?");
        this.language = IDE.nextLine();
        //System.out.println(this.language);
        System.out.println("What IDE are you currently using to program this assignment?");
        this.nameIDE = IDE.nextLine();
        //System.out.println(this.nameIDE);
        System.out.println("What version of your programming IDE?(Hint: you can see this in Help Tab)");
        this.versionIDE = IDE.nextLine();
        //System.out.println(this.versionIDE);
        System.out.println("How do you feel about this programming IDE? (0 - 100)");
        this.feelingIDE = IDE.nextLine();
        //System.out.println(this.feelingIDE);
    }

    void printinfo(){
        System.out.println(myname);
        System.out.println(classname);
        System.out.println(feelinghwk);
        System.out.println(language);
        System.out.println(nameIDE);
        System.out.println(versionIDE);
        System.out.println(feelingIDE);

    }
    void printend(){
        System.out.println(Noofclass);
        System.out.println("__________________________________________");
    }
    public NEUclass(){
        System.out.println("Third class - programIDE");
    }
}

//4th class
class cola{
    String name = "COCA-COLA";
    String Origin = "MEXICO";
    String Volume = "500ml";
    String Calories = "200 Calories per bottle";
    String price = "$2.99";
    String NutritionFacts = "Total Fat: 0g, Sodium: 120mg, Total Carb: 53g, total Sugars: 53g";
    String ExpirationDate = "02/Mar/2021";
    String Caffeine = "48mg/16.9 fl oz";

    void printinfo(){
        System.out.println("Name: "+name);
        System.out.println("Origin: "+Origin);
        System.out.println("Volume: "+Volume);
        System.out.println("Calories: "+Calories);
        System.out.println("Price: "+price);
    }
    void printNutrition(){
        System.out.println("NutritionFacts: "+NutritionFacts);
        System.out.println("ExpirationDate: "+ExpirationDate);
        System.out.println("Caffeine: "+Caffeine);
    }
    void printend(){
        System.out.println("Here is the end of 4th class");
        System.out.println("__________________________________________");
    }
    public cola(){
        //System.out.println("__________________________________________");
        System.out.println("4th class - Exercise_0.cola");
    }
}
// 5th class
class mouse{
    String brand;
    String name;
    String price;
    String desciption;
    String techspecifications;
    String Tracking;
    String Responsiveness;
    String Durability;

    void printinfo(){
        System.out.println("brand: "+brand);
        System.out.println("name: "+name);
        System.out.println("price: "+price);
    }
    void printinfo2(){
        System.out.println("desciption: "+desciption);
        System.out.println("techspecifications: "+techspecifications);
        System.out.println("Tracking: "+Tracking);
        System.out.println("Responsiveness: "+Responsiveness);
        System.out.println("Durability: "+Durability);
    }
    void printend(){
        System.out.println("Here is the end of 5th class");
        System.out.println("__________________________________________");
    }
    public mouse(){
        System.out.println("5th class - Exercise_0.mouse");
        this.brand = "Logitech";
        this.name = "G502 Hero";
        this.price = "$49.99";
        this.desciption = "Gaming Mouse";
        this.techspecifications = "Dual-mode hyper-fast scroll wheel; onboard memory; Approximately 16.8m color RGB lighting";
        this.Tracking = "Sensor: HERO; Resolution: 100-16,000 DPI";
        this.Responsiveness = "USE report rate: 1000 Hz; Microprocessor: 32-bit ARM";
        this.Durability = "PTFE feet: 250-lm range";
    }
}

//6th class
class myrefrigerator{
    String brand;
    String price;
    String modelnumber;
    String size;
    String color;
    String wattage;
    Boolean isfreezer;
    String weight;

    void printinfo(){
        System.out.println("brand: "+brand);
        System.out.println("model number: "+modelnumber);
        System.out.println("price: "+price);
    }
    void printinfo2(){
        System.out.println("size: "+size);
        System.out.println("color: "+color);
        System.out.println("wattage: "+wattage);
        System.out.println("weight: "+weight);
        System.out.println("isfreezer?: "+isfreezer);
    }
    void printend(){
        System.out.println("Here is the end of 6th class");
        System.out.println("__________________________________________");
    }
    public myrefrigerator(){
        System.out.println("6th class - refrigerator");
        this.brand = "Emerson";
        this.price ="$119.99";
        this.modelnumber = "CR510VSE";
        this.size = "3.1 cu. ft.";
        this.color = "Silver";
        this.wattage = "80W";
        this.isfreezer = false;
        this.weight = "56.2 lbs.";
    }
}

//7th class
class email{
    String from;
    String to;
    String cc;
    String content;
    String Date;
    boolean isattachment;
    boolean ispic;
    boolean isvirus;

    void emptymethod(){
        //null
    }
    void check(){
        //null
    }
    void printend(){
        System.out.println("Here is the end of 7th class");
        System.out.println("__________________________________________");
    }
    public email(){
        System.out.println("7th class - Exercise_0.email");
        this.from = "abc@gmail.com";
        this.to = "123@gmail.com";
        this.cc = "";
        this.content = "Here is the 7th class";
        this.Date = "2020/10/09";
        this.isattachment = false;
        this.ispic = true;
        this .isvirus = false;

    }
}

//8th class
class desktopApps{
    String App1 = "Epic Games Launcher";
    String App2 = "Google Chrome";
    String App3 = "HxD";
    String App4 = "IntelliJ IDEA";
    String App5 = "League of Legnends";
    String App6 = "Notepad++";
    String App7 = "Wechat";
    String App8 = "Microsoft Teams";
    String[] applist ={App1,App2,App3,App4,App5,App6,App7,App8};

    void printlist(){
        for (int i = 0;i<applist.length;i++){
            System.out.println(applist[i]);
        }
    }
    void emptymethod(){
        //null
    }
    void printend(){
        System.out.println("Here is the end of 8th class");
        System.out.println("__________________________________________");
    }
    public desktopApps(){
        System.out.println("8th class - Exercise_0.desktopApps");
    }
}

//9
class coffeemaker{
    String brand;
    String ASIN;
    String model;
    String price;
    String Capacity;
    String ItemWeight;
    ArrayList<String> CupList = new ArrayList<String>();

    void printCupList(){
        System.out.println("Three favorite coffee: "+CupList);
    }
    void print(){
        System.out.println(brand);
        System.out.println(ASIN);
        System.out.println(model);
        System.out.println(price);
        System.out.println(Capacity);
        System.out.println(ItemWeight);
    }
    void printend(){
        System.out.println("Here is the end of 9th class");
        System.out.println("__________________________________________");
    }

    public coffeemaker(){
        System.out.println("9th class - Exercise_0.coffeemaker");
        this.brand ="Keurig";
        this.ASIN = "B081DYS74B";
        this.model ="Duo";
        this.price ="$199.97";
        this.Capacity ="12 Cups";
        this.ItemWeight ="13.67 pounds";

        Scanner favCup = new Scanner(System.in);
        System.out.println("Three favorite favor");
        for (int i = 0; i < 3;i++){
            this.CupList.add(favCup.nextLine());
        }
    }
}

//10th class
class phone{
    String brand;
    String model;
    String operationSystem;
    String price;
    String color;
    String TradeinPrice;
    String memory;

    Boolean iswithAppleCare;

    void print(){
        System.out.println("brand: "+brand);
        System.out.println("model: "+model);
        System.out.println("operationSystem: "+operationSystem);
        System.out.println("price: "+price);
        System.out.println("color: "+color);
        System.out.println("TradeinPrice: "+TradeinPrice);
        System.out.println("memory: "+memory);
        System.out.println("iswithAppleCare: "+iswithAppleCare);
    }
    void TradeinPrice(){
        //find the money you have to pay to trade in a new Exercise_0.phone
    }
    void printend(){
        System.out.println("Here is the end of 10th class");
        System.out.println("__________________________________________");
    }
    public phone(){
        System.out.println("10th class - Exercise_0.phone");
        this.brand = "Apple";
        this.model = "X";
        this.price = "499";
        this.color = "black";
        this.TradeinPrice = "200";
        this.memory = "128GB";
        this.operationSystem = (this.brand == "Apple")? "IOS" : "Android";
        this.iswithAppleCare = (this.brand == "Apple")? true : false;

    }
}