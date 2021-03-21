class NameProcessor {
    processMovieName(name) {
        if (name == null) {
            return name;
        }

        var regex = /(.+\.(\d{4}|S\d{2}E\d{2}))/g;
        var matches = regex.exec(name);
        return matches != null && matches.length > 0 && matches[0] != null ? matches[0].replaceAll(".", " ") : name;
    }
}

export default NameProcessor;