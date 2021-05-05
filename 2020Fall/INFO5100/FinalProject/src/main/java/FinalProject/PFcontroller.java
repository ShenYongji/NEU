package FinalProject;

import javafx.event.ActionEvent;
import javafx.fxml.FXMLLoader;
import javafx.fxml.Initializable;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.ToggleGroup;
import javafx.scene.image.Image;
import javafx.scene.image.ImageView;
import javafx.scene.layout.AnchorPane;
import javafx.scene.layout.VBox;
import javafx.stage.Modality;
import javafx.stage.Stage;

import java.io.*;
import java.net.URL;
import java.util.ResourceBundle;

public class PFcontroller implements Initializable {
    public ImageView logo;
    public AnchorPane preface;
    public Button buttonStart;

    public void handleStart(ActionEvent actionEvent) {

        FXMLLoader loader = new FXMLLoader();
        loader.setLocation(getClass().getResource("mainUI.fxml"));
        VBox page = null;
        try {
            page = (VBox) loader.load();
        } catch (IOException e) {
            e.printStackTrace();
        }
        Stage mainStage = new Stage();
        Scene scene =  new Scene(page);
        mainStage.setScene(scene);

        Controller controller = loader.getController();
        mainStage.show();

        //close the current window
        Stage primaryStage = (Stage)buttonStart.getScene().getWindow();
        primaryStage.close();


    }

    public void initialize(URL location, ResourceBundle resources){
        String path = "../info5100/src/main/resources/FinalProject/NEU_logo.png";
        File img = new File(path);
        try {
            InputStream isImage = (InputStream) new FileInputStream(img);
            Image image = new Image(isImage);
            logo.setImage(image);

        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }
    }

}
