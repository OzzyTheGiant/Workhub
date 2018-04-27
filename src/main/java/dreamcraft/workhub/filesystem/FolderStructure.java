package dreamcraft.workhub.filesystem;

import dreamcraft.workhub.model.Document;

public interface FolderStructure {
    public String generateFilePath(Document document);
}