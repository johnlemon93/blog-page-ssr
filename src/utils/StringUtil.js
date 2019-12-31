function encodeHTML(s) {
    return s.replace(/</g, '&lt;').replace(/"/g, '&quot;').replace(/>/g, '&gt;');
};

function filterURLinComment(comment) {
    return comment.replace(/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,})/g, "<a target='_blank' rel='noopener noreferrer' href='$1'>$1</a>");
}

const StringUtil = {
    encodeHTML,
    filterURLinComment
};

export default StringUtil;