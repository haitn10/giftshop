const crawlerShopee = async (req, res, next) => {
    const options = {
        method: 'GET',
        url: 'http://api.tmapi.top/shopee/item/ratings',
        params: {
            apiToken: 'xxxxxx',
            site: 'vn',
            item_id: 9385530978,
            shop_id: 140500145,
            page: 1,
            pageSize: 6
        }
    };

    try {
        const { data } = await axios.request(options);
        next(data);
    } catch (e) { next(e); }
};