const abrNumbers = (num) => {
    if (num > 1000)
        return (num / 1000).toFixed(2) + 'k';
    else if (num > 1000000)
        return (num / 1000).toFixed(2) + 'M';
    else return num;
};

export default abrNumbers;