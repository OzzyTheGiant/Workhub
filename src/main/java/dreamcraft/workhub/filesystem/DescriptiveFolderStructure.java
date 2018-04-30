package dreamcraft.workhub.filesystem;

import dreamcraft.workhub.model.Document;
import java.nio.file.Path;
import java.nio.file.Paths;

public class DescriptiveFolderStructure implements FolderStructure {
    private String rootPath;

    public DescriptiveFolderStructure(String rootPath) {
        this.rootPath = rootPath;
    }

    @Override
    public String generateFilePath(Document doc) {
        String filePath = String.format(
                "/[%s] %s/[%s] %s/[%s][%s][%d] %s%s",
                doc.getClient().getId(),
                doc.getClient().getClientName(),
                doc.getProject().getCategory().getDescription(),
                doc.getProject().getName(),
                doc.getId(),
                doc.getCategory().getDescription(),
                doc.getYear(),
                doc.getDescription(),
                doc.getFileType().getExtension()
        );
        Path fullPath = Paths.get(rootPath, filePath);
        return fullPath.toString();
    }
 }
