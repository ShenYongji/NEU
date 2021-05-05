module FinalProject {
    requires javafx.controls;
    requires javafx.fxml;
    requires java.desktop;
    requires javaxt.core;
    requires metadata.extractor;

    opens FinalProject to javafx.fxml;
    exports FinalProject;
}