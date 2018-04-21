package dreamcraft.workhub.model;

public enum FileType { // WARNING: be sure to add new enum entries after previous entries
    PDF(".pdf"),
    WORD(".docx"),
    WORD_2003(".doc"),
    EXCEL(".xlsx"),
    EXCEL_2003(".xls"),
    POWERPOINT(".pptx"),
    POWERPOINT_2003(".ppt"),
    TXT(".txt"),
    RTF(".rtf");

    private String extension;

    FileType(String extension) {
        this.extension = extension;
    }

    public String getExtension() {
        return this.extension;
    }

    public static FileType fromCode(String extension) throws Exception {
        for (FileType status :FileType.values()){
            if (status.getExtension().equals(extension)){
                return status;
            }
        }
        throw new Exception("The extension " + extension + " is not supported!");
    }
}
