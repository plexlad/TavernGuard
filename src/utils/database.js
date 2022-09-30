const { DiscordSnowflake } = require('@sapphire/snowflake'),
    loki = require('lokijs')

var db = new loki('tavernguard.db');

module.exports = {
    // databases for reference
    db,
    // log,
    // tavern,
    // Utilities for accessing or adding to the log
    logUtils: {
        // Adds to the log, returns the unique snowflake of the object
        append: ( event, userId, action ) => {
            var snowflake = DiscordSnowflake.generate().toString();
            log.insert({ event, userId, date: Date.now(), action, tags: [], comments: [], _snowflake: snowflake });
            db.saveDatabase();
            return snowflake;
        },

        // Adds a tag to the object for filtering and reference
        addComment: ( snowflake, userId, comment ) => {
            let logEntry = log.findOne({ _snowflake: snowflake });
            logEntry.comments.push({ userId, comment, date: Date.now() });
            log.update(logEntry);
            db.saveDatabase();
        },

        // Adds a comment to the log
        addTag: ( snowflake, userId, tag, comment ) => {
            let logEntry = log.findOne({ _snowflake: snowflake });
            logEntry.tags.push({ userId, tag, comment, date: Date.now() });
            log.update(logEntry);
            db.saveDatabase();
        }
    },

    tavern: {

    }
}