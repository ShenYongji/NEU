package FinalProject;
import java.io.*;
import java.util.HashMap;
import java.util.Map;
import java.nio.file.Path;
import java.nio.file.Paths;

import com.drew.imaging.ImageMetadataReader;
import com.drew.imaging.ImageProcessingException;
import com.drew.metadata.Directory;
import com.drew.metadata.Metadata;
import com.drew.metadata.Tag;
import javaxt.io.Image;


public class image_info {
    //The data structure of image
    //Parent Class to store basic information of image
    private String Path;
    private String filename_extension;
    private String filename;
    private String curr_format;
    private javaxt.io.Image image;
    private javafx.scene.image.Image imageview;

    public Integer get_height(){
        return image.getHeight();
    }
    public Integer get_width(){
        return image.getWidth();
    }
    public String get_Path(){
        return Path;
    }
    public String get_filename_extension(){
        return filename_extension;
    }
    public String get_filename(){
        return filename;
    }
    public String get_curr_format(){ return curr_format; }
    public javaxt.io.Image get_image(){
        return image;
    }
    public javafx.scene.image.Image get_Image(){
        return imageview;
    }

    public image_info(String Path){
        try {
            File img = new File(Path);
            InputStream isImage = new FileInputStream(img);
            this.imageview = new javafx.scene.image.Image(isImage);
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }
        Path path = Paths.get(Path);
        Path fileName = path.getFileName();
        this.Path = path.toString();
        this.image = new Image(Path);
        this.filename_extension = fileName.toString();
        int index = fileName.toString().lastIndexOf('.');
        if(index > 0) {
            String extension = fileName.toString().substring(index + 1);
            this.curr_format = extension;
        }
        this.filename = fileName.toString().substring(0, fileName.toString().length()-this.curr_format.length()-1);
    }
}

class smallimage extends image_info{
    //Class smallimage extends from its parent class - image_info
    //Contain the description of image itself
    private String s_path;
    //Map<String,String> data stores Metadata from ImageMetadataReader
    //Image Size, Location... will be in the Map<String,String> data
    private Map<String,String> img_data;

    public Map<String, String> read_data() {
        Map<String,String> data = new HashMap<>();
        try {
            Metadata metadata = ImageMetadataReader.readMetadata(new File(s_path));
            for (Directory directory : metadata.getDirectories()) {
                for (Tag tag : directory.getTags()) {
                    //System.out.println(tag.getTagName());
                    data.put(tag.getTagName(), tag.getDescription());
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        } catch (ImageProcessingException e) {
            e.printStackTrace();
        }
        return data;
    }

    public Map<String, String> get_data(){
        return img_data;
    }

    public void print_current_simg(){
        System.out.println("New Image");
        System.out.println(get_Path());
        System.out.println(get_filename_extension());
        System.out.println(get_filename());
        System.out.println(get_curr_format());
    }
    public smallimage(String Path) {
        super(Path);
        this.s_path = get_Path();
        this.img_data = read_data();
    }
}

class bigimage extends image_info{
    //Class bigimage extends from its parent class - image_info
    //Contain the modifications of bigger image from the "Filter" functions

    private boolean desaturate = false;
    private int rotate = 0;

    public void set_rotate(int n){
        rotate = rotate + n;
    }
    public void reset_rotate(){
        rotate = 0;
    }
    public int get_rotate(){
        return rotate;
    }
    public void setdesaturate(boolean x){
        this.desaturate = x;
    }
    public boolean get_desaturate(){
        return desaturate;
    }

    public void print_current_bimg(){
        System.out.println("Rotate:"+get_rotate());
        System.out.println("Desaturate:"+get_desaturate());
        System.out.println("_______________________________");
    }

    public bigimage(String Path) {
        super(Path);
    }
}