export const changeDataFormat = (dateMS: number) => {
    let dateOfPost = new Date(dateMS * 1000);
    var months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря',];
    return (`${dateOfPost.getDate()} ${months[dateOfPost.getMonth()]} ${dateOfPost.getFullYear()}`);
  }
