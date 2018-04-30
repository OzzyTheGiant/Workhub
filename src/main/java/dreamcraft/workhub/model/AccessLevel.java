package dreamcraft.workhub.model;

public enum AccessLevel {
    PUBLIC,  // Available to all staff members
    SHARED,  // Available to a restricted group of users
    PRIVATE, // Available to one person only
    SECRET,  // Same as private but is now only visible to that person on interface
    DELETED  // Unavailable, stored away for safekeeping; needs administrator intervention to recover file
}
