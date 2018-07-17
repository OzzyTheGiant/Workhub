package dreamcraft.workhub.filesystem;

import dreamcraft.workhub.model.Document;

public class DescriptiveFolderStructure implements FolderStructure {
    @Override
    public String generateFilePath(Document doc) {
        return String.format(
			"/%s [%s]/[%s] %s/[%s][%d][%s] %s%s",
			doc.getClient().getClientName(),
			doc.getClient().getId(),
			doc.getProject().getCategory().getDescription(),
			doc.getProject().getName(),
			doc.getCategory().getDescription(),
			doc.getYear(),
			doc.getId(),
			doc.getDescription(),
			doc.getFileType().getExtension()
        );
    }
 }
