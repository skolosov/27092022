export const generateNewArticle = ({title, text, lastId}) => {
    const authorId = window.userId;
    const author = window.userName;
    const titleValue = (title && title.length) ? title : 'Нет заголовка';
    const textValue = (text && text.length) ? title : 'Нет текста статьи';
    return {
        id: lastId,
        authorId,
        author,
        title: titleValue,
        text: textValue,
    }
}
