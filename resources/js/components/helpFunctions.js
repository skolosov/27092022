export const generateNewArticle = ({title, text, lastId}) => {
    const authorId = window.userId;
    const author = window.userName;
    return {
        id: lastId,
        authorId,
        author,
        title,
        text,
    }
}
