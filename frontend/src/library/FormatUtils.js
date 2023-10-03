function round(x, digits) {

    return Math.round(x * Math.pow(10, digits)) / Math.pow(10, digits);
};

export { round };