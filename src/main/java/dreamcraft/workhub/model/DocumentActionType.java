package dreamcraft.workhub.model;

public enum DocumentActionType {
    ADD("Uploaded document"),
    OPEN("Opened document"),
    EDIT("Modified document"),
    MERGE("Merged pages to PDF document"),
    REINDEX("Reindexed document"),
    DELETE("Removed document from database");

    private String description;

    DocumentActionType(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }
}
