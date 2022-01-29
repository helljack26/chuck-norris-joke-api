const countLastUpdate = (date) => {
    const lastUpdate = new Date(`${date.slice(0, 10).replace('-', '/').replace('-', '/')}`);
    const now = new Date();
    const difference = lastUpdate.getTime() - now.getTime();
    const days = Math.abs(difference / (1000 * 3600 * 24));
    return Math.ceil(days);
}

export default countLastUpdate;


