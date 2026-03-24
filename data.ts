
export const getProductImage = (name: string, index: number) => {
    return `https://picsum.photos/id/${(name.length * 7 + index * 13) % 100 + 100}/400/300`;
};

export const getCategoryImage = (index: number) => {
    const ids = [1060, 1076, 1081, 1050];
    return `https://picsum.photos/id/${ids[index % ids.length]}/800/600`;
};
