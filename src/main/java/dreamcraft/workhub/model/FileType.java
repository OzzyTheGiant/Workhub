package dreamcraft.workhub.model;

public enum FileType { // WARNING: be sure to add new enum entries after previous entries
    PDF(".pdf", "application/pdf"),
    WORD(".docx", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"),
    WORD_2003(".doc", "application/msword"),
    EXCEL(".xlsx", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"),
    EXCEL_2003(".xls", "application/vnd.ms-excel"),
    POWERPOINT(".pptx", "application/vnd.openxmlformats-officedocument.presentationml.presentation"),
    POWERPOINT_2003(".ppt", "application/vnd.ms-powerpoint"),
    TXT(".txt", "text/plain"),
    RTF(".rtf", "application/rtf");

    private String extension;
    private String mimeType;

    FileType(String extension, String mimeType) {
        this.extension = extension;
        this.mimeType = mimeType;
    }

    public String getExtension() {
        return this.extension;
    }

    public String getMimeType() {
        return this.mimeType;
    }

    public static FileType fromCode(String extension) throws Exception {
        for (FileType fileType :FileType.values()){
            if (fileType.getExtension().equals(extension)){
                return fileType;
            }
        }
        throw new Exception("The extension " + extension + " is not supported!");
    }
}
