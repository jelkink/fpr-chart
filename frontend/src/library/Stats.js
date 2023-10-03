function rand_normal(mean=0, stdev=1) {
    const u = 1 - Math.random();
    const v = Math.random();
    const z = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
    return z * stdev + mean;
}

function mean(v) {

    return v.reduce((acc, val) => acc + val) / v.length
}

function stddev(v) {

    const mu = mean(v)

    return Math.sqrt(v.map(x => Math.pow(x - mu, 2)).reduce((acc, val) => acc + val) / v.length)
}

function minimum(v) {

    var min = v[0];

    for (var i = 0; i < v.length; i++) {
        if (v[i] < min) { min = v[i]; }
    }  

    return min;
}

function maximum(v) {

    var max = v[0];

    for (var i = 0; i < v.length; i++) {
        if (v[i] > max) { max = v[i]; }
    }  

    return max;
}

export { rand_normal, minimum, maximum, mean, stddev };