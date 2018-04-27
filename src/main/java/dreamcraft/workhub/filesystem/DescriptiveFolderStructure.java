package dreamcraft.workhub.filesystem;

import dreamcraft.workhub.model.Document;

public class DescriptiveFolderStructure implements FolderStructure {
    @Override
    public String generateFilePath(Document doc) {
        return String.format(
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
    }
}
